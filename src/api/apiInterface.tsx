// AUTH
export interface ISignUp {
  emailAddress: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  roleId: string;
}

export interface ICategory {
  name: string;
  ID?: number;
}

export type IFaculties = {
  facultyId: number;
  facultyName: string;
  programs: [];
};

export type IChapter = {
  programId: number;
  chapter: number;
  contentType: string;
  content: string;
};
