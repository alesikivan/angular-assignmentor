import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeacherModel } from 'src/app/admin/models/teacher';
import { TeachersService } from 'src/app/admin/services/teachers.service';
import { ReportsService } from 'src/app/services/reports.service';
import { requests } from 'src/app/shared/requests';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-reports-create',
  templateUrl: './reports-create.component.html',
  styleUrls: ['./reports-create.component.scss']
})
export class ReportsCreateComponent implements OnInit {
  
  public subject: TeacherModel

  public id: number = 0
  
  public form: FormGroup

  public dataHepler: any

  public blockSubmitButton = false

  public preloader = false

  public teachers: any = []

  public workTypes: any = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private reportsService: ReportsService,

    private breadcrumbsService: BreadcrumbsService,
    private notifications: NotificationsService
  ) {
    this.formInit()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.setData(params)

      this.setBreadcrumbs()
    })
  }

  formInit() {
    this.form = this.fb.group({
      id: [0, [Validators.required]],
      description: ['', [Validators.required]],
      teacher_id: ['Выбрать...', [Validators.required]],
      level: ['brest', [Validators.required]],
      workTypeID: ['Выбрать вид работы...', [Validators.required]],
    })
  } 

  get isCreateMode(): boolean {
    return this.id == 0 || this.id == null
  }

  setBreadcrumbs() {
    if (this.isCreateMode) {
      // Create page
      this.breadcrumbsService.change([
        {link: ['/'], title: 'Главная'},
        {link: ['/', 'reports', 'create'], title: 'Создать отчет'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/'], title: 'Главная'},
        {link: ['/', 'reports', 'create'], title: 'Обновить отчет'},
      ])
    }
  }

  setData(params: any) {
    if (params['id'] != null) this.preloader = true

    this.reportsService.getTeachers({})
      .subscribe((response: any) => {
        const { data } = response
        this.teachers = data
        // this.setFormData(params)
      })

    this.reportsService.getReportTypes({})
      .subscribe((response: any) => {
        const { data } = response
        this.workTypes = data
        // this.setFormData(params)
      })
  }

  getWorkTypeById(id: string) {
    return this.workTypes.find((workType: any) => workType.id == id)
  }

  save() {
    if (this.form.invalid) return;

    this.blockSubmitButton = true

    this.notifications.default('Отправили и проверяем...')

    this.create()
  }

  create() {

    let path = ''
    const data = this.form.value
    const { teacher_id } = data
    const { id: type_id, type } = this.getWorkTypeById(data.workTypeID)

    switch(type) {
      case 'educational':
        path = requests.createEducationalReport
        break; 
      case 'scientific':
        path = requests.createScientificReport
        break;
      default: path = requests.createMethodicalReport
    }

    const report = Object.assign(data, { 
      teachers: [teacher_id], type_id
    })

    this.reportsService.createReport(path, report)
      .subscribe(
        (responce) => {
          this.notifications.success('Успешное создание')
          this.router.navigate(['/'])
        },
        () => this.blockSubmitButton = false
      )
  }

  setDate(): string {
    return new Date().toLocaleDateString()
  }

}
