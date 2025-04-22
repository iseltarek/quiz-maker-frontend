import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  nextCheckTimer: any;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.checkAvailability();
    this.setupAutoCheck();
  }

  private checkAvailability() {
    this.quiz.isPublished = new Date(this.quiz.startAt) <= new Date();

    if (!this.quiz.isPublished) {
      const timeUntilAvailable =
        new Date(this.quiz.startAt).getTime() - Date.now();
      if (timeUntilAvailable > 0) {
        clearTimeout(this.nextCheckTimer);
        this.nextCheckTimer = setTimeout(
          () => this.checkAvailability(),
          timeUntilAvailable
        );
      }
    }
  }

  private setupAutoCheck() {
    const interval = setInterval(() => {
      this.checkAvailability();
    }, 60000);

    return () => clearInterval(interval);
  }

  startQuiz() {
    this.selectedQuizId.emit(this.quiz.id);
    this.quizOpened.emit(true);
  }
  ngOnDestroy() {
    clearInterval(this.availabilityCheck);
  }
}
