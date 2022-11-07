import { z } from 'zod'

export interface ILogin {
  userName: string
  password: string
}

const CategoryItem = z.object({
  ID: z.number(),
  categoryName: z.string(),
})

export type CategoryItem = z.infer<typeof CategoryItem>
