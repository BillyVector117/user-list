export interface IUser {
  id: number
  name: string
  email: string
  gender: string
  status: string
  avatar: string
}
export interface UserSlice {
  users: IUser[];
  loading: boolean;
  value: number;
}
export interface IGetAllUsers {
  id: number
  name: string
  email: string
  gender: string
  status: string
}