import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/admin/services/user.service";
import { AuthService } from "./auth.service";
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root'
})

export class RolesGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private notifications: NotificationsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.auth.isAuthenticated()) {
        const permission =  this.auth.hasRoles(route.data.roles)

        if (!permission) {
          this.router.navigate(['/'])
          this.notifications.danger('У вас нет доступа для данного действия!')
        }

        return permission
      }

      this.notifications.danger('Для начала нужно аторизоваться!')

      return false
  }
}
