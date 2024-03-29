import { LOCALE_ID, NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/services/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
// import { PreviewComponent } from './shared/components/preview/preview.component';
import { NotificationsService } from './shared/services/notifications.service';
import { BreadcrumbsService } from './shared/services/breadcrumbs.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JournalsCreateComponent } from './pages/journals/journals-create/journals-create.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';
import { JournalsIndexComponent } from './pages/journals/journals-index/journals-index.component';
import { JournalsLayoutComponent } from './pages/journals/journals-layout/journals-layout.component';
import { JournalsMenuComponent } from './pages/journals/components/journals-menu/journals-menu.component';

import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ReportsCreateComponent } from './pages/reports/reports-create/reports-create.component';
import { DocsCreateComponent } from './pages/docs/docs-create/docs-create.component';
import { RecordsCreateComponent } from './pages/records/records-create/records-create.component';
import { AssignmentIndexComponent } from './pages/assignment/assignment-index/assignment-index.component';
import { TeacherPreferencesComponent } from './pages/assignment/teacher-preferences/teacher-preferences.component';
import { TeacherRateComponent } from './pages/assignment/teacher-rate/teacher-rate.component';
import { DisciplineTimeComponent } from './pages/assignment/discipline-time/discipline-time.component';
import { TimeManagerComponent } from './pages/assignment/time-manager/time-manager.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}
@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    JournalsCreateComponent,
    JournalsViewComponent,
    JournalsIndexComponent,
    JournalsLayoutComponent,
    JournalsMenuComponent,
    ReportsCreateComponent,
    DocsCreateComponent,
    RecordsCreateComponent,
    AssignmentIndexComponent,
    TeacherPreferencesComponent,
    TeacherRateComponent,
    DisciplineTimeComponent,
    TimeManagerComponent 
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    FormsModule,
    PaginatorModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NotificationsService,
    BreadcrumbsService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
