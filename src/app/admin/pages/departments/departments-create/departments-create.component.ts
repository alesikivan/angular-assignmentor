import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/admin/models/department';
import { DepartmentService } from 'src/app/admin/services/department.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-departments-create',
  templateUrl: './departments-create.component.html',
  styleUrls: ['./departments-create.component.scss']
})
export class DepartmentsCreateComponent implements OnInit {
  
  public subject: DepartmentModel

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
    private departmentService: DepartmentService,
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
      abbreviation: ['', [Validators.required]],
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
        {link: ['/admin', 'departments', 'index'], title: 'Список кафедр'},
        {link: ['/admin', 'departments', 'create',], title: 'Создать кафедру'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/admin', 'dashboard'], title: 'Главная'},
        {link: ['/admin', 'dashboard'], title: 'Панель'},
        {link: ['/admin', 'departments', 'index'], title: 'Список кафедр'},
        {link: ['/admin', 'departments', 'create',], title: 'Обновить кафедру'},
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

      this.departmentService.getByID(params['id'])
        .subscribe((item: DepartmentModel) => {
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
    this.departmentService.add(this.form.value)
      .subscribe(
        () => {
          this.notifications.success('Объект успешно создан!')
          this.router.navigate(['/admin', 'departments', 'index']);
        },
        () => {
          this.notifications.danger('Что-то пошло не так, проверьте данные.')
          this.blockSubmitButton = false
        },
        () => this.blockSubmitButton = false
      )
  }

  update() {
    this.departmentService.update(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно обновлен!')
        this.router.navigate(['/admin', 'departments', 'index']);
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
    
    this.departmentService.remove(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно удален!')
        this.router.navigate(['/admin', 'departments', 'index']);
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

