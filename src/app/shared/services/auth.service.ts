import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { FireBaseAuthResponse, User } from "../interfaces";
import { catchError, tap } from 'rxjs/operators'
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  user: any

  public isAuth: Subject<boolean> = new Subject<boolean>()

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) {
    this.setUser({idToken: localStorage.getItem('token') })
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('token-exp') || '')
    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('token')
  }

  login (user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        tap(this.setUser),
        tap(this.setMode),
        catchError(this.handleError.bind(this))
      )
  }

  register(user: User) {
    return this.http.post(`http://localhost:3333/api/custom/register`, user)
      .pipe(
        catchError(this.handleError.bind(this))
      )
  }

  setAuthMode(mode: boolean) {
    this.isAuth.next(mode)
  }

  setUser(res: any) {
    if (res.idToken) {
      let user = JSON.parse(atob(res.idToken.split('.')[1]))

      this.user = Object.assign(user, {
        roles: ['user', 'admin']
      })
    }
  }

  setMode(res: any) {
    this.setAuthMode(!!res.idToken)    
  }

  logout() {
    this.setToken(null)
    this.setAuthMode(false)
    this.notifications.success('Успешный выход из системы')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  hasRoles(roles: string[]): boolean {
    if (this.user) {
      roles = roles.map(role => role.toUpperCase())
      let userRoles = this.user.roles.map((role: any) => role.toUpperCase())

      return userRoles.includes(...roles)
    }

    return false
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error

    this.notifications.danger(message)

    this.error$.next(message)

    return throwError(error)
  }

  private setToken(res: FireBaseAuthResponse | any) {
    if (res) {
      const expDate = new Date(new Date().getTime() + Number(res.expiresIn) * 1000)
      localStorage.setItem('token', res.idToken)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
