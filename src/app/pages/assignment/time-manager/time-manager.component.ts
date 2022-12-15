import { Component, OnInit } from '@angular/core';
import { ReqTeacherDiscipline, TimeManagerService } from 'src/app/services/assignment/time-manager.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.component.html',
  styleUrls: ['./time-manager.component.scss']
})
export class TimeManagerComponent implements OnInit {

  public titles: string[] = this.service.titles
  public disciplines: ReqTeacherDiscipline[] = []

  public loader = false

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private service: TimeManagerService,
    private notifications: NotificationsService,
  ) {
    this.loadTeacherDisciplines()
  }

  changeHours(event: Event, teacher: number | string, discipline: number | string, semester: number | string): void {
    const hours = (event.target as HTMLFormElement).value

    this.updHours( +hours, +teacher, +discipline, +semester )
  }

  updHours(hours: number, teacherId: number, disciplineId: number, semesterId: number): void {
    this.disciplines = this.disciplines.map(discipline => {
      
      if (discipline.discipline.id === disciplineId) 
        if (discipline.semester.id === semesterId)
          if (discipline.teacher.id === teacherId)
            discipline.hours = Number(hours)

      return discipline
    })
  }

  save() {
    const transformed = this.service.transformResponceData(this.disciplines)

    this.service.saveTeacherDisciplines(transformed)
      .subscribe(responce => {
        this.notifications.success('Успешное сохранение')
        
        this.loadTeacherDisciplines()
      })
  }

  loadTeacherDisciplines() {
    this.service.loadTeacherDisciplines()
      .subscribe((responce: any) => {
        const { data } = responce

        this.disciplines = data
      })
  }

  genetate() {
    if (confirm('В процессе генерации старые данные будут удалены, вы уверены?')) {
      this.notifications.default('Отправили. Проверяем')
      this.loader = true

      this.service.generate()
        .subscribe((responce: any) => { 
          const { data } = responce

          this.disciplines = data
          
          this.notifications.success('Сгенерированно')
        }, 
        () => this.loader = false,
        () => this.loader = false)
    }
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/assignment', 'index'], title: 'Распределение часов'},
      {link: ['#'], title: 'Авто-расстановка времени'},
    ])
  }

}
