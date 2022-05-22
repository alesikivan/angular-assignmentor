import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<UserModel[]>(requests.getUsers).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<UserModel>(`${requests.getUser}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: UserModel) {
    item.id = new Date().getTime()
    return this.http.post<UserModel[]>(`${requests.addUser}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: UserModel) {
    return this.http.post<UserModel[]>(`${requests.updateUser}/${item.id}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteUser}/${id}`).pipe(this._untilDestroyed())
  }
}
