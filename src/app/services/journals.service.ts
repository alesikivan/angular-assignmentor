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

// export interface Group {
//   id: number,
//   name: string
// } 

export class JournalsService {

  public activeJournal$: Subject<number> = new Subject<number>()

  @UntilDestroyed() private _untilDestroyed: TUntilDestroyed

  constructor(
    private http: HttpClient
  ) {}

  setActiveJournalId(id: number) {
    this.activeJournal$.next(id)
  }

  getGroups() {
    return this.http.get<any>(`${requests.getGroups}?expand=course`).pipe(this._untilDestroyed())
  }

  getClassTypes() {
    return this.http.get<any>(`${requests.getClassTypes}?expand=class_type`).pipe(this._untilDestroyed())
  }

  getAll() {
    return this.http.get<Journal[]>(`${requests.getJournals}?expand=teacher.academicTitle`).pipe(this._untilDestroyed())
  }

  getByID(id: number): any {
    return this.http
      .get<Journal>(`${requests.getJournal}/${id}?expand=journalRecords.group.course,journalRecords.classType,teacher`)
      .pipe(this._untilDestroyed())
  }

  getRecordByID(id: number): any {
    return this.http.get<any>(`${requests.getJournalRecord}/${id}?expand=journal`).pipe(this._untilDestroyed())
  }

  add(item: Journal) {
    return this.http.post<Journal[]>(`${requests.addJournalRecord}`, item).pipe(this._untilDestroyed())
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
    return this.http.post(`${requests.updateournalRecord}?id=${item.id}`, item).pipe(this._untilDestroyed())
  }

  recordRemove(id: string) {
    return this.http.post(`${requests.removeJournalRecord}?id=${id}`, { id }).pipe(this._untilDestroyed())
  }
}
