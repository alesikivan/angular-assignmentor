import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AssignmentIndexComponent } from './pages/assignment/assignment-index/assignment-index.component';
import { DisciplineTimeComponent } from './pages/assignment/discipline-time/discipline-time.component';
import { TeacherPreferencesComponent } from './pages/assignment/teacher-preferences/teacher-preferences.component';
import { TeacherRateComponent } from './pages/assignment/teacher-rate/teacher-rate.component';
import { TimeManagerComponent } from './pages/assignment/time-manager/time-manager.component';
import { DocsCreateComponent } from './pages/docs/docs-create/docs-create.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JournalsCreateComponent } from './pages/journals/journals-create/journals-create.component';
import { JournalsIndexComponent } from './pages/journals/journals-index/journals-index.component';
import { JournalsLayoutComponent } from './pages/journals/journals-layout/journals-layout.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RecordsCreateComponent } from './pages/records/records-create/records-create.component';
import { ReportsCreateComponent } from './pages/reports/reports-create/reports-create.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { RolesGuard } from './shared/services/roles.guard';

let roles = ['admin']

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'login', redirectTo: '/admin/login'},
      {path: 'journals',component: JournalsLayoutComponent, children: [
        {path: '', redirectTo: '/journals/index', pathMatch: 'full'},
        {path: 'index', component: JournalsIndexComponent, canActivate: [], data: {roles}},
        {path: 'update/:id/record/:recordId', component: JournalsCreateComponent, canActivate: [], data: {roles}},
        {path: 'create/:id', component: JournalsCreateComponent, canActivate: [], data: {roles}},
        {path: 'view/:id', component: JournalsViewComponent, canActivate: [], data: {roles}},
        {path: 'records/create/:id', component: RecordsCreateComponent, canActivate: []},
        {path: 'records/update/:id/record/:recordId', component: RecordsCreateComponent, canActivate: []},
      ]},
      
      {path: 'assignment', children: [
        { path: '', redirectTo: '/journals/index', pathMatch: 'full' },
        { path: 'index', component: AssignmentIndexComponent },
        { path: 'teacher/preferences', component: TeacherPreferencesComponent },
        { path: 'teacher/rate', component: TeacherRateComponent },
        { path: 'discipline/time', component: DisciplineTimeComponent },
        { path: 'time/manager', component: TimeManagerComponent },
      ]},

      {path: 'reports/create', component: ReportsCreateComponent, canActivate: []},
      {path: 'docs/create', component: DocsCreateComponent, canActivate: []},

      {path: '**', pathMatch: 'full', component: NotFoundPageComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
