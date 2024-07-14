import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import * as Pino from "pino";
import { useEffect, useMemo, useState } from "react";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";
import { Dictaphone, SectionWithPortableTextBlock } from "src/components";
import { useRecipeContext } from "src/context/RecipeContext";
import { getClient, sanityClient } from "src/lib";
import { CustomNextPage } from "src/types";
import {
  Button,
  IngredientListWrapper,
  PageTitle,
  Recipe,
  RecipeListItem,
  recipeQuery,
  recipeSlugsQuery,
  SpeechAlert,
  SpeechTipsModal,
  useWakeLock,
  YouTubeAccordion
} from "ui";

const logger = Pino.default({ name: "MakeRecipePage" });

type DataProps = {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
};

type Props = {
  data: DataProps;
};

const MakeRecipePage: CustomNextPage<Props> = ({ data }) => {
  const { handleSetRecipes } = useRecipeContext();
  const { asPath, query, back } = useRouter();
  const [ingredientsOpen, setIngredientsOpen] = useState(true);
  const [youTubeOpen, setYouTubeOpen] = useState(true);
  const [dictaphoneEnabled, setDictaphoneEnabled] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);
  const { enableWakeLock, isEnabled, isSupported } = useWakeLock();

  useEffect(() => {
    if (isSupported && !isEnabled) {
      enableWakeLock();
    }
  }, [enableWakeLock, isEnabled, isSupported]);

  useEffect(() => {
    if (data?.allRecipes) {
      handleSetRecipes(data.allRecipes);
    }
  }, [data?.allRecipes, handleSetRecipes]);

  const batches: number = useMemo(() => {
    if (!query?.batches) {
      return 0;
    }

    const batches = parseFloat(query.batches as string);
    if (batches < 0) {
      return 0;
    }

    return batches;
  }, [query]);

  if (!data?.currentRecipe?.slug) {
    logger.error(data, "Current Recipe slug not found. Url: %s", asPath);
    return <ErrorPage statusCode={404} />;
  }

  const { title, notes, youTubeUrls, ingredients, instructions } =
    data.currentRecipe;

  return (
    <>
      <Head>
        <title>Recipes: {title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="block py-8">
        <div className="flex w-full justify-between">
          <PageTitle className="inline-block align-middle">{title}</PageTitle>
          <button
            type="button"
            className="-mt-2"
            aria-label="Toggle Voice Commands"
            onClick={() => {
              setDictaphoneEnabled(!dictaphoneEnabled);
            }}
          >
            {dictaphoneEnabled ? (
              <BiMicrophone size="2em" />
            ) : (
              <BiMicrophoneOff size="2em" />
            )}
          </button>
        </div>
        <IngredientListWrapper
          ingredients={ingredients}
          serves={data.currentRecipe.serves}
          batches={batches}
          isOpen={ingredientsOpen}
          setIsOpen={setIngredientsOpen}
        />
        <SectionWithPortableTextBlock
          title="Instructions"
          blocks={instructions}
        />
        <SectionWithPortableTextBlock title="Notes" blocks={notes} />
        <YouTubeAccordion
          youTubeUrls={youTubeUrls}
          isOpen={youTubeOpen}
          setIsOpen={setYouTubeOpen}
        />
        <div className="flex justify-center">
          <Button color="secondary" size="md" ariaLabel="back" onClick={back}>
            Back
          </Button>
          <SpeechAlert
            handleAccept={() => setDictaphoneEnabled(true)}
            handleCancel={() => setDictaphoneEnabled(false)}
            enableSpeechRecognition={speechRecognitionSupported}
          />
          <SpeechTipsModal />
        </div>
        <Dictaphone
          setSpeechRecognitionSupported={setSpeechRecognitionSupported}
          isEnabled={dictaphoneEnabled}
          handleYouTubeOpen={setYouTubeOpen}
          handleIngredientsOpen={setIngredientsOpen}
        />
      </main>
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

MakeRecipePage.layout = {
  includeContainer: true,
};

export default MakeRecipePage;
