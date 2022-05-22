import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/admin/models/user';
import { UserService } from 'src/app/admin/services/user.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  list: UserModel[] = []
  first = 0
  rows = 10

  constructor(
    private userService: UserService,
    private notifications: NotificationsService,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.breadcrumbsService.change([
      {link: ['/admin', 'dashboard'], title: 'Главная'},
      {link: ['/admin', 'dashboard'], title: 'Панель'},
      {link: ['/admin', 'user', 'index'], title: 'Все пользователи'},
    ])
  }

  ngOnInit(): void {
    // Get Users from UserService
    this.userService.getAll()
      .subscribe((data: UserModel[]) => {
        this.list = data
      })
  }

  next() {
    this.first = this.first + this.rows
  }
  prev() {
    this.first = this.first - this.rows
  }
  reset() {
    this.first = 0
  }

  isLastPage(): boolean {
    return this.list ? this.first === (this.list.length - this.rows) : true
  }

  isFirstPage(): boolean {
    return this.list ? this.first === 0 : true
  }

  remove(id: number) {
    if (window.confirm('Вы уверены что хотите удалить?')) {
      this.userService.remove(id)
        .subscribe(() => {this.notifications.success('Объект успешно удален!')})

      this.userService.getAll()
        .subscribe((data: UserModel[]) => {
          this.list = data
        })
    }
  }

}
