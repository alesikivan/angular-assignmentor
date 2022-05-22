import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { DepartmentModel } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<DepartmentModel[]>(requests.getDepartments).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<DepartmentModel>(`${requests.getDepartment}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: DepartmentModel) {
    return this.http.post<DepartmentModel[]>(`${requests.addDepartment}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: DepartmentModel) {
    return this.http.post<DepartmentModel[]>(`${requests.updateDepartment}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteDepartment}/${id}`).pipe(this._untilDestroyed())
  }
}
