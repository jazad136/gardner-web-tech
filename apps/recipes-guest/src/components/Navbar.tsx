import cn from "classnames";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useRecipeContext } from "src/context/RecipeContext";
import { urlFor } from "src/lib/SanityUi";
import { Brand, MenuToggle, NavbarWrapper, RecipeSideNav, ThemeToggle } from "ui";

const Navbar: React.FC = () => {
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
