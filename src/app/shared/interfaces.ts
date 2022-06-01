import { HttpErrorResponse } from "@angular/common/http";

export interface User {
  id?: string,
  username?: string,
  email: string,
  password: string,
  returnSecureToken?: boolean,
  roles?: string[]
}

export interface FireBaseAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface Post {
  id?: string,
  title: string,
  text: string,
  author: string,
  date: Date
}

export interface BreadCrumb {
  link: string[],
  title: string
}

export interface ProductFilter {
  id: number,
  title: string
}

export interface ProductMarker {
  id: number,
  title: string
}

export interface ProductBrands {
  id: number,
  title: string
}

export interface ProductCategories {
  id: number,
  title: string
}

export interface AppNotification {
  message: HttpErrorResponse | any,
  date: any,
  status?: string
}

