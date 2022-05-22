import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AcademicDegreeModel } from 'src/app/admin/models/academic-degree';
import { AcademicDegreeService } from 'src/app/admin/services/academic-degree.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-academic-degries-create',
  templateUrl: './academic-degries-create.component.html',
  styleUrls: ['./academic-degries-create.component.scss']
})
export class AcademicDegriesCreateComponent implements OnInit {
  
  public subject: AcademicDegreeModel

  public id: number = 0
  
  public form: FormGroup

  public dataHepler: any

  public itemNotFound = false

  public blockSubmitButton = false

  public preloader = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private academicDegreeService: AcademicDegreeService,
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
      title: ['', [Validators.required]],
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
        {link: ['/admin', 'academic-degries', 'index'], title: 'Список учетных степеней'},
        {link: ['/admin', 'academic-degries', 'create',], title: 'Создать учетную степень'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/admin', 'dashboard'], title: 'Главная'},
        {link: ['/admin', 'dashboard'], title: 'Панель'},
        {link: ['/admin', 'academic-degries', 'index'], title: 'Список учетных степеней'},
        {link: ['/admin', 'academic-degries', 'create',], title: 'Обновить учетную степень'},
      ])
    }
  }

  setData(params: any) {
    if (params['id'] != null) this.preloader = true
    this.setFormData(params)
  }

  setFormData(params: any) {
    this.id = params['id']
    
    if (params['id'] != null) {
      this.form.get('id')?.setValue(params['id'])

      this.academicDegreeService.getByID(params['id'])
        .subscribe((item: AcademicDegreeModel) => {
          // If item exist
          if (item) {
            this.subject = item
          
            this.form.setValue(item)
          } else {
            this.itemNotFound = true
          }
          
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
    this.academicDegreeService.add(this.form.value)
      .subscribe(
        () => {
          this.notifications.success('Объект успешно создан!')
          this.router.navigate(['/admin', 'academic-degries', 'index']);
        },
        () => {
          this.notifications.danger('Что-то пошло не так, проверьте данные.')
          this.blockSubmitButton = false
        },
        () => this.blockSubmitButton = false
      )
  }

  update() {
    this.academicDegreeService.update(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно обновлен!')
        this.router.navigate(['/admin', 'academic-degries', 'index']);
      },
      () => {
        this.notifications.danger('Что-то пошло не так, проверьте данные.')
        this.blockSubmitButton = false
      },
      () => this.blockSubmitButton = false
    )
  }

  removeRecord() {
    this.blockSubmitButton = true

    this.notifications.default('Удаляем запись...')
    
    this.academicDegreeService.remove(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно удален!')
        this.router.navigate(['/admin', 'academic-degries', 'index']);
      },
      () => {
        this.notifications.danger('Что-то пошло не так...')
        this.blockSubmitButton = false
      },
      () => this.blockSubmitButton = false
    )
  }

  setDate(): string {
    return new Date().toLocaleDateString()
  }

}
