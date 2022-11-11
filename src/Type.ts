import { z } from 'zod'

export interface ILogin {
  userName: string
  password: string
}
export interface IAccount {
  id: string
  name: string
}
// export interface IAccountItem {
//   id: string
//   key: string
//   userName: string
//   Email: string
//   address: string
//   fullName: string
// }

const RoleItem = z.object({
  roleId: z.number(),
  roleName: z.string(),
})

const AccountItem = z.object({
  accountId: z.number(),
  roleId: z.number(),
  fullName: z.string(),
  address: z.string(),
  extendnalId: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  essayAnswers: z.unknown(),
  learnerAccountIdApproverNavigations: z.unknown(),
  learnerAccountIdLearnerNavigations: z.unknown(),
  multipleChoiceAnswers: z.unknown(),
  programs: z.unknown(),
  role: z.string(),
})

const CategoryItem = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
})
export type IRoleItem = z.infer<typeof RoleItem>

export type CategoryItem = z.infer<typeof CategoryItem>
export type IAccountItem = z.infer<typeof AccountItem>
