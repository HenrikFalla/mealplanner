import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ingredientInRecipe',
  title: 'Ingredient',
  type: 'object',
  fields: [
    defineField({
      name: 'ingredient',
      title: 'Ingredient Name',
      type: 'reference',
      to: [{type: 'ingredient'}],
    }),
    defineField({
      name: 'measurement',
      title: 'Measurement',
      type: 'reference',
      to: [{type: 'measurement'}],
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'ingredient.name',
      measurement: 'measurement.name',
      quantity: 'quantity',
    },
    prepare({title, measurement, quantity}) {
      return {
        title: `${quantity} ${measurement} ${title}`,
      }
    },
  },
})
