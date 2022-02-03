export const allRecipesQuery = `
  *[_type == "recipe" && defined(slug.current)] | order(title asc) [] {
    title,
    image,
    cookTime,
    prepTime,
    restTime,
    'slug': slug.current,
  }
`;

export const currentRecipeQuery = `
  *[_type == "recipe" && slug.current == $slug][0] {
    notes,
    youTubeUrls,
    ingredients,
    instructions,
    title,
    image,
    cookTime,
    prepTime,
    restTime,
    serves,
    'slug': slug.current,
  }
`;

export const recipeQuery = `
{
  "currentRecipe": ${currentRecipeQuery},
  "allRecipes": ${allRecipesQuery}
}`;

export const recipeSlugsQuery = `*[_type == "recipe" && defined(slug.current)][].slug.current`;
