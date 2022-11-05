import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

export interface ReqTeacherRate {
  teacher: {
    id: number | string,
    name: string,
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

  public rates: ReqTeacherRate[] = [
    {
      "teacher": {"id": 1, "name": "some"},
      "hours": 730.5,
    },	
    {
      "teacher": {"id": 2, "name": "some"},
      "hours": 1000.0,
    }
  ]

  public titles: string[] = ['Преподаватель', 'Часы']

  constructor(
    private http: HttpClient
  ) {}

  updRate(hours: number, teacher: number): void {
    this.rates = this.rates.map(rate => {
      if (rate.teacher.id === teacher) 
          rate.hours = Number(hours)

      return rate
    })
  }

  save() {
    const transformed = this.transformResponceData(this.rates)
    console.log(transformed)
  }

  transformResponceData(rates: ReqTeacherRate[]): ResTeacherRate[] {
    return rates.map(rate => ({
      teacherId: +rate.teacher.id,
      hours: +rate.hours
    }))
  }

  loadTeacherRates() {
    return this.http
      .get<ReqTeacherRate[]>(`${requests.loadTeacherRates}`, {})
      .pipe(this._untilDestroyed())
  }

  saveTeacherRates(data: ResTeacherRate[]) {
    return this.http
      .post<ReqTeacherRate[]>(`${requests.saveTeacherRates}`, data)
      .pipe(this._untilDestroyed())
  }
}
