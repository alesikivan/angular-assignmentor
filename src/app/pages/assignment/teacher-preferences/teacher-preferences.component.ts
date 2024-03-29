import { Component, OnInit } from '@angular/core';
import { ReqTeacherPreference, TeacherPreferencesService } from 'src/app/services/assignment/teacher-preferences.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-teacher-preferences',
  templateUrl: './teacher-preferences.component.html',
  styleUrls: ['./teacher-preferences.component.scss']
})
export class TeacherPreferencesComponent implements OnInit {

  public titles: string[] = this.service.titles
  public preferences: ReqTeacherPreference[] = this.service.preferences

  public page = 1
  public totalPages = 0
  public rows = 20
  public teacherFilter = ''
  public disciplineFilter = ''

  public typingDelay = 500
  public typingTimer: any = undefined

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TeacherPreferencesService,
    private notifications: NotificationsService
  ) {
    this.loadTeacherPreferences()
  }

  changeWeight(event: Event, teacher: number | string, discipline: number | string, semester: number | string): void {
    const weight = (event.target as HTMLFormElement).value

    this.updWeigth( +weight, +teacher, +discipline, +semester )
  }

  updWeigth(weight: number, teacher: number, discipline: number, semester: number): void {
    this.preferences = this.preferences.map(preference => {
      if (preference.discipline.id === discipline 
          && preference.teacher.id === teacher
          && preference.semester.id === semester) {
        preference.importance_coefficient = Number(weight)
      }

      return preference
    })
  }

  save() {
    const transformed = this.service.transformResponceData(this.preferences)
    
    this.service.saveTeacherPreferences(transformed)
      .subscribe(() => {
        this.loadTeacherPreferences()

        this.notifications.success('Успешно сохранено')        
      })
  }

  loadTeacherPreferences() {
    this.service.loadTeacherPreferences(this.page, this.teacherFilter, this.disciplineFilter)
      .subscribe((responce: any) => {
        const { data, totalPages } = responce

        this.totalPages = totalPages * this.rows
        
        this.preferences = data
      })
  }

  onPage(event: any) {
    const { page } = event
    this.page = page + 1
    this.loadTeacherPreferences()
  }

  filter(column: string, event: any) {
    const { value } = event.target

    switch (column) {
      case 'discipline':
        this.disciplineFilter = value
        break

      case 'teacher':
        this.teacherFilter = value
        break
      
      default: break
    }

    clearTimeout(this.typingTimer)
    this.typingTimer = setTimeout(this.loadTeacherPreferences.bind(this), this.typingDelay)
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Предпочтения преподавателей'},
    ])
  }

}
