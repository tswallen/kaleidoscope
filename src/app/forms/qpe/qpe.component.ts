import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyFormOptions } from '@ngx-formly/core/lib/core';

@Component({
  selector: 'app-qpe',
  templateUrl: './qpe.component.html',
  styleUrls: ['./qpe.component.css'],
})
export class QpeComponent {
  form = new FormGroup({});
  model = {};
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [    {
        className: 'section-label',
        template:
          '<div><strong>Part A.  Auditory Hallucinations</strong></div>',
      },
      {
        fieldGroup: [
          {
            className: 'row',
            key: 'A1',
            type: 'radio',
            templateOptions: {
              label:
                'A1. Over the past 7 days, have you heard voices, music or other sounds when there was no clear explanation for them? Or when no one else could hear them?',
              required: true,
              options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ],
            },
          },
          {
            className: 'row',
            key: 'A1a',
            type: 'radio',
            templateOptions: {
              label:
                'A1(a). How often have you heard these voices and/or other sounds? For example, have you heard them every day, about once a day, every hour of the day, almost continuously?',
              required: true,
              options: [
                { value: 0, label: 'Not present during the last month' },
                {
                  value: 1,
                  label:
                    'Present during the last month, but less than once a week',
                },
                { value: 2, label: 'At least once a week' },
                { value: 3, label: 'At least once a day' },
                { value: 4, label: 'At least once every hour' },
                { value: 5, label: '(Almost) continuously' },
              ],
            },
            hideExpression: (model: any) => {
              return model.A1 !== true;
            },
          },
          {
            className: 'row',
            key: 'A1b',
            type: 'radio',
            templateOptions: {
              label:
                'A1(b). Have you ever had this type of experience? How often? Have you had this experience in the last month? NOTE: MAYBE THIS ANSWER TAKES YOU TO v1?',
              required: true,
              options: [
                { value: 0, label: 'Not present during the last month' },
                {
                  value: 1,
                  label:
                    'Present during the last month, but less than once a week',
                },
                { value: 2, label: 'At least once a week' },
                { value: 3, label: 'At least once a day' },
                { value: 4, label: 'At least once every hour' },
                { value: 5, label: '(Almost) continuously' },
              ],
            },
            hideExpression: (model: any) => {
              return model.A1 !== false;
            },
          },
          
        ],
      },
      {
        fieldGroup: [
          {
            className: 'row',
            key: 'A2',
            type: 'textarea',
            templateOptions: {
              label:
                'A2. What types of things do you hear? If you feel comfortable, could you give an example?',
            },
            hideExpression: (model: any) => {
              return model.A1 !== true;
            },
          },
          {
            className: 'row',
            key: 'A2a',
            type: 'radio',
            templateOptions: {
              label:
                'A2(a).Does this relate to an unpleasant event from your past?',
              options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]
            },
            hideExpression: (model: any) => {
              return !model.A2;
            },
          },
        ],
      },
      {
        fieldGroup: [
          {
            className: 'row',
            key: 'A3',
            type: 'radio',
            templateOptions: {
              label:
                'A3. In the last week, when you’ve heard the voices/sounds, for how long do they typically last?',
                required: true,
                options: [
                ]
            },
            hideExpression: (model: any) => {
              return model.A1 !== true;
            },
          },
          {
            className: 'row',
            key: 'A2a',
            type: 'radio',
            templateOptions: {
              label:
                'A2(a).Does this relate to an unpleasant event from your past?',
              options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' },
              ]
            },
            hideExpression: (model: any) => {
              return !model.A2;
            },
          },
        ],
      },
    
    ]
    },

  ];

  onSubmit() {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
