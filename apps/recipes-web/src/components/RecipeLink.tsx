import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { urlFor } from "src/lib/SanityUi";
import { DisplayTime, RecipeListItem } from "ui";

export interface RecipeLinkProps {
  recipe: RecipeListItem;
  closeSidebar: () => void;
}

const RecipeLink = ({
  recipe,
  closeSidebar,
}: RecipeLinkProps): ReactElement => {
  return (
    <div className="my-4 max-w-full">
      <Link href={{ pathname: "/[slug]", query: { slug: recipe.slug } }}>
        <a className="flex" onClick={closeSidebar}>
          <div className="flex mr-3 min-w-fit max-h-16">
            {recipe.image && (
              <Image
                alt={recipe.title}
                width="60"
                height="60"
                src={urlFor(recipe.image)
                  .width(60)
                  .height(60)
                  .auto("format")
                  .url()}
              />
            )}
          </div>
          <div className="flex">
            <div className="block">
              <div className="flex flex-wrap text-xl font-normal text-black prose dark:prose-dark break-normal">
                {recipe.title}
              </div>
              <div className="text-sm prose text-slate-400">
                Time to make:{" "}
                <DisplayTime minutes={recipe.cookTime + recipe.prepTime} />
                {recipe.restTime && <> (Rest: {recipe.restTime})</>}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default RecipeLink;
