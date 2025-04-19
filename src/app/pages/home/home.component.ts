import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../modules/shared-material.module';

@Component({
  selector: 'app-home',
  imports: [SharedMaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  logout() {
    throw new Error('Method not implemented.');
  }
}
