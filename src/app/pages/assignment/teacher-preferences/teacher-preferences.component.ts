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

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TeacherPreferencesService,
    private notifications: NotificationsService
  ) {
    this.loadTeacherPreferences()
  }

  changeWeight(event: Event, teacher: number | string, discipline: number | string): void {
    const weight = (event.target as HTMLFormElement).value

    this.updWeigth( +weight, +teacher, +discipline )
  }

  updWeigth(weight: number, teacher: number, discipline: number): void {
    this.preferences = this.preferences.map(preference => {
      if (preference.discipline.id === discipline) 
        if (preference.teacher.id === teacher)
          preference.importance_coefficient = Number(weight)

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
    this.service.loadTeacherPreferences()
      .subscribe((responce: any) => {
        const { data = [] } = responce
        
        this.preferences = data
      })
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Предпочтения преподавателей'},
    ])
  }

}
