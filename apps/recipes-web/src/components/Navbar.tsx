import { useEffect, useMemo, useState } from "react";
import RecipeLink from "./RecipeLink";
import { NavbarWrapper, MenuToggle, Brand, RecipeListItem } from "ui";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "ui/ThemeToggle";
import { useRecipeContext } from "src/lib/RecipeContext";
import cn from "classnames";
import { useLoadingContext } from "src/lib/LoadingContext";
import { useSession, signIn, signOut } from "next-auth/react";

const slideOut = {
  closed: {
    x: "-100vw",
    opacity: 0,
  },
  open: {
    x: "0",
    opacity: 1,
    animate: "push",
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    animate: "push",
    transition: {
      duration: 0.2,
    },
  },
};

const Navbar = () => {
  const { recipes } = useRecipeContext();
  const { handleSetLoading } = useLoadingContext();
  const [expanded, setExpanded] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  const isUser: boolean = useMemo(() => !!session?.user, [session]);

  useEffect(() => {
    setDisplayedRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    let filteredRecipes = recipes;
    if (search.length > 1) {
      filteredRecipes = (recipes ?? []).filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setDisplayedRecipes(filteredRecipes);
  }, [search, recipes, setDisplayedRecipes]);

  return (
    <>
      <motion.div initial={false} animate={expanded ? "open" : "closed"}>
        <NavbarWrapper removeMarginBottom={true}>
          {isUser && (
            <div className={cn({ "opacity-0": expanded })}>
              <MenuToggle toggle={() => setExpanded(!expanded)} />
            </div>
          )}
          <div className="text-xl">
            <Brand href="/">Recipes</Brand>
          </div>
          <div className="flex ">
            <div className="flex items-center">
              <ThemeToggle isLarge id="themeToggle" />
            </div>
            {isUser ? (
              <div
                onClick={() => signOut()}
                className="flex prose dark:prose-dark text-primary lg:text-sm lg:leading-loose uppercase hover:opacity-75 my-2 ml-4 hover:cursor-pointer"
              >
                Logout
              </div>
            ) : (
              <div
                onClick={() => signIn()}
                className="flex prose dark:prose-dark text-primary lg:text-sm lg:leading-loose uppercase hover:opacity-75 my-2 ml-4 hover:cursor-pointer"
              >
                Login
              </div>
            )}
          </div>
        </NavbarWrapper>
        {isUser && (
          <div className="absolute top-0 w-full">
            <AnimatePresence
              initial={false}
              exitBeforeEnter={true}
              onExitComplete={() => null}
            >
              {expanded && (
                <motion.div
                  variants={slideOut}
                  onClick={(e) => e.stopPropagation()}
                  initial="closed"
                  animate="open"
                  exit="exit"
                  className="min-h-full overflow-y-auto absolute z-20 bg-white dark:bg-gray-900 scrollbar"
                >
                  <div className="w-full p-2 h-screen mr-1">
                    <div className="sticky top-0 mb-2 block z-50 bg-white dark:bg-gray-900 py-2 border-b-2 border-solid">
                      <div className="flex justify-between items-center">
                        <Brand href="/">Recipes</Brand>
                        <div className="px-2">
                          <MenuToggle toggle={() => setExpanded(!expanded)} />
                        </div>
                      </div>
                    </div>
                    <form className="flex w-full px-4 py-2">
                      <input
                        type="text"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="search"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    <div className="relative mr-auto block w-full pb-5 z-0">
                      {(displayedRecipes ?? []).map(
                        (recipe: RecipeListItem, index) => (
                          <RecipeLink
                            key={`recipe-${index}`}
                            recipe={recipe}
                            closeSidebar={() => (
                              setExpanded(false), handleSetLoading(true)
                            )}
                          />
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Navbar;
