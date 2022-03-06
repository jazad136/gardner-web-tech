import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DisplayTime, RecipeListItem } from "ui";

type Props = {
  recipe: RecipeListItem;
  closeSidebar: () => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const RecipeLink: React.FC<Props> = ({ recipe, closeSidebar, setSearch }) => {
  const handleClick = () => {
    setSearch("");
    closeSidebar();
  };

  return (
    <div className="my-4">
      <Link
        href={{ pathname: "/recipe/[slug]", query: { slug: recipe.slug } }}
        prefetch={false}
      >
        <a className="flex" onClick={() => handleClick()}>
          <div className="inline-block mr-3">
            {recipe.image && (
              <Image
                alt={recipe.title}
                width="60"
                height="60"
                src={recipe.image}
                loading="lazy"
              />
            )}
          </div>
          <div className="inline-block">
            <div className="block">
              <div className="text-xl font-normal text-black flex-1 overflow-ellipsis prose dark:prose-dark">
                {recipe.title}
              </div>
              <div className="text-sm prose text-slate-500">
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
