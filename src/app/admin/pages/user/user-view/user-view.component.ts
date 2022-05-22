import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserModel } from 'src/app/admin/models/user';
import { UserService } from 'src/app/admin/services/user.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  item: UserModel

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private breadcrumbsService: BreadcrumbsService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userService.getByID(params['id'])
        .subscribe((item: UserModel) => {
          this.item = item

          this.breadcrumbsService.change([
            {link: ['/admin', 'dashboard'], title: 'Главная'},
            {link: ['/admin', 'dashboard'], title: 'Панель'},
            {link: ['/admin', 'user', 'index'], title: 'Список пользователей'},
            {link: ['/admin', 'user', 'view', String(item.id)], title: item.name},
          ])
        })
    })
  }

}
