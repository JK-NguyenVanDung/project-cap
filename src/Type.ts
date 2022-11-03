import { z } from 'zod'

export const API_URL = 'http://cntttest.vanlanguni.edu.vn:18080/CP25Team02'
export interface ILogin {}

const CategoryItem = z.object({
  categoryID: z.number(),
  categoryName: z.string(),
})

export type CategoryItem = z.infer<typeof CategoryItem>
