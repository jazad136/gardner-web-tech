import React from "react";

type Props = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const RecipeSearchForm: React.FC<Props> = ({ setSearch }) => (
  <form className="flex w-full px-4 py-2">
    <input
      type="search"
      className="prose dark:prose-dark shadow appearance-none border rounded-lg w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="search"
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}
    />
  </form>
);

export default RecipeSearchForm;
