export interface RecipeListItem {
  cookTime: number;
  prepTime: number;
  restTime: number;
  slug: string;
  title: string;
  image?: string;
}

export interface Recipe {
  title: string;
  image?: any;
  notes?: object[];
  cookTime: number;
  prepTime: number;
  restTime: string;
  youTubeUrls?: string[];
  ingredients: Ingredient[];
  instructions: object[];
  slug: string;
}

export interface RecipeDocumentInterface {
  title: string;
  image?: string;
  notes?: string;
  cookTime: number;
  prepTime: number;
  restTime: string;
  ingredients: Ingredient[];
  instructions: string;
  slug: string;
}

export interface Ingredient {
  title: string;
  quantity: number;
  notes: string;
}
