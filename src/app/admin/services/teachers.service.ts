import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { TeacherModel } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<TeacherModel[]>(requests.getTeachers).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<TeacherModel>(`${requests.getTeacher}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: TeacherModel) {
    return this.http.post<TeacherModel[]>(`${requests.addTeacher}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: TeacherModel) {
    return this.http.post<TeacherModel[]>(`${requests.updateTeacher}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteTeacher}/${id}`).pipe(this._untilDestroyed())
  }

  dataHepler() {
    return this.http.get(`${requests.helperData}`).pipe(this._untilDestroyed())
  }
}
