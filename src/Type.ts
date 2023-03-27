import {
  ActionFunction,
  LoaderFunction,
  RouteObject,
  ShouldRevalidateFunction,
} from 'react-router-dom';
import { boolean, z } from 'zod';

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
  learnerAccountIdApproverNavigations: z.unknown(),
  learnerAccountIdLearnerNavigations: z.unknown(),
  role: z.string(),
});

const CategoryItem = z.object({
  categoryId: z.number(),
  categoryName: z.string(),
});

const AcademicYear = {
  id: z.number(),
  year: z.string(),
};
const Faculty = {
  facultyId: z.number(),
  facultyName: z.string(),
};
const Position = {
  programId: z.number(),
  positionId: z.number(),
  createdAt: z.date(),
  position: z.object({
    positionId: z.number(),
    positionName: z.string(),
  }),
};
const Learner = z.object({
  status: z.string(),
  registerStatus: z.string(),
  reasonRefusal: z.string(),
  timeFinsih: z.string(),
});
const ProgramItem = z.object({
  isRegister: z.boolean(),
  isLike: z.boolean(),
  programId: z.number(),
  facultyId: z.number(),
  accountIdCreator: z.number(),
  categoryId: z.number(),
  programName: z.string(),
  image: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  isPublish: z.boolean(),
  coin: z.number(),
  academicYearId: z.number(),
  semester: z.number(),
  descriptions: z.string(),
  status: z.string(),
  registrationStartDate: z.date(),
  registrationEndDate: z.date(),
  academicYear: z.object(AcademicYear),
  accountPrograms: z.array(null),
  accountIdCreatorNavigation: null,
  countLearner: z.number(),

  learnerCount: z.number(),
  category: z.object({
    categoryId: z.number(),
    categoryName: z.string(),
  }),
  learners: z.array(Learner),
  maxLearner: z.number() || z.string(),
  faculty: z.object(Faculty),
  programPositions: z.array(z.object(Position)),
  lecturers: z.string(),
  trainingHours: z.string(),
  totalLike: z.number(),
  registerStatus: z.string(),
  isComplete: z.boolean(),
});

const ChapterItem = z.object({
  contentId: z.number(),
  programId: z.number(),
  contentTitle: z.string(),
  contentDescription: z.string(),
  chapter: z.number(),
  contentType: z.string(),
  content: z.string(),
  isTest: z.boolean(),
  isDone: z.boolean(),
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
  index: z.number(),
});
const Test = z.object({
  testId: z.number(),
  contentId: z.number(),
  testTitle: z.string(),
  time: z.number(),
  chapter: z.number(),
  isRandom: z.boolean(),
  questions: z.array(z.any()),
  questionCount: z.number(),
});

const Answer = z.object({
  questionId: z.number(),
  questionContentId: z.number(),
});
const SurveyItem = z.object({
  surveyId: z.number(),
  accountIdCreate: z.number(),
  title: z.string(),
  isPublish: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
  countAccount: z.number(),
});
const SurveyQuestionContent = z.object({
  contentSurveyId: z.number(),
  questionSurveyId: z.number(),
  content: z.string(),
  isChoice: z.boolean(),
  accountSurveys: z.array(z.any()),
});
const SurveyQuestion = z.object({
  accountSurveys: z.any(),
  questionSurveyId: z.number(),
  surveyId: z.number(),
  title: z.string(),
  isChoice: z.boolean(),
  contentQuestions: z.array(SurveyQuestionContent),

  index: z.number(),
});

const SurveyAnswer = z.object({
  surveyId: z.number(),
  accountId: z.number(),

  contentAnswers: z.array(SurveyQuestionContent),
});

