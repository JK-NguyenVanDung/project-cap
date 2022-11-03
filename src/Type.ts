import { z } from 'zod'

export interface ILogin {}

const CategoryItem = z.object({
  categoryID: z.number(),
  categoryName: z.string(),
})

export type CategoryItem = z.infer<typeof CategoryItem>
