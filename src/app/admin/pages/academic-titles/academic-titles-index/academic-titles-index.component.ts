import { Component, OnInit } from '@angular/core';
import { AcademicTitleModel } from 'src/app/admin/models/academic-title';
import { AcademicTitleService } from 'src/app/admin/services/academic-title.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-academic-titles-index',
  templateUrl: './academic-titles-index.component.html',
  styleUrls: ['./academic-titles-index.component.scss']
})
export class AcademicTitlesIndexComponent implements OnInit {

  public preloader = true

  public list: AcademicTitleModel[] = []
  public first = 0
  public rows = 10

  constructor(
    private academicTitleService: AcademicTitleService,
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
    this.academicTitleService.getAll()
      .subscribe(
        (data: AcademicTitleModel[]) => {this.list = data},
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
      this.academicTitleService.remove(id)
        .subscribe(() => {
          this.notifications.success('Объект успешно удален!')

          // Update list of data
          this.academicTitleService.getAll()
            .subscribe((data: AcademicTitleModel[]) => {
              this.preloader = false
              this.list = data
            })
        })
    }
  }

}

