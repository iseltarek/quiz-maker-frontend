import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { QuizResponse } from '../../../models/quizResponse.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-card',
  imports: [SharedMaterialModule, CommonModule],
  templateUrl: './quizCard.component.html',
  styleUrl: './quizCard.component.css',
})
export class QuizCardComponent implements OnInit {
  @Input() quiz!: QuizResponse;
  @Output() quizOpened = new EventEmitter<boolean>();
  @Output() selectedQuizId = new EventEmitter<number>();
  availabilityCheck: any;
  ngOnInit(): void {
    if (this.quiz) {
      this.availabilityCheck = setInterval(() => {
        this.updateQuizAvailability();
      }, 60000);
    }
  }
  private updateQuizAvailability() {
    if (this.quiz.startAt <= new Date()) {
      this.quiz.isPublished = true;
    }
  }
  startQuiz() {
    this.selectedQuizId.emit(this.quiz.id);
    this.quizOpened.emit(true);
  }
  ngOnDestroy() {
    clearInterval(this.availabilityCheck);
  }
}
