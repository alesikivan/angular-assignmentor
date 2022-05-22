import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadCrumb } from '../../interfaces';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: BreadCrumb[]

  constructor(
    private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbsService.all()
  }

}
