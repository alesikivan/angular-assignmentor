import { Component, OnInit } from '@angular/core';
import { ReqTeacherRate, TeacherRateService } from 'src/app/services/assignment/teacher-rate.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-teacher-rate',
  templateUrl: './teacher-rate.component.html',
  styleUrls: ['./teacher-rate.component.scss']
})
export class TeacherRateComponent implements OnInit {

  public titles: string[] = this.service.titles
  public rates: ReqTeacherRate[] = []

  public page = 1
  public totalPages = 0
  public rows = 20
  public teacherFilter = ''
  public disciplineFilter = ''

  public typingDelay = 500
  public typingTimer: any = undefined

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TeacherRateService,
    private notification: NotificationsService
  ) {
    this.loadTeacherRates()
  }

  changeWeight(event: Event, teacher: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.updRate( +hours, +teacher )
  }

  updRate(hours: number, teacher: number): void {
    this.rates = this.rates.map(rate => {
      if (rate.teacher.id === teacher) 
          rate.hours = Number(hours)

      return rate
    })
  }

  save() {
    const transformed = this.service.transformResponceData(this.rates)
    
    this.service.saveTeacherRates(transformed)
      .subscribe(responce => {
        this.notification.success('Успешное сохранение')
        
        this.loadTeacherRates()
      })
  }

  loadTeacherRates() {
    this.service.loadTeacherRates(this.page, this.teacherFilter)
      .subscribe((responce: any) => {
        const { data, totalPages } = responce

        this.totalPages = totalPages * this.rows

        this.rates = data
      })
  }

  onPage(event: any) {
    const { page } = event
    this.page = page + 1
    this.loadTeacherRates()
  }

  filter(column: string, event: any) {
    const { value } = event.target

    switch (column) {
      case 'teacher':
        this.teacherFilter = value
        break
      
      default: break
    }

    clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(this.loadTeacherRates.bind(this), this.typingDelay)
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Cтавка преподавателей'},
    ])
  }

}
