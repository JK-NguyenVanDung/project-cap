import { z } from 'zod'

export interface ILogin {}

const CategoryItem = z.object({
  CategoryId: z.number(),
  CategoryName: z.string(),
})

export type CategoryItem = z.infer<typeof CategoryItem>
