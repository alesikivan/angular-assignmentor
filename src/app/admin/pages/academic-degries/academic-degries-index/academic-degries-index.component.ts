import { Component, OnInit } from '@angular/core';
import { AcademicDegreeModel } from 'src/app/admin/models/academic-degree';
import { AcademicDegreeService } from 'src/app/admin/services/academic-degree.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-academic-degries-index',
  templateUrl: './academic-degries-index.component.html',
  styleUrls: ['./academic-degries-index.component.scss']
})
export class AcademicDegriesIndexComponent implements OnInit {

  public preloader = true

  public list: AcademicDegreeModel[] = []
  public first = 0
  public rows = 10

  constructor(
    private academicDegreeService: AcademicDegreeService,
    private notifications: NotificationsService,
    private breadcrumbs: BreadcrumbsService
  ) {
    this.breadcrumbs.change([
      {link: ['/admin', 'dashboard'], title: 'Главная'},
      {link: ['/admin', 'dashboard'], title: 'Панель'},
      {link: ['/admin', 'teacher', 'index'], title: 'Все учетные степени'},
    ])
  }

  ngOnInit(): void {
    this.academicDegreeService.getAll()
      .subscribe(
        (data: AcademicDegreeModel[]) => {this.list = data},
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
      this.academicDegreeService.remove(id)
        .subscribe(() => {
          this.notifications.success('Объект успешно удален!')

          // Update list of data
          this.academicDegreeService.getAll()
            .subscribe((data: AcademicDegreeModel[]) => {
              this.preloader = false
              this.list = data
            })
        })
    }
  }

}
