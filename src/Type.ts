import {
  ActionFunction,
  LoaderFunction,
  RouteObject,
  ShouldRevalidateFunction,
} from 'react-router-dom';
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
const QuestionType = z.object({
  typeId: z.number(),
  typeName: z.string(),
});
const QuestionContent = z.object({
  questionContentId: z.number(),
  questionId: z.number(),
  content: z.string(),
  isAnswer: z.boolean(),
});
const Question = z.object({
  questionId: z.number(),
  testsId: z.number(),
  typeId: z.number(),
  questionTitle: z.string(),
  score: z.number(),
  questionContents: z.array(QuestionContent),
});
const Test = z.object({
  testId: z.number(),
  contentId: z.number(),
  testTitle: z.string(),
  time: z.number(),
  chapter: z.number(),
  isRandom: z.boolean(),
  questions: z.array(z.any()),
});

export type IRoleItem = z.infer<typeof RoleItem>;

export type ICategoryItem = z.infer<typeof CategoryItem>;
export type IAccountItem = z.infer<typeof AccountItem>;
export type IProgramItem = z.infer<typeof ProgramItem>;
export type IQuestionType = z.infer<typeof QuestionType>;
export type IQuestion = z.infer<typeof Question>;
export type ITest = z.infer<typeof Test>;

export type IQuestionContent = z.infer<typeof QuestionContent>;
export type IChapterItem = z.infer<typeof ChapterItem>;
export interface IRouterObj {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  errorElement?: React.ReactNode | null;
  handle?: RouteObject['handle'];
  shouldRevalidate?: ShouldRevalidateFunction;
}
