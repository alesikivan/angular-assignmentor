import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./shared/layouts/admin-layout/admin-layout.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../shared/services/auth.guard";
import { UserIndexComponent } from "./pages/user/user-index/user-index.component";
import { UserViewComponent } from "./pages/user/user-view/user-view.component";
import { UserService } from "./services/user.service";

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { TieredMenuModule } from "primeng/tieredmenu";
import { MenuModule } from "primeng/menu";

import { UserCreateComponent } from "./pages/user/user-create/user-create.component";
import { MenuComponent } from './shared/components/menu/menu.component';
import { RolesGuard } from "../shared/services/roles.guard";
import { NewsViewComponent } from './pages/news/news-view/news-view.component';
import { NewsCreateComponent } from './pages/news/news-create/news-create.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { RegisterComponent } from './pages/register/register.component';
import { NewsIndexComponent } from "./pages/news/news-index/news-index.component";
import { DashboardPageComponent } from "../pages/dashboard-page/dashboard-page.component";
import { TeachersIndexComponent } from './pages/teachers/teachers-index/teachers-index.component';
import { TeachersViewComponent } from './pages/teachers/teachers-view/teachers-view.component';
import { TeachersCreateComponent } from './pages/teachers/teachers-create/teachers-create.component';
import { AcademicDegriesIndexComponent } from './pages/academic-degries/academic-degries-index/academic-degries-index.component';
import { AcademicDegriesViewComponent } from './pages/academic-degries/academic-degries-view/academic-degries-view.component';
import { AcademicDegriesCreateComponent } from './pages/academic-degries/academic-degries-create/academic-degries-create.component';
import { AcademicTitlesIndexComponent } from './pages/academic-titles/academic-titles-index/academic-titles-index.component';
import { AcademicTitlesCreateComponent } from './pages/academic-titles/academic-titles-create/academic-titles-create.component';
import { DepartmentsCreateComponent } from './pages/departments/departments-create/departments-create.component';
import { DepartmentsIndexComponent } from './pages/departments/departments-index/departments-index.component';

let roles = ['admin']

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'user', children: [
        {path: '', redirectTo: '/user/index', pathMatch: 'full'},
        {path: 'index', component: UserIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'view/:id', component: UserViewComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: UserCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: UserCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]},
      {path: 'news', children: [
        {path: '', redirectTo: '/news/index', pathMatch: 'full'},
        {path: 'index', component: NewsIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: NewsCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: NewsCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'view/:id', component: NewsViewComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]},
      {path: 'teachers', children: [
        {path: '', redirectTo: '/teachers/index', pathMatch: 'full'},
        {path: 'index', component: TeachersIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: TeachersCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: TeachersCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'view/:id', component: TeachersViewComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]},
      {path: 'academic-degries', children: [
        {path: '', redirectTo: '/academic-degries/index', pathMatch: 'full'},
        {path: 'index', component: AcademicDegriesIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: AcademicDegriesCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: AcademicDegriesCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'view/:id', component: AcademicDegriesViewComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]},
      {path: 'academic-titles', children: [
        {path: '', redirectTo: '/academic-titles/index', pathMatch: 'full'},
        {path: 'index', component: AcademicTitlesIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: AcademicTitlesCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: AcademicTitlesCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]},
      {path: 'departments', children: [
        {path: '', redirectTo: '/departments/index', pathMatch: 'full'},
        {path: 'index', component: DepartmentsIndexComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'update/:id', component: DepartmentsCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
        {path: 'create', component: DepartmentsCreateComponent, canActivate: [AuthGuard, RolesGuard], data: {roles}},
      ]}
    ]
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    UserIndexComponent,
    UserViewComponent,
    UserCreateComponent,
    MenuComponent,
    NewsIndexComponent,
    NewsViewComponent,
    NewsCreateComponent,
    RegisterComponent,
    TeachersIndexComponent,
    TeachersViewComponent,
    TeachersCreateComponent,
    AcademicDegriesIndexComponent,
    AcademicDegriesViewComponent,
    AcademicDegriesCreateComponent,
    AcademicTitlesIndexComponent,
    AcademicTitlesCreateComponent,
    DepartmentsCreateComponent,
    DepartmentsIndexComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    TableModule,
    CalendarModule,
    ButtonModule,
    SliderModule,
    MenuModule,
    TieredMenuModule,
    MultiSelectModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserService
  ]
})

export class AdminModule {}
