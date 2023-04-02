import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherRate {
  teacher: {
    id: number | string,
    full_name: string,
  },
  hours: number
}

export interface ResTeacherRate {
  teacherId: number,
  hours: number
}

@Injectable({
  providedIn: 'root'
})
export class TeacherRateService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  public rates: ReqTeacherRate[] = []

  public titles: string[] = ['Преподаватель', 'Часы']

  constructor(
    private http: HttpClient
  ) {}

  transformResponceData(rates: ReqTeacherRate[]): ResTeacherRate[] {
    return rates.map(rate => ({
      teacherId: +rate.teacher.id,
      hours: +rate.hours
    }))
  }

  loadTeacherRates(page: number, teacherFilter: string) {
    const params = new HttpParams()
      .set('page', page)
      .set('teacherName', teacherFilter.trim())

    return this.http
      .get<ReqTeacherRate[]>(`${requests.loadTeacherRates}`, { params })
      .pipe(this._untilDestroyed())
  }

  saveTeacherRates(data: ResTeacherRate[]) {
    return this.http
      .post<ReqTeacherRate[]>(`${requests.saveTeacherRates}`, data)
      .pipe(this._untilDestroyed())
  }
}
