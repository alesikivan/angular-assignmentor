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
    course_name: number
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

  public disciplines: ReqDisciplineTime[] = []

  public titles: string[] = [
    'Курс, Семестр', 'Дисциплина', 'Часы'
  ]

  constructor(
    private http: HttpClient
  ) {}

  save() {
    const transformed = this.transformResponceData(this.disciplines)
    console.log(transformed)
  }

  transformResponceData(disciplines: ReqDisciplineTime[]): ResDisciplineTime[] {
    return disciplines.map(discipline => ({
      disciplineId: +discipline.discipline.id,
      semesterId: +discipline.semester.id,
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
