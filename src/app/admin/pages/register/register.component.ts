import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  buttonWaiter = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private breadcrumbs: BreadcrumbsService,
    private notifications: NotificationsService
  ) {

    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnInit(): void {
    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['/admin', 'register'], title: 'Регистрация'},
    ])
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.buttonWaiter = true

    const user: User = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.register(user)
      .subscribe(
        () => {
          this.form.reset()
          this.router.navigate(['/login'])
          this.buttonWaiter = false

          this.notifications.success('Успешная регистрация!')
        },
        (e) => {
          this.buttonWaiter = false
          // location.reload()
        }
      )
  }

}
