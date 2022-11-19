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

export type IFuculties = {
  facultyId: number;
  facultyName: string;
  programs: [];
};
