import {
  Recipe,
  RecipeDocumentInterface,
  RecipeListItem,
  recipeQuery,
  recipeSlugsQuery,
} from "ui";
import { getClient, sanityClient, toPlainText } from "src/lib/SanityServer";
import dynamic from "next/dynamic";
import { useRecipeContext } from "src/lib/RecipeContext";
import { useEffect } from "react";
import { urlFor } from "src/lib/SanityUi";

const PDFViewer = dynamic(() => import("ui/PDFViewer"), { ssr: false });
const RecipeDocument = dynamic(() => import("ui/recipes/RecipeDocument"), {
  ssr: false,
});

export interface RecipeDocumentDataProps {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
}

export interface RecipePdfProps {
  data: RecipeDocumentDataProps;
}

const RecipePDF = ({ data }: RecipePdfProps) => {
  const { handleSetRecipes } = useRecipeContext();

  useEffect(() => {
    handleSetRecipes(data.allRecipes);
  }, [data.allRecipes, handleSetRecipes]);

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

export default RecipePDF;
