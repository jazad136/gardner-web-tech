import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { BsChevronBarDown } from "react-icons/bs";
import { useRecipeContext } from "src/context/RecipeContext";
import { sanityClient } from "src/lib";
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
          <meta name="description" content="Welcome to our Recipes Page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="z-10 flex w-full flex-1 flex-col items-center justify-center overflow-hidden p-0 text-center">
          <div className="relative z-0 h-[95vh] w-full overflow-auto text-center text-white md:overflow-hidden">
            <Image
              layout="fill"
              className="object-cover"
              src="/Cooking-Home-Collection.jpg"
              alt="recipes landing page image"
              key="index-main"
              blurDataURL="/Cooking-Home-Collection.jpg"
              placeholder="blur"
              priority
            />
            <h1 className="absolute top-1/2 left-1/2 m-0 mb-0.5 -translate-x-1/2 -translate-y-1/2 transform text-6xl">
              Welcome to our recipes website!
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
          <div id="description" className="my-8 w-1/2">
            <Paragraph className="prose-2xl">
              The recipes in this application were created/shared by Adam
              Gardner and Janette Ruiz. We are excited to share our ideas and
              recipes with you! Please note that this is an invitation only
              application - you will not be able to share the contents of this
              application with anyone else. If you would like to share our
              recipes, there is a &quot;Print&quot; button on every recipe that
              will allow you to save the recipe as a PDF so you can print or
              send the contents to a friend.
            </Paragraph>
            <Paragraph className="prose-2xl">
              To view our recipes, please click on the icon in the upper left
              corner of any page.
            </Paragraph>
          </div>
        </main>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
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
  includeNavAndFooter: true,
};

export default HomePage;
