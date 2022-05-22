import { Component, OnInit } from '@angular/core';
import { JournalsService } from 'src/app/services/journals.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-journals-index',
  templateUrl: './journals-index.component.html',
  styleUrls: ['./journals-index.component.scss']
})
export class JournalsIndexComponent implements OnInit {

  constructor(
    private breadcrumbs: BreadcrumbsService,
    private journalsService: JournalsService,
  ) { }

  ngOnInit(): void {
    this.journalsService.setActiveJournalId(0)

    this.breadcrumbs.change([
      {link: ['/'], title: 'Главная'},
      {link: ['#'], title: 'Все журналы'}
    ])
  }

}
