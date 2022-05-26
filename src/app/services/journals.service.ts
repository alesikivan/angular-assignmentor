import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TUntilDestroyed, UntilDestroyed } from 'src/app/shared/decorators/until-destroyed';
import { requests } from 'src/app/shared/requests';
import { Journal } from '../admin/models/journal';
import { JournalRecord } from '../admin/models/journalRecord';

@Injectable({
  providedIn: 'root'
})

export class JournalsService {

  public activeJournal$: Subject<number> = new Subject<number>()

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  setActiveJournalId(id: number) {
    this.activeJournal$.next(id)
  }

  getAll() {
    return this.http.get<Journal[]>(requests.getJournals).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http.get<Journal>(`${requests.getJournal}/${id}`).pipe(this._untilDestroyed())
  }

  add(item: Journal) {
    return this.http.post<Journal[]>(`${requests.addJournal}`, {item}).pipe(this._untilDestroyed())
  } 

  update(item: Journal) {
    return this.http.post<Journal[]>(`${requests.updateJournal}/${item.id}`, {item}).pipe(this._untilDestroyed())
  }

  remove(id: number) {
    return this.http.delete(`${requests.deleteJournal}/${id}`).pipe(this._untilDestroyed())
  }
  
  helperData() {
    return this.http.get(`${requests.recordsData}`).pipe(this._untilDestroyed())
  }
  
  recordUpdate(item: JournalRecord) {
    return this.http.post(`${requests.recordUpdate}`, {item}).pipe(this._untilDestroyed())
  }

  recordRemove(item: JournalRecord) {
    return this.http.post(`${requests.recordRemove}`, {item}).pipe(this._untilDestroyed())
  }
}
