import { useEffect, useState } from "react";
import Image from "next/image";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getClient, sanityClient } from "../lib/SanityServer";
import {
  IngredientListWrapper,
  PageTitle,
  Recipe,
  RecipeCookTime,
  RecipeListItem,
  RecipePrintButton,
  recipeQuery,
  recipeSlugsQuery,
  SectionHeader,
  YouTubeAccordion,
} from "ui";
import * as Pino from "pino";
import { useRecipeContext } from "src/lib/RecipeContext";
import { useNextSanityImage, ImageUrlBuilder } from "next-sanity-image";
import { configuredSanityClient } from "src/lib/SanityUi";
import { SectionWithPortableTextBlock } from "@components/SectionWithPortableTextBlock";
import Head from "next/head";

const logger = Pino.default({ name: "RecipePage" });

const customImageBuilder = (imageUrlBuilder: ImageUrlBuilder) => {
  return imageUrlBuilder.width(1250).height(500).crop("focalpoint").fit("crop");
};

export interface RecipePageDataProps {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
}

export interface RecipePageProps {
  data: RecipePageDataProps;
}

const RecipePage = ({ data }: RecipePageProps) => {
  const { handleSetRecipes } = useRecipeContext();
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    data?.currentRecipe?.image,
    {
      imageBuilder: customImageBuilder,
    }
  );
  const router = useRouter();

  useEffect(() => {
    if (data?.allRecipes) {
      handleSetRecipes(data.allRecipes);
    }
  }, [data?.allRecipes, handleSetRecipes]);

  if (!data?.currentRecipe?.slug) {
    logger.error(data, "Current Recipe slug not found. Url: %s", router.asPath);
    return <ErrorPage statusCode={404} />;
  }

  const { title, image, notes, youTubeUrls, ingredients, instructions, slug } =
    data.currentRecipe;

  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="py-8">
          <div className="w-full flex justify-center">
            <PageTitle>{title}</PageTitle>
          </div>
          {image && (
            <div className="block w-full">
              <Image
                className="w-16 md:w-32 lg:w-48 max-w-full rounded-xl"
                {...imageProps}
                alt={title}
                layout="responsive"
                objectFit="cover"
                priority
              />
            </div>
          )}
          <RecipeCookTime recipe={data.currentRecipe} />
          <IngredientListWrapper
            ingredients={ingredients}
            serves={data.currentRecipe.serves}
          />
          <SectionWithPortableTextBlock
            title="Instructions"
            blocks={instructions}
          />
          <SectionHeader classNames="text-center">
            <span>
              Serves: {data.currentRecipe.serves}{" "}
              {data.currentRecipe.serves === 1 ? "Person" : "People"}
            </span>
          </SectionHeader>
          <SectionWithPortableTextBlock title="Notes" blocks={notes} />
          <YouTubeAccordion youTubeUrls={youTubeUrls} />
          <RecipePrintButton slug={slug} />
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

RecipePage.auth = true;

export default RecipePage;
