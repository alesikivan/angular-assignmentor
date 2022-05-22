export interface UserModel {
  id: number,
  name: string,
  email: string,
  mobile: string,
  gender: string,
  date: Date,
  isActive: boolean,
  userType?: string
}
