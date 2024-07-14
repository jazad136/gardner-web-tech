import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Pino from "pino";
import { useEffect } from "react";
import { useRecipeContext } from "src/context/RecipeContext";
import { getClient, sanityClient, toPlainText, urlFor } from "src/lib";
import { CustomNextPage } from "src/types";
import {
  Button,
  PageSpinner,
  Recipe,
  RecipeDocumentInterface,
  RecipeListItem,
  recipeQuery,
  recipeSlugsQuery
} from "ui";

const logger = Pino.default({ name: "RecipePDF" });

const PDFViewer = dynamic(() => import("ui/src/components/PDFViewer"), {
  ssr: false,
});
const RecipeDocument = dynamic(
  () => import("ui/src/components/recipes/RecipeDocument"),
  {
    ssr: false,
  }
);

type DataProps = {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
};

type Props = {
  data: DataProps;
};

const RecipePDF: CustomNextPage<Props> = ({ data }) => {
  const { handleSetRecipes } = useRecipeContext();
  const { asPath, back } = useRouter();

  useEffect(() => {
    if (data?.allRecipes) {
      handleSetRecipes(data.allRecipes);
    }
  }, [data?.allRecipes, handleSetRecipes]);

  if (!data?.currentRecipe) {
    logger.error(data, "Current Recipe slug not found. Url: %s", asPath);
    return <ErrorPage statusCode={404} />;
  }

  const image = urlFor(data.currentRecipe.image)
    .width(2500)
    .height(1000)
    .crop("focalpoint")
    .fit("crop")
    .auto("format")
    .url();

  const recipe: RecipeDocumentInterface = {
    ...data.currentRecipe,
    image,
    notes: toPlainText(data.currentRecipe.notes),
    instructions: toPlainText(data.currentRecipe.instructions),
  };

  return (
    <>
      <Head>
        <title>Recipes: {recipe.title}</title>
        <meta name="description" content={recipe.title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!RecipeDocument || !PDFViewer || !recipe ? (
        <PageSpinner />
      ) : (
        <div className="my-8">
          <PDFViewer>
            <RecipeDocument recipe={recipe} />
          </PDFViewer>
          <div className="mt-4 flex justify-center">
            <Button color="secondary" size="md" ariaLabel="back" onClick={back}>
              Back
            </Button>
          </div>
        </div>
      )}
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
      data: { currentRecipe, allRecipes } as DataProps,
    },
    revalidate: 60 * 60 * 24,
  };
}

export async function getStaticPaths() {
  const recipeSlugs = await sanityClient.fetch(recipeSlugsQuery);
  return {
    paths: recipeSlugs.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
}

RecipePDF.layout = {
  includeContainer: true,
};

export default RecipePDF;
