import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/admin/models/journal';
import { JournalRecord } from 'src/app/admin/models/journalRecord';
import { JournalsService } from 'src/app/services/journals.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-journals-create',
  templateUrl: './journals-create.component.html',
  styleUrls: ['./journals-create.component.scss']
})
export class JournalsCreateComponent implements OnInit {

  public id = 0;

  public journalId: number

  public form: FormGroup

  public recordsHelper: any

  public preloader = false

  public blockSubmitButton = false

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private journalsService: JournalsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notifications: NotificationsService,
    private router: Router,
  ) {
    this.formInit()

    this.journalsService.setActiveJournalId(0)

     this.route.params.subscribe(params => {
      this.journalId = params['id']
      let recordId = params['recordId']

      if (recordId != null) this.preloader = true

      this.journalsService.helperData()
        .subscribe(recordsHelper => {
          // Set records data to inputs
          this.recordsHelper = recordsHelper

          this.setFormData(recordId)
        })

     })
  }

formInit() {
  this.form = this.fb.group({
    id: [0, [Validators.required]],
    journalId: [0, []],
    date: [new Date(), [Validators.required]],
    hours: [2, [Validators.required]],
    time: ['Выбрать время...', [Validators.required]],
    group: ['Выбрать группу...', [Validators.required]],
    lessonType: ['Выбрать тип занятия...', [Validators.required]],
    topic: ['', [Validators.required]],
  })
}

setFormData(recordId: number) {
  if (recordId != null) {
    this.form.get('id')?.setValue(recordId)
    this.id = recordId

    // Get current journal by id
    this.journalsService.getByID(this.journalId)
      .subscribe((journal: Journal) => this.setRecord(journal, recordId))
    }
  }

  setRecord(journal: Journal, recordId: number) {
    const idx = journal.journalRecords.findIndex(r => r.id == recordId)
    if (idx != null && idx != undefined) {
      let record = journal.journalRecords[idx]

      record.journalId = this.journalId
      record.date = new Date(record.date)

      this.form.setValue( record )

      this.preloader = false
      
      // Set active class to current journal
      this.journalsService.setActiveJournalId(journal.id)

      this.updateBreadcrumbs(journal)
    }
  }

  updateBreadcrumbs(journal: Journal) {
  if (!this.isCreateMode) {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/', 'journals', 'index'], title: 'Все журналы'},
      {link: ['/', 'journals', 'view', String(journal.id)], title: journal.title},
      {link: ['#'], title: 'Обновить запись'},
    ])
  }
  }
 
  get isCreateMode(): boolean {
    return this.id == 0 || this.id == null
  }
  
  ngOnInit(): void {
  }

  createRecord(): void {
    if (this.form.invalid) return;

    this.form.get('journalId')?.setValue(+this.journalId)

    this.blockSubmitButton = true

    this.notifications.default('Отправили и проверяем...')

    this.form.get('id')?.value === 0 ? this.addRecord() : this.updateRecord()
  }

  addRecord() {
    this.journalsService.add(this.form.value)
        .subscribe(
          () => {
            this.notifications.success('Объект успешно создан!')
            this.router.navigate(['/', 'journals', 'view', this.journalId]);
          },
          () => this.notifications.danger('Что-то пошло не так, проверьте данные.'),
          () => this.blockSubmitButton = false
        )
  }

  updateRecord() {
    this.journalsService.recordUpdate(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно обновлен!')
        this.router.navigate(['/', 'journals', 'view', this.journalId]);
      },
      () => this.notifications.danger('Что-то пошло не так, проверьте данные.'),
      () => this.blockSubmitButton = false
    )
  }

  removeRecord() {
    this.blockSubmitButton = true

    this.notifications.default('Удаляем запись...')
    
    this.journalsService.recordRemove(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно удален!')
        this.router.navigate(['/', 'journals', 'view', this.journalId]);
      },
      () => this.notifications.danger('Что-то пошло не так...'),
      () => this.blockSubmitButton = false
    )
  }

  setDate(): string {
    return new Date().toLocaleDateString()
  }

}
