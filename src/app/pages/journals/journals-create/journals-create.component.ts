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

  public groups: any = []
  public classTypes: any = []

  public preloader = false

  public blockSubmitButton = false

  public times: any = [
    { value: '08:30' },
    { value: '10:05' },
    { value: '11:55' },
    { value: '13:30' },
  ]

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

      this.journalsService.getGroups()
        .subscribe(response => {
          const { data } = response
          this.groups = data
          console.log(this.groups)
        })

      this.journalsService.getClassTypes()
        .subscribe(response => {
          const { data } = response
          this.classTypes = data
          console.log(this.classTypes)
        })

      this.setFormData(recordId)
     })
  }

formInit() {
  this.form = this.fb.group({
    id: [0, [Validators.required]],
    date: [new Date(), [Validators.required]],
    journalId: [0, []],
    hours: [2, [Validators.required]],
    time: ['Выбрать время...', [Validators.required]],
    groupId: ['Выбрать группу...', [Validators.required]],
    classType: ['Выбрать тип занятия...', [Validators.required]],
    topic: ['', [Validators.required]],
  })
}

formatDate(date: any) {
  let d = new Date(date)
  let year = d.getFullYear()
  let month = ('0' + (d.getMonth() + 1)).slice(-2)
  let day = ('0' + d.getDate()).slice(-2)

  return `${year}-${month}-${day}: ${this.form.get('time')?.value}`
}

setFormData(recordId: number) {
  if (recordId != null) {
    this.form.get('id')?.setValue(recordId)
    this.id = recordId

    // Get current journal by id
    this.journalsService.getRecordByID(this.id)
      .subscribe((response: any) => {
        const { data: record } = response
        console.log(record)
        this.preloader = false
        this.setRecord(record)
      })
    }
  }

  setRecord(record: any) {
    // console.log(journal.journalRecords)
    // const idx = journal.journalRecords.findIndex((r: any) => r.id == recordId)
    // if (idx != null && idx != undefined) {
      // let record = journal.journalRecords[idx]

      record.journalId = this.journalId
      record.date = new Date(record.date)
      let time = (record.lesson_at).split(' ')[1].split(':')
      time.pop()
      time = time.join(':')
      record.hours = time
      record.time = time

      this.form.setValue( record )

      this.preloader = false
      
      // Set active class to current journal
      this.journalsService.setActiveJournalId(record.journal_id)

      this.updateBreadcrumbs(record.journal)
    // }
  }

  updateBreadcrumbs(journal: Journal) {
  if (!this.isCreateMode) {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/', 'journals', 'index'], title: 'Все журналы'},
      {link: ['/', 'journals', 'view', String(journal.id)], title: journal.name},
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
    console.log(this.form.value)
    const record = Object.assign(this.form.value, {
      lessonAt: this.formatDate(this.form.get('date')?.value),
      teacherId: 1,
    })
    console.log(record)
    this.journalsService.add(record)
        .subscribe(
          () => {
            this.notifications.success('Объект успешно создан!')
            this.router.navigate(['/', 'journals', 'view', this.journalId]);
          },
          () => {
            this.notifications.danger('Что-то пошло не так, проверьте данные.')
            this.blockSubmitButton = false
          },
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
