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

  public workTypeItem: any

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
      workTypes: ['Выбрать...', [Validators.required]],
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
        console.log(this.teachers)
        // this.setFormData(params)
      })

    this.reportsService.getReportTypes({})
      .subscribe((response: any) => {
        const { data } = response
        this.workTypes = data
        console.log(this.workTypes)
        // this.setFormData(params)
      })
  }

  // setFormData(params: any) {
  //   this.id = params['id']
    
  //   if (params['id'] != null) {
  //     this.form.get('id')?.setValue(params['id'])

  //     this.teacherService.getByID(params['id'])
  //       .subscribe((item: TeacherModel) => {
  //         this.subject = item
          
  //         this.form.setValue(item)

  //         this.preloader = false
  //       })
  //   }
  // }

  save() {
    if (this.form.invalid) return;

    this.blockSubmitButton = true

    this.notifications.default('Отправили и проверяем...')

    this.create()

    // this.form.get('id')?.value === 0 ? this.create() : this.update()
  }

  create() {

    let path = ''

    const { id, type } = this.workTypeItem

    switch(type) {
      case 'educational':
        path = requests.createEducationalReport
        break; 
      case 'scientific':
        path = requests.createScientificReport
        break;
      default: 
        path = requests.createMethodicalReport
    }

    console.log(this.form.value.workTypes)
    console.log(this.workTypeItem)

    const obj = Object.assign(this.form.value, {
      teachers: [this.form.value.teacher_id],
      type_id: id
    })
    console.log(obj);

    this.reportsService.createReport(path, this.form.value)
      .subscribe(
        () => {
          this.notifications.success('Объект успешно создан!')
          this.router.navigate(['/']);
        },
        e => {
          console.log(e)
          this.notifications.danger('Что-то пошло не так, проверьте данные.')
        },
        () => this.blockSubmitButton = false
      )
  }

  // update() {
  //   this.teacherService.update(this.form.value)
  //   .subscribe(
  //     () => {
  //       this.notifications.success('Объект успешно обновлен!')
  //       this.router.navigate(['/admin', 'teachers', 'index']);
  //     },
  //     () => this.notifications.danger('Что-то пошло не так, проверьте данные.'),
  //     () => this.blockSubmitButton = false
  //   )
  // }

  // removeRecord() {
  //   this.blockSubmitButton = true

  //   this.notifications.default('Удаляем запись...')
    
  //   this.teacherService.remove(this.form.value)
  //   .subscribe(
  //     () => {
  //       this.notifications.success('Объект успешно удален!')
  //       this.router.navigate(['/admin', 'teachers', 'index']);
  //     },
  //     () => this.notifications.danger('Что-то пошло не так...'),
  //     () => this.blockSubmitButton = false
  //   )
  // }

  setDate(): string {
    return new Date().toLocaleDateString()
  }

}
