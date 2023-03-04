import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { User } from "../interfaces";
import { catchError, tap } from 'rxjs/operators'
import { NotificationsService } from "./notifications.service";
import { requests } from "../requests";
import { TUntilDestroyed, UntilDestroyed } from "../decorators/until-destroyed";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @UntilDestroyed() private _UntilDestroyed: TUntilDestroyed;

  public isAuth$: Subject<boolean> = new Subject<boolean>()

  public userSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  public user: Observable<User | null> = this.userSubject$.asObservable()

  public test$: Subject<string> = new Subject<string>()

  constructor(
    private http: HttpClient,
    private notifications: NotificationsService
  ) {
    // User init
    let token = this.token
    if (token) this.userInit(token)
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('token-exp') || '')
    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('token')
  }

  login (user: any): Observable<any> {
    return this.http.post(requests.login, user)
      .pipe(
        tap(this.setToken),
        tap(this.setUser.bind(this)),
        tap(this.setMode.bind(this)),
        catchError(this.handleError.bind(this)),
        this._UntilDestroyed()
      )
  }

  // register(user: User) {
  //   return this.http.post(requests.register, user)
  //     .pipe(
  //       catchError(this.handleError.bind(this)),
  //       this._UntilDestroyed()
  //     )
  // }

  userInit(token: string) {
    this.setUser(
      { data: { access_toke: token } }
    )
  }

  setAuthMode(mode: boolean) {
    this.isAuth$.next(mode)
  }

  setUser(res: any): void {
    const { 
      data, 
      data: { 
        access_token: token = '',
      }
    } = res

    if (token) {
      const roles = res?.data?.rbac?.roles

      const user = roles ? Object.assign(data, { roles }) : data

      // console.log(user)
      this.userSubject$.next(user)
    }
  }

  setMode(res: any): void {
    const { data: { access_token: token = '' } } = res

    this.setAuthMode(!!token)    
  }

  logout() {
    const data = { 
      data: { 
        token: null
      } 
    }

    this.setToken(data)
    
    this.setAuthMode(false)
    this.notifications.success('Log out successfuly!')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  hasRoles(roles: string[]): boolean {
    roles = roles.map((role: string) => role.toUpperCase())

    let flag = false
    this.user.subscribe((user: any) => {
      if (user && user.roles) {
        user.roles.forEach((role: string) => {
          if (roles.includes(role.toUpperCase())) flag = true
        })
      }
    })

    return flag
  }

  private handleError(error: any) {
    console.log(error)
    return throwError(error)
  }

  setToken(res: any): void {
    const { data: { 
      access_token: token = ''
     } } = res

    if (token) {
      const expDate = new Date(new Date().getTime() + Number(10000) * 1000 * 24)

      localStorage.setItem('token', token)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
