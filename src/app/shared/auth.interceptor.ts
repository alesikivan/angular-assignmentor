import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { TUntilDestroyed, UntilDestroyed } from "./decorators/until-destroyed";
import { AuthService } from "./services/auth.service";
import { NotificationsService } from "./services/notifications.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  @UntilDestroyed() private _UntilDestroyed: TUntilDestroyed;

  constructor (
    private auth: AuthService,
    private router: Router,
    private notifications: NotificationsService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>{
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.append(
          'Authorization', `Bearer ${this.auth.token}`
        )
      })
    }

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          if (Array.isArray(error?.error)) {
            error?.error.forEach((e: any) => {
              this.notifications.danger(e.message)
            })
          } else {
            this.notifications.danger(error?.message)
          }

          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFaild: true
              }
            })
          }

          return throwError(error)
        }),
        this._UntilDestroyed()
      )
  }
}
