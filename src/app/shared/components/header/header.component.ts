import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  public permission = false

  constructor(
    private auth: AuthService,
  ) {
    this.auth.isAuth
      .subscribe(mode => this.permission = mode)
  }

  logout(): void {
    this.auth.logout()
  }

  ngOnInit(): void {
    this.permission = this.auth.isAuthenticated()
  }

}
