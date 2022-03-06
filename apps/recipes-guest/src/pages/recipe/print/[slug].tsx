import { useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import {
  Recipe,
  RecipeDocumentInterface,
  RecipeListItem,
  recipeQuery,
  recipeSlugsQuery,
} from "ui";
import { CustomNextPage } from "src/lib/CustomNextPage";
import { useRecipeContext } from "src/lib/RecipeContext";
import { getClient, sanityClient, toPlainText } from "src/lib/SanityServer";
import { urlFor } from "src/lib/SanityUi";
import * as Pino from "pino";

const logger = Pino.default({ name: "RecipePDF" });

const PDFViewer = dynamic(() => import("ui/PDFViewer"), { ssr: false });
const RecipeDocument = dynamic(() => import("ui/recipes/RecipeDocument"), {
  ssr: false,
});

type DataProps = {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
};

type Props = {
  data: DataProps;
};

const RecipePdfPage: CustomNextPage<Props> = ({ data }) => {
  const { handleSetRecipes } = useRecipeContext();
  const { asPath } = useRouter();

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
    <PDFViewer>
      <RecipeDocument recipe={recipe} />
    </PDFViewer>
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
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipeSlugs = await sanityClient.fetch(recipeSlugsQuery);
  return {
    paths: recipeSlugs.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

RecipePdfPage.layout = {
  includeContainer: true,
};

export default RecipePdfPage;
