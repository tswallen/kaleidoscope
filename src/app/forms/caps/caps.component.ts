import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';

@Component({
  selector: 'app-caps',
  templateUrl: './caps.component.html',
  styleUrls: ['./caps.component.css'],
})
export class CapsComponent {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};

  labels: string[] = [
    '1) Do you ever notice that sounds are much louder than they normally would be?',
    '2) Do you ever sense the presence of another being, despite being unable to see any evidence?',
    '3) Do you ever hear your own thoughts repeated or echoed?',
    '4) Do you ever see shapes, lights or colours even though there is nothing really there?',
    '5) Do you ever experience unusual burning sensations or other strange feelings in or on your body?',
    '6) Do you ever hear noises or sounds when there is nothing about to explain them?',
    '7) Do you ever hear your own thoughts spoken aloud in your head, so that someone near might be able to hear them?',
    '8) Do you ever detect smells which don’t seem to come from your surroundings?',
    '9) Do you ever have the sensation that your body, or a part of it, is changing or has changed shape?',
    '10) Do you ever have the sensation that your limbs might not be your own or might not be properly connected to your body?',
    '11) Do you ever hear voices commenting on what you are thinking or doing?',
    '12) Do you ever feel that someone is touching you, but when you look nobody is there?',
    '13) Do you ever hear voices saying words or sentences when there is no-one around that might account for it?',
    '14) Do you ever experience unexplained tastes in your mouth?',
    '15) Do you ever find that sensations happen all at once and flood you with information?',
    '16) Do you ever find that sounds are distorted in strange or unusual ways?',
    '17) Do you ever have difficulty distinguishing one sensation from another?',
    '18) Do you ever smell everyday odours and think that they are unusually strong?',
    '19) Do you ever find the appearance of things or people seems to change in a puzzling way, e.g. distorted shapes or sizes or colour?',
    '20) Do you ever find that your skin is more sensitive to touch, heat or cold than usual?',
    '21) Do you ever think that food or drink tastes much stronger than it normally would?',
    '22) Do you ever look in the mirror and think that your face seems different from usual?',
    '23) Do you ever have days where lights or colours seem brighter or more intense than usual?',
    '24) Do you ever have the feeling that of being uplifted, as if driving or rolling over a road while sitting quietly?',
    '25) Do you ever find that common smells sometimes seem unusually different?',
    '26) Do you ever think that everyday things look abnormal to you?',
    '27) Do you ever find that your experience of time changes dramatically?',
    '28) Have you ever heard two or more unexplained voices talking with each other?',
    '29) Do you ever notice smells or odours that people next to you seem unaware of?',
    '30) Do you ever notice that food or drink seems to have an unusual taste?',
    '31) Do you ever see things that other people cannot?',
    '32) Do you ever hear sounds or music that people near you don’t hear?',
  ];

  fields: FormlyFieldConfig[] = this.labels.map((label, index) => ({
    fieldGroup: [
      {
        className: 'row',
        key: `question-${index}`,
        type: 'radio',
        templateOptions: {
          label,
          required: true,
          options: [
            { value: 1, label: 'True' },
            { value: 0, label: 'False' },
          ],
        },
      },
      {
        className: 'row bg-light p-3',
        key: `subquestion-${index}a`,
        type: 'radio',
        templateOptions: {
          label: 'How distressing are these beliefs or experiences?',
          required: true,
          options: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ],
        },
        hideExpression: (model: any) => !model[`question-${index}`],
      },
      {
        className: 'row bg-light p-3',
        key: `subquestion-${index}b`,
        type: 'radio',
        templateOptions: {
          label: 'How often do you think about these beliefs or experiences?',
          required: true,
          options: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ],
        },
        hideExpression: (model: any) => !model[`question-${index}`],
      },
      {
        className: 'row bg-light p-3',
        key: `subquestion-${index}c`,
        type: 'radio',
        templateOptions: {
          label: 'How true you believe these beliefs or experiences to be?',
          required: true,
          options: [
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 3, label: '3' },
            { value: 4, label: '4' },
            { value: 5, label: '5' },
          ],
        },
        hideExpression: (model: any) => !model[`question-${index}`],
      },
    ],
  }));

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
