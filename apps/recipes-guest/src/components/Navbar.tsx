import { useMemo, useState } from "react";
import { NavbarWrapper, MenuToggle, Brand, RecipeSideNav } from "ui";
import { motion } from "framer-motion";
import ThemeToggle from "ui/ThemeToggle";
import { useRecipeContext } from "src/lib/RecipeContext";
import cn from "classnames";
import { urlFor } from "src/lib/SanityUi";

const Navbar = () => {
  const recipesContext = useRecipeContext();

  const [expanded, setExpanded] = useState(false);

  const mappedRecipes = useMemo(() => {
    return (recipesContext?.recipes ?? []).map((recipe) => {
      return {
        ...recipe,
        image: urlFor(recipe.image).width(60).height(60).auto("format").url(),
      };
    });
  }, [recipesContext]);

  return (
    <motion.div initial={false} animate={expanded ? "open" : "closed"}>
      <NavbarWrapper removeMarginBottom={true}>
        <div className={cn({ "opacity-0": expanded })}>
          <MenuToggle toggle={() => setExpanded(true)} />
        </div>
        <div className="text-xl">
          <Brand href="/">Recipes</Brand>
        </div>
        <ThemeToggle isLarge id="themeToggle" />
      </NavbarWrapper>
      {!!mappedRecipes && (
        <RecipeSideNav
          expanded={expanded}
          setExpanded={setExpanded}
          recipes={mappedRecipes}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
