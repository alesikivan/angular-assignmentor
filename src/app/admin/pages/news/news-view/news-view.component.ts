import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'src/app/admin/models/news';
import { NewsService } from 'src/app/admin/services/news.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  item: NewsModel

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private breadcrumbsService: BreadcrumbsService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newsService.getByID(params['id'])
      .subscribe((item: NewsModel) => {
        this.item = item

        this.breadcrumbsService.change([
          {link: ['/admin', 'dashboard'], title: 'Главная'},
          {link: ['/admin', 'dashboard'], title: 'Панель'},
          {link: ['/admin', 'page', 'index'], title: 'Список новостей'},
          {link: ['/admin', 'page', 'view', String(item.id)], title: item.title},
        ])
      })
    })
  }

}
