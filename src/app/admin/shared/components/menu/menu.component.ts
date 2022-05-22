import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: MenuItem[]

  warningLinks: string[] = [
    '/admin/login',
    '/admin/register'
  ]

  hideMode = false

  constructor(
    private router: Router,
    private breadcrumbs: BreadcrumbsService,
  ) {
    this.warningLinks.forEach(link => {
      if (link === this.router.url) {
        this.hideMode = true
      }
    })

    this.menu = [
      {
        label: "Преподаватели",
        routerLink: ['/admin', 'teachers', 'index'],
       
      },
      {
        label: "Ученые степени",
        routerLink: ['/admin', 'academic-degries', 'index'],
      },
      {
        label: "Ученые  звания",
        routerLink: ['/admin', 'academic-titles', 'index'],
      },
      {
        label: "Кафедры",
        routerLink: ['/admin', 'departments', 'index'],
      },
      {
        label: "Пользователи",
        routerLink: ['/admin', 'user', 'index'],
      },
      {
        label: "Новости",
        routerLink: ['/admin', 'news', 'index'],
        // items: [
        //   {
        //     routerLink: ['/admin', 'news', 'index'],
        //     label: "Все новости"
        //   },
        //   {
        //     routerLink: ['/admin', 'news', 'create'],
        //     label: "Создать новость"
        //   },
        // ],
      },
    ]
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/admin', 'register'], title: 'Регистрация'},
    ])
  }

}
