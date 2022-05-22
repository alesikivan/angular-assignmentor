import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { QuillModule } from "ngx-quill";
import { PreviewComponent } from "./components/preview/preview.component";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    NotificationsComponent,
    BreadcrumbsComponent,
    QuillModule,
    PreviewComponent
  ],
  declarations: [
    NotificationsComponent,
    BreadcrumbsComponent,
    PreviewComponent
  ],

})

export class SharedModule {

}
