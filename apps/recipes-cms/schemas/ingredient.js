import {
  MdLocalGroceryStore as icon
} from 'react-icons/md'

export default {
  name: 'ingredient',
  title: 'Ingredient',
  type: 'object',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(80),
    },
    {
      name: 'quantity',
      title: 'Quantity',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      quantity: 'quantity',
    },
    prepare({ title, quantity }) {
      return {
        title,
        subtitle: quantity,
      }
    }
  },
}