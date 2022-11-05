import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherPreference {
  teacher: {
    id: number | string,
    name: string,
  },
  discipline: {
    id: number | string,
    name: string,
  },
  weight: number
}

export interface ResTeacherPreference {
  teacherId: number,
  disciplineId: number,
  weight: number
}

@Injectable({
  providedIn: 'root'
})

export class TeacherPreferencesService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  public preferences: ReqTeacherPreference[] = [
    {
      "teacher": {"id": 1, "name": "some"},
      "discipline": {"id": 1, "name": "some"},
      "weight": 100,
    },	
    {
      "teacher": {"id": 2, "name": "some"},
      "discipline": {"id": 1, "name": "some"},
      "weight": 0,
    }
  ]

  public titles: string[] = [
    'Преподаватель', 'Дисциплина', 'Вес'
  ]

  constructor(
    private http: HttpClient
  ) {}

  updWeigth(weight: number, teacher: number, discipline: number): void {
    this.preferences = this.preferences.map(preference => {
      if (preference.discipline.id === discipline) 
        if (preference.teacher.id === teacher)
          preference.weight = Number(weight)

      return preference
    })
  }

  save() {
    const transformed = this.transformResponceData(this.preferences)
    console.log(transformed)
  }

  transformResponceData(preferences: ReqTeacherPreference[]): ResTeacherPreference[] {
    return preferences.map(preference => ({
      teacherId: +preference.teacher.id,
      disciplineId: +preference.discipline.id,
      weight: +preference.weight
    }))
  }

  loadTeacherPreferences() {
    return this.http
      .get<ReqTeacherPreference[]>(`${requests.loadTeacherPreferences}`, {})
      .pipe(this._untilDestroyed())
  }

  saveTeacherPreferences(data: ResTeacherPreference[]) {
    return this.http
      .post<ReqTeacherPreference[]>(`${requests.saveTeacherPreferences}`, data)
      .pipe(this._untilDestroyed())
  }
}
