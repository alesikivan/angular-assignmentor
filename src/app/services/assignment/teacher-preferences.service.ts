import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherPreference {
  teacher: {
    id: number | string,
    full_name: string,
  },
  discipline: {
    id: number | string,
    name: string,
  },
  importance_coefficient: number,
  semester: {
    id: number | string,
    name: string,
  },
}

export interface ResTeacherPreference {
  teacherId: number,
  disciplineId: number,
  importanceCoefficient: number,
  semesterId: number
}

@Injectable({
  providedIn: 'root'
})

export class TeacherPreferencesService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  public preferences: ReqTeacherPreference[] = []

  public titles: string[] = [
    'Преподаватель', 'Дисциплина', 'Семестр', 'Вес'
  ]

  constructor(
    private http: HttpClient
  ) {}

  transformResponceData(preferences: ReqTeacherPreference[]): any[] {
    return preferences.map(preference => ({
      teacherId: +preference.teacher.id,
      disciplineId: +preference.discipline.id,
      importanceCoefficient: +preference.importance_coefficient,
      semesterId: +preference.semester.id,
    }))
  }

  loadTeacherPreferences() {
    return this.http
      .get<ReqTeacherPreference[]>(`${requests.loadTeacherPreferences}`, {})
      .pipe(this._untilDestroyed())
  }

  saveTeacherPreferences(data: ResTeacherPreference[]) {
    return this.http
      .patch<ReqTeacherPreference[]>(`${requests.saveTeacherPreferences}`, data)
      .pipe(this._untilDestroyed())
  }
}
