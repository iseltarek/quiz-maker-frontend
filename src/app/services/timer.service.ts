import { Injectable } from '@angular/core';
import { Observable, interval, map, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  startTimer(duration: number): Observable<number> {
    return interval(1000).pipe(
      map((elapsed) => duration - elapsed - 1),
      takeWhile((remaining) => remaining >= 0)
    );
  }
}
