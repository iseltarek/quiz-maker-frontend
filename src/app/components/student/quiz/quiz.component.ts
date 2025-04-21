import { Component, Input, OnInit } from '@angular/core';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { QuizService } from '../../../services/quiz.service';
import { QuizResponse } from '../../../models/quizResponse.model';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuestionResponse } from '../../../models/questionResponse.model';

@Component({
  selector: 'app-quiz',
  imports: [SharedMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  @Input() quizId!: number;
  quiz!: QuizResponse;
  quizForm!: FormGroup;
  timeLeft!: number;
  isSubmitted = false;
  constructor(private quizService: QuizService, private fb: FormBuilder) {}
  ngOnInit(): void {
    if (this.quizId) {
      this.quizService.getQuiz(this.quizId as number).subscribe({
        next: (quizResponse) => {
          this.quiz = quizResponse;
          this.initializeForm();
          this.startTimer();
        },
      });
    }
  }
  private initializeForm() {
    this.quizForm = this.fb.group({
      answers: this.fb.array([]),
    });

    this.quiz.questions?.forEach((question) => {
      this.addQuestionToForm(question);
    });
  }
  private addQuestionToForm(question: QuestionResponse) {
    const answers = this.quizForm.get('answers') as FormArray;

    answers.push(
      this.fb.group({
        questionId: [question.id],
        answer: ['', Validators.required],
        questionType: [question.type],
      })
    );
  }
  private startTimer() {
    // this.timeLeft = this.quiz.duration * 60; // Convert minutes to seconds
    // this.timerSubscription = this.timerService
    //   .startTimer(this.timeLeft)
    //   .subscribe({
    //     next: (remainingTime) => {
    //       this.timeLeft = remainingTime;
    //       if (remainingTime === 0) {
    //         this.onSubmit();
    //       }
    //     },
    //   });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onSubmit() {
    if (this.quizForm.valid && !this.isSubmitted) {
      this.isSubmitted = true;

      const answers = this.quizForm.value.answers;
    }
  }
}
