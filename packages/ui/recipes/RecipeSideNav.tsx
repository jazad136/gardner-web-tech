import React, { useMemo, useState } from "react";
import { RecipeListItem } from "./Recipe";
import RecipeLink from "./RecipeLink";
import RecipeSearchForm from "./RecipeSearchForm";
import RecipeSideNavHeader from "./RecipeSideNavHeader";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  recipes: RecipeListItem[];
};

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

const RecipeSideNav: React.FC<Props> = ({
  expanded,
  setExpanded,
  recipes,
}: Props) => {
  const [search, setSearch] = useState("");

  const displayedRecipes = useMemo(() => {
    if (search.length > 1) {
      return (recipes ?? []).filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return recipes;
    }
  }, [search, recipes]);

  return (
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
            className="min-h-full overflow-y-auto fixed z-20 bg-gray-100 dark:bg-gray-900 scrollbar scrollbar-thin border-b-4"
          >
            <div className="w-full p-2 h-screen mr-1">
              <RecipeSideNavHeader setExpanded={setExpanded} />
              <RecipeSearchForm setSearch={setSearch} />
              <div className="relative mr-auto block w-full pb-5 z-0 pr-6 pl-2">
                {(displayedRecipes ?? []).map(
                  (recipe: RecipeListItem, index) => (
                    <RecipeLink
                      key={`recipe-${index}`}
                      recipe={recipe}
                      setSearch={setSearch}
                      closeSidebar={() => setExpanded(false)}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipeSideNav;
