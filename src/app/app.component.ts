import { Component } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { traceUntilFirst } from 'rxfire/performance';
import { Observable } from 'rxjs';

@Component({
  selector: 'kaleidoscope-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
/*   public readonly forms: Observable<any[]>; */

  constructor(firestore: Firestore) {
/*     const ref = doc(firestore, 'forms');
    this.forms = docData(ref).pipe(traceUntilFirst('firestore')); */
  }
}
