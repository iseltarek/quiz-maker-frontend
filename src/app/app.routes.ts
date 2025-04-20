import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherComponent } from './components/teacher/teacher.component';
import { RoleGuard } from './guards/role.guard';
import { StudentComponent } from './components/student/student.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'teacher',
        component: TeacherComponent,
        canActivate: [RoleGuard],
      },
      { path: 'student', component: StudentComponent },
    ],
  },
];
