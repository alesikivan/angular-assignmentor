import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TeacherModel } from 'src/app/admin/models/teacher';
import { TeachersService } from 'src/app/admin/services/teachers.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-teachers-create',
  templateUrl: './teachers-create.component.html',
  styleUrls: ['./teachers-create.component.scss']
})
export class TeachersCreateComponent implements OnInit {
  
  public subject: TeacherModel

  public id: number = 0
  
  public form: FormGroup

  public dataHepler: any

  public blockSubmitButton = false

  public preloader = false

  public myDate = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private teacherService: TeachersService,
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
      name: ['', [Validators.required]],
      department: ['Выбрать кафедру...', [Validators.required]],
      academicDegree: ['Выбрать учетную степень...', [Validators.required]],
      academicTitle: ['Выбрать учетное звание...', [Validators.required]],
      teacherPost: ['Выбрать позицию...', [Validators.required]],
      experience: ['2007-09-01', [Validators.required]],
    })
  } 

  get isCreateMode(): boolean {
    return this.id == 0 || this.id == null
  }

  setBreadcrumbs() {
    if (this.isCreateMode) {
      // Create page
      this.breadcrumbsService.change([
        {link: ['/admin', 'dashboard'], title: 'Главная'},
        {link: ['/admin', 'dashboard'], title: 'Панель'},
        {link: ['/admin', 'teachers', 'index'], title: 'Список преподавателей'},
        {link: ['/admin', 'teachers', 'create',], title: 'Создать преподавателя'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/admin', 'dashboard'], title: 'Главная'},
        {link: ['/admin', 'dashboard'], title: 'Панель'},
        {link: ['/admin', 'teachers', 'index'], title: 'Список преподавателей'},
        {link: ['/admin', 'teachers', 'create',], title: 'Обновить преподавателя'},
      ])
    }
  }

  setData(params: any) {
    if (params['id'] != null) this.preloader = true

    this.teacherService.dataHepler()
      .subscribe((data) => {
        this.dataHepler = data

        this.setFormData(params)
      })
  }

  setFormData(params: any) {
    this.id = params['id']
    
    if (params['id'] != null) {
      this.form.get('id')?.setValue(params['id'])

      this.teacherService.getByID(params['id'])
        .subscribe((item: TeacherModel) => {
          this.subject = item

          this.form.setValue(item)

          this.form.get('experience')?.setValue(this.form.value.experience)

          this.preloader = false
        })
    }
  }

  save() {
    if (this.form.invalid) return;

    this.blockSubmitButton = true

    this.notifications.default('Отправили и проверяем...')

    this.form.get('id')?.value === 0 ? this.create() : this.update()
  }

  create() {
    this.teacherService.add(this.form.value)
      .subscribe(
        () => {
          this.notifications.success('Объект успешно создан!')
          this.router.navigate(['/admin', 'teachers', 'index']);
        },
        () => this.notifications.danger('Что-то пошло не так, проверьте данные.'),
        () => this.blockSubmitButton = false
      )
  }

  update() {
    this.teacherService.update(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно обновлен!')
        this.router.navigate(['/admin', 'teachers', 'index']);
      },
      () => this.notifications.danger('Что-то пошло не так, проверьте данные.'),
      () => this.blockSubmitButton = false
    )
  }

  removeRecord() {
    this.blockSubmitButton = true

    this.notifications.default('Удаляем запись...')
    
    this.teacherService.remove(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно удален!')
        this.router.navigate(['/admin', 'teachers', 'index']);
      },
      () => this.notifications.danger('Что-то пошло не так...'),
      () => this.blockSubmitButton = false
    )
  }

  setDate(): string {
    return new Date().toLocaleDateString()
  }

}
