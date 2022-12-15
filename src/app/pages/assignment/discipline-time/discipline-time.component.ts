import { Component, OnInit } from '@angular/core';
import { DisciplineTimeService, ReqDisciplineTime } from 'src/app/services/assignment/discipline-time.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-discipline-time',
  templateUrl: './discipline-time.component.html',
  styleUrls: ['./discipline-time.component.scss']
})
export class DisciplineTimeComponent implements OnInit {

  public titles: string[] = this.service.titles
  public disciplines: ReqDisciplineTime[] = []

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: DisciplineTimeService,
    private notification: NotificationsService,
  ) {
    this.loadReqDisciplineTimes()
  }

  changeHours(event: Event, semester: number | string, discipline: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.updHours( +hours, +semester, +discipline )
  }

  updHours(hours: number, semesterId: number, disciplineId: number): void {
    this.disciplines = this.disciplines.map(discipline => {
      if (discipline.discipline.id === disciplineId) 
        if (discipline.semester.id === semesterId)
        discipline.hours = Number(hours)

      return discipline
    })
  }

  save() {
    const transformed = this.service.transformResponceData(this.disciplines)

    console.log(transformed)

    this.service.saveReqDisciplineTimes(transformed)
      .subscribe(responce => {
        this.notification.success('Успешное сохранение')
        
        this.loadReqDisciplineTimes()
      })
  }

  loadReqDisciplineTimes() {
    this.service.loadReqDisciplineTimes()
      .subscribe((responce: any) => {
        const { data } = responce
        // console.log(data)

        data.forEach((element: any) => {
          console.log({
            discipline: element.discipline.id,
            semester: element.semester.id,
            hours: element.hours,
          })
        });

        this.disciplines = data
      })
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Часы на каждую дисциплину'},
    ])
  }

}
