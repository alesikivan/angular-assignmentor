import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  test(data: any) {
    return this.http.get(`${requests.test}`).pipe(this._untilDestroyed())
  }

  getTeachers(data: any) {
    return this.http.get(`${requests.getTeachers}`).pipe(this._untilDestroyed())
  }
  
  getReportTypes(data: any) {
    return this.http.get(`${requests.getReportTypes}`).pipe(this._untilDestroyed())
  }
  
  // create(data: any) {
  //   return this.http.post(`${requests.createReport}`, data).pipe(this._untilDestroyed())
  // }

  createReport(path: any, data: any) {
    return this.http.post(path, data).pipe(this._untilDestroyed())
  }

  createDoc(path: any, data: any) {
    try {
      window.location.href = `${path}?document_header=${data.document_header}&teacher_id=${data.teacher_id}`
    } catch(e) {
      console.log(e)
    }
    return this.router.navigate(['/']);
  }
}
