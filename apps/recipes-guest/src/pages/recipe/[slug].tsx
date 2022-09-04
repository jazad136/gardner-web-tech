import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Pino from "pino";
import { useEffect, useState } from "react";
import { useRecipeContext } from "src/context/RecipeContext";
import { getClient, sanityClient, urlFor } from "src/lib";
import { CustomNextPage } from "src/types";
import {
  IngredientListWrapper,
  PageTitle,
  Recipe,
  RecipeBlockTextAccordion,
  RecipeCookTime,
  RecipeListItem,
  RecipeMakeButton,
  RecipePrintButton,
  recipeQuery,
  recipeSlugsQuery,
  YouTubeAccordion,
} from "ui";

const logger = Pino.default({ name: "RecipePage" });

type DataProps = {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
};

type Props = {
  data: DataProps;
};

const RecipePage: CustomNextPage<Props> = ({ data }) => {
  const { asPath } = useRouter();
  const { handleSetRecipes } = useRecipeContext();

  const [batches, setBatches] = useState(1);
  const [ingredientsOpen, setIngredientsOpen] = useState(true);
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(true);
  const [youTubeOpen, setYouTubeOpen] = useState(true);
  const [timeOpen, setTimeOpen] = useState(true);

  useEffect(() => {
    if (data?.allRecipes) {
      handleSetRecipes(data.allRecipes);
    }
  }, [data?.allRecipes, handleSetRecipes]);

  if (!data?.currentRecipe?.slug) {
    logger.error(data, "Current Recipe slug not found. Url: %s", asPath);
    return <ErrorPage statusCode={404} />;
  }

  const { title, image, notes, youTubeUrls, ingredients, instructions, slug } =
    data.currentRecipe;

  const imgUrl = urlFor(image)
    .width(1250)
    .height(500)
    .crop("focalpoint")
    .fit("crop")
    .url();

  return (
    <>
      <div>
        <Head>
          <title>Recipes: {title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="py-8">
          <div className="flex w-full justify-center">
            <PageTitle>{title}</PageTitle>
          </div>
          {image && (
            <div className="block w-full">
              <Image
                className="w-16 max-w-full rounded-xl md:w-32 lg:w-48"
                src={imgUrl}
                alt={title}
                width={1250}
                height={500}
                layout="responsive"
                objectFit="cover"
                blurDataURL={imgUrl}
                key={imgUrl}
                placeholder="blur"
                priority
              />
            </div>
          )}
          <RecipeCookTime
            recipe={data.currentRecipe}
            setIsOpen={setTimeOpen}
            isOpen={timeOpen}
          />
          <IngredientListWrapper
            ingredients={ingredients}
            serves={data.currentRecipe.serves}
            batches={batches}
            setBatches={setBatches}
            isOpen={ingredientsOpen}
            setIsOpen={setIngredientsOpen}
          />
          <RecipeBlockTextAccordion
            title="instructions"
            blocks={instructions}
            isOpen={instructionsOpen}
            setIsOpen={setInstructionsOpen}
          />
          <RecipeBlockTextAccordion
            title="notes"
            blocks={notes}
            isOpen={notesOpen}
            setIsOpen={setNotesOpen}
          />
          <YouTubeAccordion
            youTubeUrls={youTubeUrls}
            isOpen={youTubeOpen}
            setIsOpen={setYouTubeOpen}
          />
          <div className="flex justify-center">
            <RecipePrintButton slug={slug} />
            <RecipeMakeButton slug={slug} batches={batches} />
          </div>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const { currentRecipe, allRecipes } = await getClient(preview).fetch(
    recipeQuery,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      data: { currentRecipe, allRecipes } as DataProps,
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipeSlugs = await sanityClient.fetch(recipeSlugsQuery);
  return {
    paths: recipeSlugs.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

RecipePage.layout = {
  includeContainer: true,
};

export default RecipePage;
