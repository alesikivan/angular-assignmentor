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

  public page = 1
  public totalPages = 0
  public rows = 20
  public disciplineFilter = ''

  public typingDelay = 500
  public typingTimer: any = undefined

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
    this.service.loadReqDisciplineTimes(this.page, this.disciplineFilter)
      .subscribe((responce: any) => {
        const { data, totalPages } = responce

        this.totalPages = totalPages * this.rows
        
        this.disciplines = data
      })
  }

  onPage(event: any) {
    const { page } = event
    this.page = page + 1
    this.loadReqDisciplineTimes()
  }

  filter(column: string, event: any) {
    const { value } = event.target

    switch (column) {
      case 'discipline':
        this.disciplineFilter = value
        break
      
      default: break
    }

    clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(this.loadReqDisciplineTimes.bind(this), this.typingDelay)
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Часы на каждую дисциплину'},
    ])
  }

}
