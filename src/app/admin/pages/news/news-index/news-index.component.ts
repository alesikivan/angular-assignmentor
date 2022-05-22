import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/admin/models/news';
import { NewsService } from 'src/app/admin/services/news.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {

  list: NewsModel[] = []
  first = 0
  rows = 10

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private notifications: NotificationsService,
    private newsService: NewsService,
  ) {
    this.breadcrumbsService.change([
      {link: ['/admin', 'dashboard'], title: 'Главная'},
      {link: ['/admin', 'dashboard'], title: 'Панель'},
      {link: ['/admin', 'news', 'index'], title: 'Список новостей'}
    ])
  }

  ngOnInit(): void {
    this.newsService.getAll()
      .subscribe(data => {
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
      this.newsService.remove(id)
        .subscribe(() => {this.notifications.success('Объект успешно удален!')})

        this.newsService.getAll()
        .subscribe((data: NewsModel[]) => {
          this.list = data
        })
    }
  }

}
