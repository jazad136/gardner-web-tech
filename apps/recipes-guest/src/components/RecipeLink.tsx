import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { urlFor } from "src/lib/SanityUi";
import { DisplayTime, Recipe } from "ui";

export interface RecipeLinkProps {
  recipe: Recipe;
}

const RecipeLink = ({ recipe }: RecipeLinkProps): ReactElement => {
  return (
    <div className="my-4">
      <Link href={`/${recipe.slug}`}>
        <a className="flex">
          <div className="inline-block mr-3">
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
          <div className="inline-block">
            <div className="block">
              <div className="text-xl font-normal text-black flex-1 overflow-ellipsis">
                {recipe.title}
              </div>
              <div className="text-sm text-slate-400">
                Time to make: {DisplayTime(recipe.cookTime + recipe.prepTime)}
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
