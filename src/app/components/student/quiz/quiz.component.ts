import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { AnswerResponse } from '../../../models/answerResponse.model';

@Component({
  selector: 'app-quiz',
  imports: [SharedMaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  quiz!: QuizResponse;
  quizForm!: FormGroup;
  intervalId: any;
  timeLeft!: number;
  isSubmitted = false;
  answerResponse: AnswerResponse = {
    score: 0,
    passed: false,
  };
  @Input() quizId!: number;
  @Output() isQuizClosed = new EventEmitter<boolean>();
  constructor(private quizService: QuizService, private fb: FormBuilder) {}
  ngOnInit(): void {
    if (this.quizId) {
      this.quizService.getQuiz(this.quizId as number).subscribe({
        next: (quizResponse) => {
          this.quiz = quizResponse;
          this.initializeForm();
          this.timeLeft = this.quiz.duration * 60;
          this.startTimer();
        },
      });
    }
    // document.addEventListener('keydown', this.preventScreenshot);
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
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        this.submitQuiz();
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  submitQuiz() {
    if (this.quizForm.valid && !this.isSubmitted) {
      const answers = this.quizForm.value.answers;
      this.quizService.submitQuiz(answers, this.quiz.id).subscribe({
        next: (results) => {
          this.answerResponse = results;
          this.isSubmitted = true;
        },
      });
    }
  }

  closeQuiz() {
    this.isQuizClosed.emit(false);
  }
  // ngOnDestroy() {
  //   document.removeEventListener('keydown', this.preventScreenshot);
  // }
  // private preventScreenshot(e: KeyboardEvent) {
  //   if (
  //     e.key === 'PrintScreen' ||
  //     e.code === '44' ||
  //     (e.ctrlKey && e.key === 'p') ||
  //     (e.ctrlKey && e.shiftKey && e.key === 's')
  //   ) {
  //     e.preventDefault();
  //     alert('do not try to take any kinds of screenshot of the content');
  //     return false;
  //   }
  // }
}
