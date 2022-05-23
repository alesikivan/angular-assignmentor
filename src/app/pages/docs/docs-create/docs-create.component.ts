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
  selector: 'app-docs-create',
  templateUrl: './docs-create.component.html',
  styleUrls: ['./docs-create.component.scss']
})
export class DocsCreateComponent implements OnInit {
  
  public subject: TeacherModel

  public id: number = 0
  
  public form: FormGroup

  public teachers: any = []

  public blockSubmitButton = false

  public preloader = false

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
      document_header: ['', [Validators.required]],
      teacher_id: ['Выбрать...', [Validators.required]],
      docsType: ['educational', [Validators.required]],
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
        {link: ['/', 'reports', 'create'], title: 'Создать документ'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/'], title: 'Главная'},
        {link: ['/', 'reports', 'create'], title: 'Обновить документ'},
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

    switch(this.form.value.docsType) {
      case 'educational':
        path = requests.educationalDoc
        break; 
      case 'scientific':
        path = requests.scientificDoc
        break;
      default: 
        path = requests.methodicalDoc
    }

    this.reportsService.createDoc(path, this.form.value)
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
