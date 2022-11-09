import { z } from 'zod'

export interface ILogin {
  userName: string
  password: string
}
export interface IAccount {
  id: string
  name: string
}
const CategoryItem = z.object({
  CategoryId: z.number(),
  CategoryName: z.string(),
})

export type CategoryItem = z.infer<typeof CategoryItem>
