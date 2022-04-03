import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  item$: Observable<any[]>;
  constructor(firestore: Firestore) {
    const collection = collection(firestore, 'forms');
    this.item$ = collectionData(collection);
  }
}
