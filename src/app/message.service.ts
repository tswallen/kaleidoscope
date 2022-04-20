import { Injectable } from '@angular/core';

export interface MessageInfo {
  header: string;
  body: string;
  delay?: number;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: MessageInfo[] = [];

  add(message: MessageInfo) {
    this.messages.push(message);
  }

  remove(message: MessageInfo) {
    this.messages = this.messages.filter(m => m != message);
  }
}
