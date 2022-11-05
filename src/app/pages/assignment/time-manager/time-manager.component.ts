import { Component, OnInit } from '@angular/core';
import { ReqTeacherDiscipline, TimeManagerService } from 'src/app/services/assignment/time-manager.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.scss']
})
export class TimeManagerComponent implements OnInit {

  public titles: string[] = this.service.titles
  public disciplines: ReqTeacherDiscipline[] = this.service.disciplines

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TimeManagerService
  ) {}

  changeHours(event: Event, teacher: number | string, discipline: number | string, semester: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.service.updHours( +hours, +teacher, +discipline, +semester )
  }

  save() {
    this.service.save()
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Авто-расстановка времени'},
    ])
  }

}
