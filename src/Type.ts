import { z } from 'zod';

export interface ILogin {
  userName: string;
  password: string;
}
export interface IAccount {
  id: string;
  name: string;
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
});

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
});

const CategoryItem = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
});

const ProgramItem = z.object({
  ProgramId: z.number(),
  FacultyId: z.number(),
  AccountIdCreator: z.number(),
  CategoryId: z.number(),
  ProgramName: z.string(),
  Image: z.string(),
  StartDate: z.date(),
  EndDate: z.date(),
  IsPublish: z.boolean(),
  Coin: z.number(),
});

const ChapterItem = z.object({
  ContentId: z.number(),
  ProgramId: z.number(),
  ContentTitle: z.string(),
  ContentDescription: z.string(),
  Chapter: z.number(),
  ContentType: z.string(),
  Content: z.string(),
});
export type IRoleItem = z.infer<typeof RoleItem>;

export type ICategoryItem = z.infer<typeof CategoryItem>;
export type IAccountItem = z.infer<typeof AccountItem>;
export type IProgramItem = z.infer<typeof ProgramItem>;
export type IChapterItem = z.infer<typeof ChapterItem>;
