import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Journal } from 'src/app/admin/models/journal';
import { JournalsService } from 'src/app/services/journals.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'app-journals-view',
  templateUrl: './journals-view.component.html',
  styleUrls: ['./journals-view.component.scss']
})
export class JournalsViewComponent implements OnInit {

  public preloader = true

  public journal: Journal

  constructor(
    private route: ActivatedRoute,
    private journalsService: JournalsService,
    private breadcrumbs: BreadcrumbsService
  ) {    
    
    this.route.params.subscribe(params => {
      let id = params['id']

      this.preloader = true

      this.journalsService.setActiveJournalId(id)

      this.journalsService.getByID(id)
        .subscribe((journal: Journal) => {
          this.journal = journal

          this.preloader = false

          this.breadcrumbs.change([
            {link: ['/'], title: 'Главная'},
            {link: ['/', 'journals', 'index'], title: 'Все журналы'},
            {link: ['#'], title: journal.title},
          ])
        })
    })
  }

  ngOnInit(): void {
  }

}
