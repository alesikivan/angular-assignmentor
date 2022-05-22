import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/admin/models/department';
import { DepartmentService } from 'src/app/admin/services/department.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-departments-index',
  templateUrl: './departments-index.component.html',
  styleUrls: ['./departments-index.component.scss']
})
export class DepartmentsIndexComponent implements OnInit {

  public preloader = true

  public list: DepartmentModel[] = []
  public first = 0
  public rows = 10

  constructor(
    private departmentService: DepartmentService,
    private notifications: NotificationsService,
    private breadcrumbs: BreadcrumbsService
  ) {
    this.breadcrumbs.change([
      {link: ['/admin', 'dashboard'], title: 'Главная'},
      {link: ['/admin', 'dashboard'], title: 'Панель'},
      {link: ['/admin', 'teacher', 'index'], title: 'Все кафедры'},
    ])
  }

  ngOnInit(): void {
    this.departmentService.getAll()
      .subscribe(
        (data: DepartmentModel[]) => {this.list = data},
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
      this.preloader = true
      this.departmentService.remove(id)
        .subscribe(() => {
          this.notifications.success('Объект успешно удален!')

          // Update list of data
          this.departmentService.getAll()
            .subscribe((data: DepartmentModel[]) => {
              this.preloader = false
              this.list = data
            })
        })
    }
  }

}

