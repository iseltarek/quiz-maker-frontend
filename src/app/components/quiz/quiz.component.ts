import { Component, Input } from '@angular/core';
import { SharedMaterialModule } from '../../modules/shared-material.module';
import { QuizResponse } from '../../models/quizResponse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz',
  imports: [SharedMaterialModule, CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  startQuiz() {
    throw new Error('Method not implemented.');
  }
  @Input() quiz!: QuizResponse;
  constructor() {}
}
