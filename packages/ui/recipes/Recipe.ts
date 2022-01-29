export interface RecipeListItem {
  cookTime: number;
  prepTime: number;
  restTime: number;
  slug: string;
  title: string;
  image?: any;
}

export interface Recipe {
  title: string;
  image?: any;
  notes?: Note[];
  cookTime: number;
  prepTime: number;
  restTime?: number;
  youTubeUrls?: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  slug: string;
}

export interface Note {}

export interface Ingredient {
  title: string;
  quantity: number;
  notes: string;
}

export interface Instruction {}
