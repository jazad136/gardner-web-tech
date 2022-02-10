import { useMemo, useState } from "react";
import { NavbarWrapper, MenuToggle, Brand, RecipeSideNav } from "ui";
import { motion } from "framer-motion";
import ThemeToggle from "ui/ThemeToggle";
import { useRecipeContext } from "src/lib/RecipeContext";
import cn from "classnames";
import { useSession, signOut } from "next-auth/react";
import { urlFor } from "src/lib/SanityUi";

const Navbar = () => {
  const recipesContext = useRecipeContext();
  const [expanded, setExpanded] = useState(false);
  const { data: session } = useSession();

  const isUser: boolean = useMemo(() => !!session?.user, [session]);

  const mappedRecipes = useMemo(() => {
    return (recipesContext?.recipes ?? []).map((recipe) => {
      return {
        ...recipe,
        image: urlFor(recipe.image).width(60).height(60).auto("format").url(),
      };
    });
  }, [recipesContext]);

  if (!isUser) {
    return <></>;
  }

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
          <div className="flex ">
            <div className="flex items-center">
              <ThemeToggle isLarge id="themeToggle" />
            </div>
            <div
              onClick={() => signOut()}
              className="flex prose dark:prose-dark text-primary lg:text-sm lg:leading-loose uppercase hover:opacity-75 my-2 ml-4 hover:cursor-pointer"
            >
              Logout
            </div>
          </div>
        </NavbarWrapper>
        {!!mappedRecipes && (
          <RecipeSideNav
            expanded={expanded}
            setExpanded={setExpanded}
            recipes={mappedRecipes}
          />
        )}
      </motion.div>
    </>
  );
};

export default Navbar;
