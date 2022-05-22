import { Injectable, OnInit } from '@angular/core';
import { BreadCrumb } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbsService {

  breadcrumbs: BreadCrumb[] = []

  constructor() {}

  change(breadcrumbs: BreadCrumb[]) {
    this.clear()
    this.breadcrumbs.push(...breadcrumbs)
  }

  all() { return this.breadcrumbs }

  clear() { this.breadcrumbs.length = 0 }
}
