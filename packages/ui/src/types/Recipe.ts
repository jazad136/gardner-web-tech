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
  serves: number;
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
  serves: number;
}

export interface Ingredient {
  title: string;
  quantity: string;
  unit: string;
  notes: string;
}
