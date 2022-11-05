import { Component, OnInit } from '@angular/core';
import { ReqTeacherRate, TeacherRateService } from 'src/app/services/assignment/teacher-rate.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-teacher-rate',
  templateUrl: './teacher-rate.component.html',
  styleUrls: ['./teacher-rate.component.scss']
})
export class TeacherRateComponent implements OnInit {

  public titles: string[] = this.service.titles
  public rates: ReqTeacherRate[] = this.service.rates

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TeacherRateService
  ) {}

  changeWeight(event: Event, teacher: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.service.updRate( +hours, +teacher )
  }

  save() {
    this.service.save()
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Cтавка преподавателей'},
    ])
  }

}
