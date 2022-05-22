import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicTitleModel } from 'src/app/admin/models/academic-title';
import { AcademicTitleService } from 'src/app/admin/services/academic-title.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-academic-titles-create',
  templateUrl: './academic-titles-create.component.html',
  styleUrls: ['./academic-titles-create.component.scss']
})
export class AcademicTitlesCreateComponent implements OnInit {
  
  public subject: AcademicTitleModel

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
    private academicTitleService: AcademicTitleService,
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
        {link: ['/admin', 'academic-titles', 'index'], title: 'Список учебных записей'},
        {link: ['/admin', 'academic-titles', 'create',], title: 'Создать учебную запись'},
      ])
    } else {
      // Update page
      this.breadcrumbsService.change([
        {link: ['/admin', 'dashboard'], title: 'Главная'},
        {link: ['/admin', 'dashboard'], title: 'Панель'},
        {link: ['/admin', 'academic-titles', 'index'], title: 'Список учебных записей'},
        {link: ['/admin', 'academic-titles', 'create',], title: 'Обновить учебную запись'},
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

      this.academicTitleService.getByID(params['id'])
        .subscribe((item: AcademicTitleModel) => {
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
    this.academicTitleService.add(this.form.value)
      .subscribe(
        () => {
          this.notifications.success('Объект успешно создан!')
          this.router.navigate(['/admin', 'academic-titles', 'index']);
        },
        () => {
          this.notifications.danger('Что-то пошло не так, проверьте данные.')
          this.blockSubmitButton = false
        },
        () => this.blockSubmitButton = false
      )
  }

  update() {
    this.academicTitleService.update(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно обновлен!')
        this.router.navigate(['/admin', 'academic-titles', 'index']);
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
    
    this.academicTitleService.remove(this.form.value)
    .subscribe(
      () => {
        this.notifications.success('Объект успешно удален!')
        this.router.navigate(['/admin', 'academic-titles', 'index']);
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