const AccountSurvey = z.object({
  accountSurveyId: z.number(),
  accountId: z.number(),
  contentSurveyId: z.number(),
  questionSurveyId: z.number(),

  content: z.string().max(200),
});
const ContentSurveyPrograms = z.object({
  point: z.number(),
  number: z.number(),
  answer: z.string().max(200),
  content: z.string(),
});
const SurveyProgram = z.object({
  programId: z.number(),
  accountId: z.number(),

  contentSurveyPrograms: z.array(ContentSurveyPrograms),
});
const ResultTests = z.object({
  testTitle: z.string(),
  averageTestScore: z.number(),
});
const ResultAttendances = z.object({
  titleAttendance: z.string(),
  countLearnerAttendance: z.number(),
});

const ProgramResults = z.object({
  countLearners: z.number(),
  countApplications: z.number(),
  countLearnerStopParticipating: z.number(),
  countLearnerIncomplete: z.number(),
  countLearnerComplete: z.number(),
  countLearnerAttending: z.number(),
  countLike: z.number(),
  countComment: z.number(),
  countContent: z.number(),
  resultTests: z.array(ResultTests),
  resultAttendances: z.array(ResultAttendances),
});
const CertificatePhoto = z.object({
  comment: z.string(),
  creatorAccount: z.number(),
  creatorId: z.number(),
  exchange: z.string(),
  exchangeId: z.number(),
  id: z.number(),
  image: z.string(),
  reviewDate: z.number(),
  reviewerAccount: z.number(),
  reviewerId: z.number(),
  sentDate: z.date(),
  status: z.string(),
});
const ExchangeCoin = z.object({
  certificatePhotos: z.array(CertificatePhoto),
  ended: z.boolean(),
  exchangeId: z.number(),
  creatorId: z.number(),
  title: z.string(),
  description: z.string(),
  coin: z.number(),
  endDate: z.date(),
  status: z.string(),
  creatorAccount:
    AccountItem &&
    z.object({
      creatorCertificatePhoto: z.array(CertificatePhoto),
    }),
});
const Certification = z.object({
  id: z.number(),
  exchangeId: z.number(),
  creatorId: z.number(),
  title: z.string(),
  description: z.string(),
  coin: z.number(),
  endDate: z.date(),
});
const Gift = z.object({
  coin: z.number(),
  description: z.string(),
  giftId: z.number(),
  image: z.string(),
  name: z.string(),
  quantity: z.number(),
});
const GiftExchange = z.object({
  id: z.number(),
  accountId: z.number(),
  account: AccountItem,
  reason: z.string(),
  gift: Gift,
  createdAt: z.date(),
});

export type IRoleItem = z.infer<typeof RoleItem>;
export type IAnswer = z.infer<typeof Answer>;

export type ICategoryItem = z.infer<typeof CategoryItem>;
export type IAccountItem = z.infer<typeof AccountItem>;
export type IProgramItem = z.infer<typeof ProgramItem>;

export type IQuestionType = z.infer<typeof QuestionType>;
export type IQuestion = z.infer<typeof Question>;
export type ITest = z.infer<typeof Test>;

export type IQuestionContent = z.infer<typeof QuestionContent>;
export type IChapterItem = z.infer<typeof ChapterItem>;
export type ISurveyItem = z.infer<typeof SurveyItem>;
export type ISurveyQuestion = z.infer<typeof SurveyQuestion>;
export type IAccountSurvey = z.infer<typeof AccountSurvey>;
export type ISurveyProgram = z.infer<typeof SurveyProgram>;
export type ISurveyQuestionContent = z.infer<typeof SurveyQuestionContent>;
export type ISurveyAnswer = z.infer<typeof SurveyAnswer>;
export type IContentSurveyProgram = z.infer<typeof ContentSurveyPrograms>;
export type IProgramResults = z.infer<typeof ProgramResults>;

export type IExchangeCoin = z.infer<typeof ExchangeCoin>;

export type ICertification = z.infer<typeof Certification>;
export type ICertificatePhoto = z.infer<typeof CertificatePhoto>;

export type IGiftExchange = z.infer<typeof GiftExchange>;

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
