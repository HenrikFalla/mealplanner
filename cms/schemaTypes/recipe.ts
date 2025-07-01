import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'array',
      of: [{type: 'reference', to: {type: 'genre'}}],
    }),
    defineField({
      name: 'instructions',
      title: 'instruction',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'portions',
      title: 'Portions',
      type: 'number',
    }),
    defineField({
      name: 'minPortions',
      title: 'Minimum Portions',
      type: 'number',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{type: 'ingredientInRecipe'}],
    }),
  ],
})
