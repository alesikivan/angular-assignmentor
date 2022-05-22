import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/admin/models/user';
import { UserService } from 'src/app/admin/services/user.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  id: number = 0;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private breadcrumbsService: BreadcrumbsService,
    private notifications: NotificationsService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      mobile: ['', []],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      gender: ['', [Validators.required]],
      date: [null, [Validators.required]],
      id: [0, [Validators.required]],
      isActive: [true],
      userType: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.form.get('Id')?.setValue(params['id']);

        this.userService.getByID(this.id)
        .subscribe((item: UserModel) => {
          this.form.setValue(item)
        })
      }

      if (this.id == 0 || this.id == null) {
        // Create page
        this.breadcrumbsService.change([
          {link: ['/admin', 'dashboard'], title: 'Главная'},
          {link: ['/admin', 'dashboard'], title: 'Панель'},
          {link: ['/admin', 'user', 'index'], title: 'Список пользователей'},
          {link: ['/admin', 'user', 'create',], title: 'Создать пользователя'},
        ])
      } else {
        // Update page
        this.breadcrumbsService.change([
          {link: ['/admin', 'dashboard'], title: 'Главная'},
          {link: ['/admin', 'dashboard'], title: 'Панель'},
          {link: ['/admin', 'user', 'index'], title: 'Список пользователей'},
          {link: ['/admin', 'user', 'create',], title: 'Обновить пользователя'},
        ])
      }
    })
  }

  save() {
    if (this.form.invalid) // true if any form validation fail
      return

    if (this.form.get('id')?.value === 0) {
      this.userService.add(this.form.value)
        .subscribe((list: UserModel[]) => {
          this.notifications.success('Объект успешно создан!')
        })
    } else {
      this.userService.update(this.form.value)
        .subscribe((list: UserModel[]) => {
          this.notifications.success('Объект успешно обновлен!')
        })
    }

    //Redirecting to user List page after save or update
    this.router.navigate(['/admin', 'user', 'index']);
  }

}
