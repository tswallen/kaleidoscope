import { Injectable } from '@angular/core';
import { forms } from './forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor() {}

  getForm(form: string) {
    return forms.find((f) => f.route === form);
  }
}
