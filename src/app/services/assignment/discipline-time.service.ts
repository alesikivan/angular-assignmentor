import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqDisciplineTime {
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

export interface ResDisciplineTime {
  disciplineId: number,
  semesterId: number,
  hours: number
}

@Injectable({
  providedIn: 'root'
})
export class DisciplineTimeService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  public disciplines: ReqDisciplineTime[] = [
    {
      "discipline": {"id": 1, "name": "some"},
      "semester": {"id": 1, "name": "1 курс, 2-ой семетр"},
      "hours": 730.5,
    },		
    {
      "discipline": {"id": 1, "name": "some"},
      "semester": {"id": 2, "name": "2 курс, 1-ый семетр"},
      "hours": 730.5,
    },	
  ]

  public titles: string[] = [
    'Семестр', 'Дисциплина', 'Часы'
  ]

  constructor(
    private http: HttpClient
  ) {}

  updHours(hours: number, semesterId: number, disciplineId: number): void {
    this.disciplines = this.disciplines.map(discipline => {
      if (discipline.discipline.id === disciplineId) 
        if (discipline.semester.id === semesterId)
        discipline.hours = Number(hours)

      return discipline
    })
  }

  save() {
    const transformed = this.transformResponceData(this.disciplines)
    console.log(transformed)
  }

  transformResponceData(disciplines: ReqDisciplineTime[]): ResDisciplineTime[] {
    return disciplines.map(discipline => ({
      disciplineId: +discipline.discipline.id,
      semesterId: +discipline.discipline.id,
      hours: +discipline.hours
    }))
  }

  loadReqDisciplineTimes() {
    return this.http
      .get<ReqDisciplineTime[]>(`${requests.loadDisciplineTimes}`, {})
      .pipe(this._untilDestroyed())
  }

  saveReqDisciplineTimes(data: ResDisciplineTime[]) {
    return this.http
      .post<ReqDisciplineTime[]>(`${requests.saveDisciplineTimes}`, data)
      .pipe(this._untilDestroyed())
  }
}
