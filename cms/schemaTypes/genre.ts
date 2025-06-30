import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'genre',
  title: 'Genre',
  type: 'document',
  fields: [
    defineField({
      name: 'genreName',
      title: 'Genre Name',
      type: 'string',
    }),
  ],
})
