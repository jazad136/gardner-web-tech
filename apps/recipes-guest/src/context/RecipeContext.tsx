import { createContext, useContext, useState } from "react";
import { RecipeListItem } from "ui";

interface IRecipeProvider {
  recipes: RecipeListItem[];
  handleSetRecipes: React.Dispatch<React.SetStateAction<RecipeListItem[]>>;
}

const RecipeContext = createContext<IRecipeProvider | null>(null);

export const RecipeProvider: React.FC = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const handleSetRecipes = (recipes: RecipeListItem[]): void => {
    setRecipes(recipes);
  };

  const recipeState: IRecipeProvider = {
    recipes,
    handleSetRecipes,
  };

  return (
    <RecipeContext.Provider value={recipeState}>
      {children}
    </RecipeContext.Provider>
  );
};

export function useRecipeContext(): IRecipeProvider {
  return useContext(RecipeContext);
}
