import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  forms: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.forms = firestore.collection('forms').valueChanges();
  }
}
