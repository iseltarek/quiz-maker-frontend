import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { QuizResponse } from '../../../models/quizResponse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  imports: [SharedMaterialModule, CommonModule],
  templateUrl: './quizCard.component.html',
  styleUrl: './quizCard.component.css',
})
export class QuizCardComponent {
  @Input() quiz!: QuizResponse;
  constructor() {}
  @Output() quizOpened = new EventEmitter<boolean>();
  @Output() selectedQuizId = new EventEmitter<number>();

  startQuiz() {
    this.selectedQuizId.emit(this.quiz.id);
    this.quizOpened.emit(true);
  }
}
