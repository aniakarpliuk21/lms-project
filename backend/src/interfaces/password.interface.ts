export interface IPasswordCreateDto {
  password: string;
  managerId: string;
}
export interface IOldPassword {
  _id: string;
  password: string;
  _managerId: string;
  createdAt: Date;
  updatedAt: Date;
}
