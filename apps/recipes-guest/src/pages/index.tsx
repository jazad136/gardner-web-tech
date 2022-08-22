import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BsChevronBarDown } from "react-icons/bs";
import { useRecipeContext } from "src/context/RecipeContext";
import { sanityClient } from "src/lib/SanityServer";
import { CustomNextPage } from "src/types";
import { allRecipesQuery, Button, Paragraph, RecipeListItem } from "ui";

type Props = {
  allRecipes: RecipeListItem[];
};

const HomePage: CustomNextPage<Props> = ({ allRecipes }) => {
  const { handleSetRecipes } = useRecipeContext();

  useEffect(() => {
    handleSetRecipes(allRecipes);
  }, [allRecipes, handleSetRecipes]);

  const scrollToBottom = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div>
        <Head>
          <title>Recipes</title>
          <meta name="description" content="View our recipes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="z-10 flex w-full flex-1 flex-col items-center justify-center overflow-hidden p-0 text-center">
          <div className="relative z-0 h-[95vh] w-full overflow-auto text-center text-white md:overflow-hidden">
            <Image
              layout="fill"
              className="object-cover"
              src="/Cooking-Home-Collection.jpg"
              alt="recipes landing page image"
              priority
            />
            <h1 className="absolute top-1/2 left-1/2 m-0 mb-0.5 -translate-x-1/2 -translate-y-1/2 transform text-6xl">
              Welcome to our guest recipes website!
            </h1>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <Button
                color="white"
                size="xl"
                onClick={scrollToBottom}
                isOutline
                ariaLabel="Scroll to Bottom"
              >
                <BsChevronBarDown size="1.5rem" className="text-white" />
              </Button>
            </div>
          </div>
          <Paragraph id="footer" className="prose-2xl my-8 w-1/2">
            To view our recipes, please open the side nav by clicking on the
            menu button in the top left corner. Please note that none of the
            recipes in this application with the some exceptions are actual
            recipes! This is the demo page only. Most of this uses generated
            Bacon Ipsum. The one exception is the{" "}
            <Link href="/buffalo-chicken-quesadilla">
              <a className="text-sky-500 underline">
                Buffalo Chicken Quesadilla
              </a>
            </Link>
            .
          </Paragraph>
        </main>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const allRecipes = (await sanityClient.fetch(
    allRecipesQuery
  )) as RecipeListItem[];

  return {
    props: {
      allRecipes,
    } as Props,
    revalidate: 60 * 60 * 24, // refresh data every day
  };
};

HomePage.layout = {
  includeContainer: false,
};

export default HomePage;
