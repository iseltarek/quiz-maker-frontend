import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../modules/shared-material.module';
import { TeacherComponent } from '../../components/teacher/teacher.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule, TeacherComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  role: string | null = '';
  constructor(private authService: AuthService, private router: Router) {
    this.role = this.authService.getUserRole();
  }

  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
