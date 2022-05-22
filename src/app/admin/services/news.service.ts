import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { NewsModel } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get<NewsModel[]>(requests.getNews).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<NewsModel>(`${requests.getNew}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: NewsModel) {
    item.id = new Date().getTime()
    return this.http.post<NewsModel[]>(`${requests.addNew}`, {item}).pipe(this._untilDestroyed())
  }

  update(item: NewsModel) {
    return this.http.post<NewsModel[]>(`${requests.updateNew}/${item.id}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteNew}/${id}`).pipe(this._untilDestroyed())
  }
}
