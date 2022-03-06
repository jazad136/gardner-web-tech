import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  IngredientListWrapper,
  PageTitle,
  Recipe,
  RecipeCookTime,
  RecipeListItem,
  RecipeMakeButton,
  RecipePrintButton,
  recipeQuery,
  recipeSlugsQuery,
  SectionHeader,
  YouTubeAccordion,
} from "ui";
import { SectionWithPortableTextBlock } from "src/components/SectionWithPortableTextBlock";
import { CustomNextPage } from "src/lib/CustomNextPage";
import { useRecipeContext } from "src/lib/RecipeContext";
import { getClient, sanityClient } from "src/lib/SanityServer";
import { configuredSanityClient } from "src/lib/SanityUi";
import { useNextSanityImage, ImageUrlBuilder } from "next-sanity-image";
import * as Pino from "pino";

const logger = Pino.default({ name: "RecipePage" });

const customImageBuilder = (imageUrlBuilder: ImageUrlBuilder) => {
  return imageUrlBuilder.width(1250).height(500).crop("focalpoint").fit("crop");
};

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
  const imageProps = useNextSanityImage(
    configuredSanityClient,
    data?.currentRecipe?.image,
    {
      imageBuilder: customImageBuilder,
    }
  );

  const [batches, setBatches] = useState(1);
  const [ingredientsOpen, setIngredientsOpen] = useState(true);
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

RecipePage.layout = {
  includeContainer: true,
  includeNavAndFooter: true,
};

export default RecipePage;
