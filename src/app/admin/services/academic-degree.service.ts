import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { AcademicDegreeModel } from '../models/academic-degree';

@Injectable({
  providedIn: 'root'
})
export class AcademicDegreeService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<AcademicDegreeModel[]>(requests.getAcademicDegries).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<AcademicDegreeModel>(`${requests.getAcademicDegree}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: AcademicDegreeModel) {
    return this.http.post<AcademicDegreeModel[]>(`${requests.addAcademicDegree}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: AcademicDegreeModel) {
    return this.http.post<AcademicDegreeModel[]>(`${requests.updateAcademicDegree}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteAcademicDegree}/${id}`).pipe(this._untilDestroyed())
  }
}
