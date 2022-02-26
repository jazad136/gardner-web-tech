import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { getClient, sanityClient } from "../../lib/SanityServer";
import {
  IngredientListWrapper,
  PageTitle,
  Recipe,
  RecipeListItem,
  RecipePrintButton,
  recipeQuery,
  recipeSlugsQuery,
  SpeechAlert,
  SpeechTipsModal,
  YouTubeAccordion,
} from "ui";
import { useRecipeContext } from "src/lib/RecipeContext";
import { SectionWithPortableTextBlock } from "@components/SectionWithPortableTextBlock";
import Dictaphone from "../../components/Dictaphone";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

import * as Pino from "pino";

const logger = Pino.default({ name: "MakeRecipePage" });

export interface RecipePageDataProps {
  currentRecipe: Recipe;
  allRecipes: RecipeListItem[];
}

export interface RecipePageProps {
  data: RecipePageDataProps;
}

const MakeRecipePage = ({ data }: RecipePageProps) => {
  const { handleSetRecipes } = useRecipeContext();
  const { asPath, query } = useRouter();
  const [ingredientsOpen, setIngredientsOpen] = useState(true);
  const [youTubeOpen, setYouTubeOpen] = useState(true);
  const [dictaphoneEnabled, setDictaphoneEnabled] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(false);

  useEffect(() => {
    if (data?.allRecipes) {
      handleSetRecipes(data.allRecipes);
    }
  }, [data?.allRecipes, handleSetRecipes]);

  function isScreenLockSupported() {
    return "wakeLock" in navigator;
  }

  useEffect(() => {
    let customNavigator: any;
    let screenLock: any;
    customNavigator = navigator;

    if (isScreenLockSupported()) {
      try {
        customNavigator.wakeLock
          .request("screen")
          .then((lock) => (screenLock = lock));
      } catch (err) {
        console.error(err);
      }
    }

    return () => {
      if (!!screenLock) {
        screenLock.release().then(() => {
          screenLock = null;
        });
      }
    };
  });

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

  const { title, notes, youTubeUrls, ingredients, instructions, slug } =
    data.currentRecipe;

  return (
    <>
      <div>
        <Head>
          <title>{title}</title>
          <meta name="description" content={title} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="py-8 block">
          <div className="w-full flex justify-between">
            <PageTitle classNames="inline-block align-middle">
              {title}
            </PageTitle>
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

MakeRecipePage.auth = true;

export default MakeRecipePage;
