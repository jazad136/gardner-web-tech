import cn from "classnames";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRecipeContext } from "src/context/RecipeContext";
import { urlFor } from "src/lib/SanityUi";
import {
  Brand,
  MenuToggle,
  NavbarWrapper,
  RecipeSideNav,
  ThemeToggle,
} from "ui";

const Navbar = () => {
  const { status } = useSession();
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
    <>
      <motion.div initial={false} animate={expanded ? "open" : "closed"}>
        <NavbarWrapper removeMarginBottom={true}>
          {status === "authenticated" && (
            <div className={cn({ "opacity-0": expanded })}>
              <MenuToggle toggle={() => setExpanded(!expanded)} />
            </div>
          )}
          <Brand href="/">Recipes</Brand>
          <div className="flex ">
            <div className="flex items-center">
              <ThemeToggle id="themeToggle" />
            </div>
            {status === "unauthenticated" && (
              <div
                onClick={() => signIn()}
                className="prose dark:prose-dark lg:prose-sm my-2 ml-4 flex uppercase hover:cursor-pointer hover:opacity-75 lg:leading-loose"
              >
                Login
              </div>
            )}
            {status === "authenticated" && (
              <>
                <Link href="/auth/accounts">
                  <div className="prose dark:prose-dark lg:prose-sm my-2 ml-4 flex uppercase hover:cursor-pointer hover:opacity-75 lg:leading-loose">
                    Link Account
                  </div>
                </Link>
                <div
                  onClick={() => signOut()}
                  className="prose dark:prose-dark lg:prose-sm my-2 ml-4 flex uppercase hover:cursor-pointer hover:opacity-75 lg:leading-loose"
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </NavbarWrapper>
        {status === "authenticated" && !!mappedRecipes && (
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
