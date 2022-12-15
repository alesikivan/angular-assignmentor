import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherDiscipline {
  teacher: {
    id: number | string,
    full_name: string,
  },
  discipline: {
    id: number | string,
    name: string,
  },
  semester: {
    id: number | string,
    name: string,
  },
  hours: number,
  maxHours: number
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

  public disciplines: ReqTeacherDiscipline[] = []

  public titles: string[] = [
    'Преподаватель', 'Дисциплина', 'Семестр', 'Часы', 'Макс. часов'
  ]

  constructor(
    private http: HttpClient
  ) {}

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
      .patch<ReqTeacherDiscipline[]>(`${requests.saveTeacherDisciplines}`, data)
      .pipe(this._untilDestroyed())
  }

  generate() {
    return this.http
      .put(`${requests.genetate}`, {})
      .pipe(this._untilDestroyed())
  }
}
