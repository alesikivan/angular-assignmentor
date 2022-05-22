import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DocsCreateComponent } from './pages/docs/docs-create/docs-create.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JournalsCreateComponent } from './pages/journals/journals-create/journals-create.component';
import { JournalsIndexComponent } from './pages/journals/journals-index/journals-index.component';
import { JournalsLayoutComponent } from './pages/journals/journals-layout/journals-layout.component';
import { JournalsViewComponent } from './pages/journals/journals-view/journals-view.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { ReportsCreateComponent } from './pages/reports/reports-create/reports-create.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthGuard } from './shared/services/auth.guard';
import { RolesGuard } from './shared/services/roles.guard';

let roles = ['admin']

//  => []

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
      ]},
      {path: 'index', component: JournalsIndexComponent, canActivate: [], data: {roles}},

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
