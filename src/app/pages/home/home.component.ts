import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../modules/shared-material.module';
import { TeacherComponent } from '../../components/teacher/teacher.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, TeacherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
