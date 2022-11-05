import { Component, OnInit } from '@angular/core';
import { ReqTeacherPreference, TeacherPreferencesService } from 'src/app/services/assignment/teacher-preferences.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

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
    private service: TeacherPreferencesService
  ) {}

  changeWeight(event: Event, teacher: number | string, discipline: number | string): void {
    const weight = (event.target as HTMLFormElement).value

    this.service.updWeigth( +weight, +teacher, +discipline )
  }

  save() {
    this.service.save()
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Предпочтения преподавателей'},
    ])
  }

}
