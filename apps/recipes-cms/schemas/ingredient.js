import { MdLocalGroceryStore as icon } from "react-icons/md";

const regex = /[0-9\s\/]*/g;

export default {
  name: "ingredient",
  title: "Ingredient",
  type: "object",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "string",
      description:
        "Please use numbers only (eg. 1, 1 1/2, 1/2, etc.). Changes in UI when changing batch numbers.",
      validation: (Rule) => Rule.regex(/^[\d\s\/]*$/),
    },
    {
      name: "unit",
      title: "Unit",
      type: "string",
      description:
        "Anything that comes after numbers you want multiplied when changing batches",
    },
    {
      name: "notes",
      title: "Notes",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      quantity: "quantity",
      unit: "unit",
    },
    prepare({ title, quantity, unit }) {
      return {
        title,
        subtitle: `${quantity || ""} ${unit || ""}`.trim(),
      };
    },
  },
};
