import { Component, OnInit } from '@angular/core';
import { DisciplineTimeService, ReqDisciplineTime } from 'src/app/services/assignment/discipline-time.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-discipline-time',
  templateUrl: './discipline-time.component.html',
  styleUrls: ['./discipline-time.component.scss']
})
export class DisciplineTimeComponent implements OnInit {

  public titles: string[] = this.service.titles
  public disciplines: ReqDisciplineTime[] = this.service.disciplines

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: DisciplineTimeService
  ) {}

  changeHours(event: Event, semester: number | string, discipline: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.service.updHours( +hours, +semester, +discipline )
  }

  save() {
    this.service.save()
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Часы на каждую дисциплину'},
    ])
  }

}
