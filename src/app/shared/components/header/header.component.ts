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

  public username: string = ''

  constructor(
    private auth: AuthService,
  ) {
    this.auth.isAuth$
      .subscribe(mode => this.permission = mode)
    
    if (this.auth.user) 
      this.auth.user
        .subscribe((user: any) => this.username = user?.username || '')
  }

  logout(): void {
    this.auth.logout()
  }

  ngOnInit(): void {
    this.permission = this.auth.isAuthenticated()
  }

}
