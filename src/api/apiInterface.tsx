// AUTH
export interface ISignUp {
  emailAddress: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  roleId: string;
}

export interface IGift {
  giftId: number;
  name: string;
  description: string;
  coin: number;
  quantity: number;
  image: string;
}
export interface IGIFTSTATUS {
  accountGiftId: number;
  reason?: string;
  status: string;
}
export interface IADDEXCHANGE {
  giftId: number;
  quantity: number;
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
