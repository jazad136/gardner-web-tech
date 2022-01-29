import { createRef, useEffect, useState } from "react";
import Image from "next/image";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getClient, sanityClient } from "../lib/SanityServer";
import {
  Button,
  IngredientList,
  PageTitle,
  Recipe,
  RecipeCookTime,
  RecipeListItem,
  recipeQuery,
  recipeSlugsQuery,
  YouTubeAccordion,
} from "ui";
import * as Pino from "pino";
import { useRecipeContext } from "src/lib/RecipeContext";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { urlFor } from "../lib/SanityUi";
import Script from "next/script";
import { SectionWithPortableTextBlock } from "@components/SectionWithPortableTextBlock";
import Head from "next/head";

const logger = Pino.default({ name: "RecipePage" });

export interface RecipePageDataProps {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
}

export interface RecipePageProps {
  data: RecipePageDataProps;
}

const RecipePage = ({ data }: RecipePageProps) => {
  const { handleSetRecipes } = useRecipeContext();
  const printableContainerRef = createRef<HTMLDivElement>();
  const [windowWidth, setWindowWidth] = useState(0);
  const router = useRouter();

  const { currentRecipe, allRecipes } = data;

  const { title, image, notes, youTubeUrls, ingredients, instructions, slug } =
    currentRecipe;

  useEffect(() => {
    handleSetRecipes(allRecipes);
  }, [allRecipes, handleSetRecipes]);

  // git width of window for downloading image width
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  if (!data?.currentRecipe?.slug) {
    logger.error(data, "Current Recipe slug not found. Url: %s", router.route);
    return <ErrorPage statusCode={404} />;
  }

  const printPage = async () => {
    if (printableContainerRef && slug) {
      expandAccordions();
      const canvas = await toPng(printableContainerRef.current);
      const pdf = new jsPDF();
      pdf.addImage(canvas, "JPEG", 20, 20, 170, 160);
      pdf.save(`${slug}.pdf`);
    }
  };

  const expandAccordions = () => {
    const accordions =
      printableContainerRef.current.getElementsByClassName("accordion");

    Array.from(accordions).forEach((accordion) => {
      const collapsed = accordion.getElementsByClassName("collapse");
      Array.from(collapsed).forEach((c) => {
        c.classList.remove("collapse");
      });
    });
  };

  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="py-8">
          <div
            ref={printableContainerRef}
            className="w-full flex justify-center"
          >
            <PageTitle>{title}</PageTitle>
          </div>
          {windowWidth && image && (
            <div className="block">
              <Image
                className="w-16 md:w-32 lg:w-48 max-w-full"
                alt={title}
                width={windowWidth}
                height="500"
                layout="responsive"
                src={urlFor(image)
                  .width(windowWidth)
                  .height(500)
                  .crop("focalpoint")
                  .fit("crop")
                  .auto("format")
                  .url()}
              />
            </div>
          )}
          <RecipeCookTime recipe={currentRecipe} />
          <IngredientList ingredients={ingredients} />
          <SectionWithPortableTextBlock
            title="Instructions"
            blocks={instructions}
          />
          <SectionWithPortableTextBlock title="Notes" blocks={notes} />
          <YouTubeAccordion youTubeUrls={youTubeUrls} />
          <div className="flex justify-center">
            <Button onClick={printPage} color="success" isOutline size="md">
              Print
            </Button>
          </div>
          <Script
            defer
            src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
          ></Script>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const { currentRecipe, allRecipes } = await getClient(preview).fetch(
    recipeQuery,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      data: { currentRecipe, allRecipes },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const recipeSlugs = await sanityClient.fetch(recipeSlugsQuery);
  return {
    paths: recipeSlugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default RecipePage;
