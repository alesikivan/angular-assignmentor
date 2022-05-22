import { Component, OnInit } from '@angular/core';
import { TeacherModel } from 'src/app/admin/models/teacher';
import { TeachersService } from 'src/app/admin/services/teachers.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-teachers-index',
  templateUrl: './teachers-index.component.html',
  styleUrls: ['./teachers-index.component.scss']
})
export class TeachersIndexComponent implements OnInit {

  public preloader = true

  public list: TeacherModel[] = []
  public first = 0
  public rows = 10

  constructor(
    private teacherService: TeachersService,
    private notifications: NotificationsService,
    private breadcrumbs: BreadcrumbsService
  ) {
    this.breadcrumbs.change([
      {link: ['/admin', 'dashboard'], title: 'Главная'},
      {link: ['/admin', 'dashboard'], title: 'Панель'},
      {link: ['/admin', 'teacher', 'index'], title: 'Все преподаватели'},
    ])
  }

  ngOnInit(): void {
    // Get Teachers from TeacherService
    this.teacherService.getAll()
      .subscribe(
        (data: TeacherModel[]) => {this.list = data},
        () => this.notifications.danger('Ошибка при загрузке данных'),
        () => this.preloader = false
      )
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
      this.teacherService.remove(id)
        .subscribe(() => {this.notifications.success('Объект успешно удален!')})

      this.teacherService.getAll()
        .subscribe((data: TeacherModel[]) => {
          this.list = data
        })
    }
  }

  getDate(date: any) {
    return new Date(date).toLocaleString()
  }

}
