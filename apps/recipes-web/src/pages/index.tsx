import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { BsChevronBarDown } from "react-icons/bs";
import { useRecipeContext } from "src/lib/RecipeContext";
import { sanityClient } from "src/lib/SanityServer";
import { Button, RecipeListItem } from "ui";
import { allRecipesQuery } from "ui/recipes";

export interface HomeProps {
  allRecipes: RecipeListItem[];
}

const Home = ({ allRecipes }: HomeProps) => {
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

        <main className="p-0 flex-1 flex flex-col justify-center items-center w-full overflow-hidden text-center z-10">
          <div className="relative text-center text-white z-0 h-screen w-full md:overflow-hidden overflow-auto">
            <Image
              layout="fill"
              className="object-cover"
              src="/Cooking-Home-Collection.jpg"
              alt="recipes landing page image"
            />
            <h1 className="m-0 mb-0.5 text-6xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Welcome to our guest recipes website!
            </h1>
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Button
                color="white"
                size="xl"
                onClick={scrollToBottom}
                isOutline
              >
                <BsChevronBarDown size="1.5rem" className="text-white" />
              </Button>
            </div>
          </div>
          <div id="footer" className="my-3 text-2xl w-1/2">
            To view our recipes, please open the side nav by clicking on the
            menu button in the top left corner.
          </div>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const allRecipes = (await sanityClient.fetch(
    allRecipesQuery
  )) as RecipeListItem[];

  return {
    props: {
      allRecipes,
    },
    revalidate: 1,
  };
}

Home.layoutProps = {
  useContainer: false,
};

Home.auth = true;

export default Home;
