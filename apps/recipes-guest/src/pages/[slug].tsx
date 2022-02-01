import { createRef, useCallback, useEffect, useState } from "react";
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
import { urlFor } from "../lib/SanityUi";
import { SectionWithPortableTextBlock } from "@components/SectionWithPortableTextBlock";
import Head from "next/head";
import { useLoadingContext } from "src/lib/LoadingContext";
import Link from "next/link";

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
  const { handleSetLoading } = useLoadingContext();
  const printableContainerRef = createRef<HTMLDivElement>();
  const [recipeCookTimeBodyOpen, setRecipeCookTimeBodyOpen] = useState(true);
  const [ingredientsBodyOpen, setIngredientsBodyOpen] = useState(true);
  const [recipe, setRecipe] = useState({});
  const router = useRouter();

  const { currentRecipe, allRecipes } = data;

  const { title, image, notes, youTubeUrls, ingredients, instructions, slug } =
    currentRecipe;

  useEffect(() => {
    handleSetRecipes(allRecipes);
  }, [allRecipes, handleSetRecipes]);

  useEffect(() => setRecipe(currentRecipe), [currentRecipe, setRecipe]);

  const removeLoader = useCallback(() => {
    handleSetLoading(false);
  }, [handleSetLoading]);

  useEffect(
    () => router.events.on("routeChangeComplete", removeLoader),
    [router, removeLoader]
  );

  if (!data?.currentRecipe?.slug) {
    logger.error(data, "Current Recipe slug not found. Url: %s", router.asPath);
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="py-8">
          <div ref={printableContainerRef}>
            <div className="w-full flex justify-center">
              <PageTitle>{title}</PageTitle>
            </div>
            {image && (
              <div className="block">
                <Image
                  className="w-16 md:w-32 lg:w-48 max-w-full rounded-xl"
                  alt={title}
                  width={2500}
                  height={1000}
                  layout="responsive"
                  src={urlFor(image)
                    .width(2500)
                    .height(1000)
                    .crop("focalpoint")
                    .fit("crop")
                    .auto("format")
                    .url()}
                />
              </div>
            )}
            <RecipeCookTime
              recipe={currentRecipe}
              bodyOpen={recipeCookTimeBodyOpen}
              toggleBodyOpen={() =>
                setRecipeCookTimeBodyOpen(!recipeCookTimeBodyOpen)
              }
            />
            <IngredientList
              ingredients={ingredients}
              toggleBodyOpen={() =>
                setIngredientsBodyOpen(!ingredientsBodyOpen)
              }
              bodyOpen={ingredientsBodyOpen}
            />
            <SectionWithPortableTextBlock
              title="Instructions"
              blocks={instructions}
            />
            <SectionWithPortableTextBlock title="Notes" blocks={notes} />
          </div>
          <YouTubeAccordion youTubeUrls={youTubeUrls} />
          <div className="flex justify-center">
            <Link href={{ pathname: "/print/[slug]", query: { slug } }}>
              <a>
                <Button
                  onClick={() => null}
                  color="success"
                  isOutline
                  size="md"
                >
                  Print
                </Button>
              </a>
            </Link>
          </div>
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
