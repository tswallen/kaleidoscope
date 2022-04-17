import { Component } from '@angular/core';

@Component({
  selector: 'kaleidoscope-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  /*   public readonly forms: Observable<any[]>; */

  constructor() {
    /*     const ref = doc(firestore, 'forms');
    this.forms = docData(ref).pipe(traceUntilFirst('firestore')); */
  }
}
