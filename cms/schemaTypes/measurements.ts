import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'measurement',
  title: 'Measurement',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
  ],
})
