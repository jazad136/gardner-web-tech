import { createContext, ReactElement, useContext, useState } from "react";
import { RecipeListItem } from "ui";

export interface RecipeProviderProps {
  children: string | ReactElement | ReactElement[];
}

export interface RecipeProviderInterface {
  recipes: RecipeListItem[];
  handleSetRecipes: React.Dispatch<React.SetStateAction<RecipeListItem[]>>;
}

const RecipeContext = createContext<RecipeProviderInterface | null>(null);

export const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [recipes, setRecipes] = useState([]);

  const handleSetRecipes = (recipes: RecipeListItem[]): void => {
    setRecipes(recipes);
  };

  const recipeState: RecipeProviderInterface = {
    recipes,
    handleSetRecipes,
  };

  return (
    <RecipeContext.Provider value={recipeState}>
      {children}
    </RecipeContext.Provider>
  );
};

export function useRecipeContext() {
  return useContext(RecipeContext);
}
