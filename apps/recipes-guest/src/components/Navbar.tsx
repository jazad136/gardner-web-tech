import { useEffect, useState } from "react";
import RecipeLink from "./RecipeLink";
import { NavbarWrapper, MenuToggle, Brand, Recipe } from "ui";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "ui/ThemeToggle";
import { useRecipeContext } from "src/lib/RecipeContext";
import cn from "classnames";

const Navbar = () => {
  const { recipes } = useRecipeContext();
  const [expanded, setExpanded] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDisplayedRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    let filteredRecipes = recipes;
    if (search.length > 3) {
      filteredRecipes = (recipes ?? []).filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setDisplayedRecipes(filteredRecipes);
  }, [search, recipes, setDisplayedRecipes]);

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
                className="min-h-full overflow-y-auto absolute z-50 whitespace-nowrap bg-white"
              >
                <div className="w-full p-2 h-screen mr-1">
                  <div className="sticky top-0 mb-2">
                    <div className="flex justify-between items-center">
                      <div className="text-xl">
                        <Brand href="/">Recipes</Brand>
                      </div>
                      <div className="px-2">
                        <MenuToggle toggle={() => setExpanded(!expanded)} />
                      </div>
                    </div>
                  </div>
                  <div className="mr-auto block w-full pb-5">
                    {(displayedRecipes ?? []).map((recipe: Recipe) => (
                      <RecipeLink key={recipe.title} recipe={recipe} />
                    ))}
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
