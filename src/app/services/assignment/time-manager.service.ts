import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherDiscipline {
  teacher: {
    id: number | string,
    name: string,
  },
  discipline: {
    id: number | string,
    name: string,
  },
  semester: {
    id: number | string,
    name: string,
  },
  hours: number
}

export interface ResTeacherDiscipline {
  teacherId: number,
  disciplineId: number,
  semesterId: number,
  hours: number
}

@Injectable({
  providedIn: 'root'
})
export class TimeManagerService {
  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  public disciplines: ReqTeacherDiscipline[] = [
    {
      "teacher": {"id": 1, "name": "some"},
      "discipline": {"id": 1, "name": "some"},
      "semester": {"id": 1, "name": "1 курс, 2-ой семетр"},
      "hours": 730.5,
    },		
    {
      "teacher": {"id": 1, "name": "some"},
      "discipline": {"id": 2, "name": "some"},
      "semester": {"id": 1, "name": "2 курс, 1-ый семетр"},
      "hours": 0,
    },	
  ]

  public titles: string[] = [
    'Преподаватель', 'Дисциплина', 'Семестр', 'Часы'
  ]

  constructor(
    private http: HttpClient
  ) {}

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
    const transformed = this.transformResponceData(this.disciplines)
    console.log(transformed)
  }

  transformResponceData(disciplines: ReqTeacherDiscipline[]): ResTeacherDiscipline[] {
    return disciplines.map(discipline => ({
      teacherId: +discipline.teacher.id,
      disciplineId: +discipline.discipline.id,
      semesterId: +discipline.discipline.id,
      hours: +discipline.hours
    }))
  }

  loadTeacherDisciplines() {
    return this.http
      .get<ReqTeacherDiscipline[]>(`${requests.loadTeacherDisciplines}`, {})
      .pipe(this._untilDestroyed())
  }

  saveTeacherDisciplines(data: ResTeacherDiscipline[]) {
    return this.http
      .post<ReqTeacherDiscipline[]>(`${requests.saveTeacherDisciplines}`, data)
      .pipe(this._untilDestroyed())
  }
}
