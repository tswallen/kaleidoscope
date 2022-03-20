import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};

  labels: string[] = [
    'I feel uninterested in the things I used to enjoy.',
    'I often seem to live through events exactly as they happened before (déjà vu).',
    "I sometimes smell or taste things that other people can't smell or taste.",
    'I often hear unusual sounds like banging, clicking, hissing, clapping or ringing in my ears.',
    'I have been confused at times whether something I experienced was real or imaginary.',
    'When I look at a person, or look at myself in a mirror, I have seen the face change right before my eyes.',
    'I get extremely anxious when meeting people for the first time.',
    "I have seen things that other people apparently can't see.",
    'My thoughts are sometimes so strong that I can almost hear them.',
    'I sometimes see special meanings in advertisements, shop windows, or in the way things are arranged around me.',
    'Sometimes I have felt that I’m not in control of my own ideas or thoughts.',
    'Sometimes I feel suddenly distracted by distant sounds that I am not normally aware of.',
    "I have heard things other people can't hear like voices of people whispering or talking.",
    'I often feel that others have it in for me.',
    'I have had the sense that some person or force is around me, even though I could not see anyone.',
    'I feel that parts of my body have changed in some way, or that parts of my body are working differently than before.',
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
        key: `subquestion-${index}`,
        type: 'radio',
        templateOptions: {
          label: 'How much distress did you experience?',
          required: true,
          options: [
            { value: 0, label: 'None' },
            { value: 1, label: 'Mild' },
            { value: 2, label: 'Moderate' },
            { value: 3, label: 'Severe' },
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
