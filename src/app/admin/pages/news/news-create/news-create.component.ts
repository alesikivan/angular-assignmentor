import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsModel } from 'src/app/admin/models/news';
import { NewsService } from 'src/app/admin/services/news.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent implements OnInit {

  id: number = 0;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private newsService: NewsService,
    private notifications: NotificationsService,
    private breadcrumbsService: BreadcrumbsService
  ) {
    this.form = this.fb.group({
      id: [0, [Validators.required]],
      title: ['', [Validators.required]],
      content: ['', []],
      previewImg: ['', []],
      description: ['', []],
      date: [new Date, []]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.form.get('Id')?.setValue(params['id']);
        this.newsService.getByID(this.id)
          .subscribe((item: NewsModel) => {
            this.form.setValue(item)
          })
      }

      if (this.id == 0 || this.id == null) {
        // Create news
        this.breadcrumbsService.change([
          {link: ['/admin', 'dashboard'], title: 'Главная'},
          {link: ['/admin', 'dashboard'], title: 'Панель'},
          {link: ['/admin', 'news', 'index'], title: 'Список новостей'},
          {link: ['/admin', 'news', 'create',], title: 'Создать новость'},
        ])
      } else {
        // Update news
        this.breadcrumbsService.change([
          {link: ['/admin', 'dashboard'], title: 'Главная'},
          {link: ['/admin', 'dashboard'], title: 'Панель'},
          {link: ['/admin', 'news', 'index'], title: 'Все новости'},
          {link: ['/admin', 'news', 'create',], title: 'Обновить новость'},
        ])
      }
    })
  }

  save() {
    if (this.form.invalid) // true if any form validation fail
      return

      if (this.form.get('id')?.value === 0) {
        this.newsService.add(this.form.value)
          .subscribe((list: NewsModel[]) => {
            this.notifications.success('Объект успешно создан!')
          })
      } else {
        this.newsService.update(this.form.value)
          .subscribe((list: NewsModel[]) => {
            this.notifications.success('Объект успешно обновлен!')
          })
      }

    // Redirecting to object index news after save or update
    this.router.navigate(['/admin', 'news', 'index']);
  }

}
