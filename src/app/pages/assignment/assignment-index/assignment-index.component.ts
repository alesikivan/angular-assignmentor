import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

interface AssignmentMenuList {
  title: string;
  link: string[];
}

@Component({
  selector: 'app-assignment-index',
  templateUrl: './assignment-index.component.html',
  styleUrls: ['./assignment-index.component.scss']
})

export class AssignmentIndexComponent implements OnInit {

  public links: AssignmentMenuList[] = [
    { title: 'Предпочтения преподавателей', link: ['/assignment', 'teacher', 'preferences'] },
    { title: 'Ставка (часы) преподавателей', link: ['/assignment', 'teacher', 'rate'] },
    { title: 'Часы на каждую дисциплину в каждом семестре', link: ['/assignment', 'discipline', 'time'] },
    { title: 'Авто-расстановка с возможностью корректировки времени преподавателей по дисциплинам', link: ['/assignment', 'time', 'manager'] }
  ]

  constructor(
    private breadcrumbs: BreadcrumbsService
  ) {}

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['#'], title: 'Распределение часов'},
    ])
  }

}
