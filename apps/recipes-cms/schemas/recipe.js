import {
  MdCake as icon
} from 'react-icons/md'

export default {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  icon,
  fields: [{
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(3).max(80),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{
        type: 'block'
      }]
    },
    {
      name: 'cookTime',
      title: 'Cook Time',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'prepTime',
      title: 'Prep Time',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'restTime',
      title: 'Rest/Marinade Time',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'youTubeUrls',
      title: 'YouTube Urls',
      type: 'array',
      of: [{
        type: 'string'
      }],
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{
        type: 'ingredient'
      }],
      validation: Rule => Rule.required().unique().min(1),
    },
    {
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [{
        type: 'block',
        lists: [{
          title: 'Numbered',
          value: 'number'
        }],
        styles: [{
            title: 'Normal',
            value: 'normal'
          },
          {
            title: 'H1',
            value: 'h1'
          },
          {
            title: 'H2',
            value: 'h2'
          }
        ],
        marks: {
          decorators: [{
              title: "Strong",
              value: 'strong',
            },
            {
              title: "Emphasis",
              value: 'em',
            },
          ]
        }
      }],
      validation: Rule => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
      prep: 'prepTime',
      cook: 'cookTime',
      rest: 'restTime'
    },
    prepare({
      title,
      image,
      prep,
      cook,
      rest
    }) {
      let subtitle = `Time to make: ${prep + cook} min`;

      if (rest) {
        subtitle += ` (+${rest})`
      }

      return {
        title,
        subtitle,
        media: image
      }
    }
  },

}