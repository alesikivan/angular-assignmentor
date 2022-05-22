import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { AcademicTitleModel } from '../models/academic-title';

@Injectable({
  providedIn: 'root'
})
export class AcademicTitleService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<AcademicTitleModel[]>(requests.getAcademicTitles).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<AcademicTitleModel>(`${requests.getAcademicTitle}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: AcademicTitleModel) {
    return this.http.post<AcademicTitleModel[]>(`${requests.addAcademicTitle}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: AcademicTitleModel) {
    return this.http.post<AcademicTitleModel[]>(`${requests.updateAcademicTitle}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteAcademicTitle}/${id}`).pipe(this._untilDestroyed())
  }
}
