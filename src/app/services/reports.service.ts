import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  test(data: any) {
    return this.http.get(`${requests.test}`).pipe(this._untilDestroyed())
  }

  dataHepler(data: any) {
    return this.http.get(`${requests.reportsHelperData}`).pipe(this._untilDestroyed())
  }
  
  // create(data: any) {
  //   return this.http.post(`${requests.createReport}`, data).pipe(this._untilDestroyed())
  // }

  createReport(path: any, data: any) {
    return this.http.post(path, data).pipe(this._untilDestroyed())
  }

  createDoc(path: any, data: any) {
    return this.http.post(path, data).pipe(this._untilDestroyed())
  }
}
