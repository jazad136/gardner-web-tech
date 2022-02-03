import { useEffect, useState } from "react";
import {
  NavbarWrapper,
  MenuToggle,
  Brand,
  RecipeListItem,
  RecipeLink,
} from "ui";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "ui/ThemeToggle";
import { useRecipeContext } from "src/lib/RecipeContext";
import cn from "classnames";
import { useLoadingContext } from "src/lib/LoadingContext";
import { urlFor } from "src/lib/SanityUi";

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

  useEffect(() => {
    const mappedRecipes = recipes.map((recipe) => {
      return {
        ...recipe,
        image: urlFor(recipe.image).width(60).height(60).auto("format").url(),
      };
    });
    setDisplayedRecipes(mappedRecipes);
  }, [recipes]);

  useEffect(() => {
    if (search.length > 1) {
      const filteredRecipes = (displayedRecipes ?? []).filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
      setDisplayedRecipes(filteredRecipes);
    } else {
      setDisplayedRecipes(displayedRecipes);
    }
  }, [search, displayedRecipes, setDisplayedRecipes]);

  return (
    <>
      <motion.div initial={false} animate={expanded ? "open" : "closed"}>
        <NavbarWrapper removeMarginBottom={true}>
          <div className={cn({ "opacity-0": expanded })}>
            <MenuToggle toggle={() => setExpanded(!expanded)} />
          </div>
          <div className="text-xl">
            <Brand href="/">Recipes</Brand>
          </div>
          <ThemeToggle isLarge id="themeToggle" />
        </NavbarWrapper>
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
                className="min-h-full overflow-y-auto fixed z-20 bg-gray-100 dark:bg-gray-900 scrollbar border-b-4"
              >
                <div className="w-full p-2 h-screen mr-1">
                  <div className="sticky top-0 mb-2 block z-50 bg-gray-100 dark:bg-gray-900 py-2 border-b-2 border-solid">
                    <div className="flex justify-between items-center">
                      <Brand href="/">Recipes</Brand>
                      <div className="px-2">
                        <MenuToggle toggle={() => setExpanded(!expanded)} />
                      </div>
                    </div>
                  </div>
                  <form className="flex w-full px-4 py-2">
                    <input
                      type="search"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="search"
                      placeholder="Search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                  <div className="relative mr-auto block w-full pb-5 z-0 pr-6 pl-2">
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
      </motion.div>
    </>
  );
};

export default Navbar;
