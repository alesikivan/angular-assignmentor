import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Journal } from 'src/app/admin/models/journal';
import { JournalsService } from 'src/app/services/journals.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'journals-menu',
  templateUrl: './journals-menu.component.html',
  styleUrls: ['./journals-menu.component.scss']
})
export class JournalsMenuComponent implements OnInit {

  public activeJournal: number

  preloader = true
  
  public journals: Journal[] = []

  constructor(
    private journalsService: JournalsService,
    private router: Router,
    private notifications: NotificationsService,
  ) {
    this.journalsService.getAll()
      .subscribe(
        journals => this.journals = [...journals],
        () => {},
        () => this.preloader = false
      )

    this.journalsService.activeJournal$
      .subscribe(id => this.activeJournal = id)
  }

  openJournal(id: Number) {
    this.router.navigate(['/', 'journals', 'view', id])

    this.notifications.success('Заргужаем журнал..')
  }

  ngOnInit(): void {

  }

}
