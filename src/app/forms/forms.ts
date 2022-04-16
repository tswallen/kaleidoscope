import { Form } from './form';
import { ToWords } from 'to-words';
import { FormlyFieldConfig } from '@ngx-formly/core/lib/core';

const toWords = new ToWords();

const personal: FormlyFieldConfig = {
  className: 'row bg-primary text-light p-3',
  key: 'personal',
  fieldGroup: [
    {
      className: 'section-label',
      template: '<div><strong>Personal information</strong></div>',
    },
    {
      className: 'section-description',
      template: '<div><p>This is not needed</p></div>',
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Email',
      },
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Age',
      },
    },
  ],
};

const feedbackConsent: FormlyFieldConfig = {
  className: 'row bg-primary text-light p-3',
  key: 'feedbackConsent',
  type: 'radio',
  templateOptions: {
    label:
      'Would you please be able to provide feedback on how helpful you found these questions to be?',
    required: true,
    options: [
      { value: true, label: 'Yes' },
      { value: false, label: 'No' },
    ],
  },
};

const feedbackQuestion: FormlyFieldConfig = {
  className: 'row bg-primary text-light p-3',
  key: 'feedback',
  fieldGroup: [
    {
      key: 'a',
      type: 'radio',
      templateOptions: {
        label: 'Was this question helpful?',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },
    },
    {
      key: 'b',
      type: 'radio',
      templateOptions: {
        label: 'How relevant was this question to you and your experiences?',
        options: [
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
          { value: 4, label: '4' },
          { value: 5, label: '5' },
        ],
      },
    },
    {
      key: 'c',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'If you could change this question, how would you do it?',
      },
    },
  ],
  /* Convert this to a hook */
  hideExpression: (model: any, formState: any, field: FormlyFieldConfig | undefined) => {
    return !field!.form!.parent!.get('feedbackConsent')!.value;
  },
};

export const forms: Form[] = [
  {
    title: 'Prodromal Questionnaire',
    time: 5,
    description:
      'A short and simple multiple-choice questionnaire about the nature of psychosis.',
    route: 'prodromal',
    fields: [
      personal,
      ...[
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
      ].map((label, index) => ({
        key: toWords.convert(index).replace(/ /g, '').toLowerCase(),
        fieldGroup: [
          {
            className: 'row',
            key: 'a',
            type: 'radio',
            templateOptions: {
              label,
              required: true,
              options: [
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ],
            },
          },
          {
            className: 'row bg-light p-3',
            key: 'b',
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
            hideExpression: '!model.a',
          },
          feedbackQuestion,
        ],
      })),
      feedbackConsent,
    ],
    moreInfoLink: '#',
  },
  {
    title: 'Questionnaire for Psychotic Experiences',
    time: 15,
    description:
      'A questionnaire focusing on understanding hallucinations such as visual and auditory as well as delusions.',
    route: 'qpe',
    fields: [
      {
        fieldGroup: [
          {
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
                  ],
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
                  options: [],
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
                  ],
                },
                hideExpression: (model: any) => {
                  return !model.A2;
                },
              },
            ],
          },
        ],
      },
    ],
    moreInfoLink: '#',
  },
  {
    title: 'Peters Delusions Inventory',
    time: 10,
    description:
      'Some simple yes and no questions with scales inquiring about thoughts and feelings during psychosis.',
    route: 'pdi',
    fields: [
      personal,
      ...[
        'Do you ever feel as if people seem to drop hints about you or say things with a double meaning?',
        'Do you ever feel as if things in magazines or on TV were written especially for you?',
        'Do you ever feel as if some people are not what they seem to be?',
        'Do you ever feel as if you are being persecuted in some way?',
        'Do you ever feel as if there is a conspiracy against you?',
        'Do you ever feel as if you are, ordestined to be someone very important?',
        'Do you ever feel that you are a very special or unusual person?',
        'Do you ever feel that you are especially close to God?',
        'Do you ever think people can communicate telepathically?',
        'Do you ever feel as if electrical devices such as computers can influence the way you think?',
        'Do you ever feel as if you have been chosen by God in some way?',
        'Do you believe in the power of witchcraft, voodoo or the occult?',
        'Are you often worried that your partner may be unfaithful?',
        'Do you ever feel that you have sinned more than the average person?',
        'Do you ever feel that people look at you oddly because of you rappearance?',
        'Do you ever feel as if you had no thoughts in your head at all?',
        'Do you ever feel as if the world is about to end?',
        'Do your thoughts ever feel alien to you in some way?',
        'Have your thoughts ever been so vivid that you were worried other people would hear them?',
        'Do you ever feel as if your own thoughts were being echoed back to you?',
        'Do you ever feel as if you are a robot or zombie without a will of your own?',
      ].map((label, index) => ({
        key: toWords.convert(index).replace(/ /g, '').toLowerCase(),
        fieldGroup: [
          {
            className: 'row',
            key: 'a',
            type: 'radio',
            templateOptions: {
              label,
              required: true,
              options: [
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ],
            },
          },
          {
            className: 'row bg-light p-3',
            key: 'b',
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
            hideExpression: '!model.a',
          },
          {
            className: 'row bg-light p-3',
            key: 'c',
            type: 'radio',
            templateOptions: {
              label:
                'How often do you think about these beliefs or experiences?',
              required: true,
              options: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ],
            },
            hideExpression: '!model.a',
          },
          {
            className: 'row bg-light p-3',
            key: 'd',
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
            hideExpression: '!model.a',
          },
          feedbackQuestion,
        ],
      })),
      feedbackConsent,
    ],
    moreInfoLink: '#',
  },
  {
    title: 'Cardiff Anomalous Perceptions Scale',
    time: 10,
    description:
      'Some simple yes and no questions with scales inquiring about common experiences with psychosis.',
    route: 'caps',
    fields: [
      personal,
      ...[
        'Do you ever notice that sounds are much louder than they normally would be?',
        'Do you ever sense the presence of another being, despite being unable to see any evidence?',
        'Do you ever hear your own thoughts repeated or echoed?',
        'Do you ever see shapes, lights or colours even though there is nothing really there?',
        'Do you ever experience unusual burning sensations or other strange feelings in or on your body?',
        'Do you ever hear noises or sounds when there is nothing about to explain them?',
        'Do you ever hear your own thoughts spoken aloud in your head, so that someone near might be able to hear them?',
        'Do you ever detect smells which don’t seem to come from your surroundings?',
        'Do you ever have the sensation that your body, or a part of it, is changing or has changed shape?',
        'Do you ever have the sensation that your limbs might not be your own or might not be properly connected to your body?',
        'Do you ever hear voices commenting on what you are thinking or doing?',
        'Do you ever feel that someone is touching you, but when you look nobody is there?',
        'Do you ever hear voices saying words or sentences when there is no-one around that might account for it?',
        'Do you ever experience unexplained tastes in your mouth?',
        'Do you ever find that sensations happen all at once and flood you with information?',
        'Do you ever find that sounds are distorted in strange or unusual ways?',
        'Do you ever have difficulty distinguishing one sensation from another?',
        'Do you ever smell everyday odours and think that they are unusually strong?',
        'Do you ever find the appearance of things or people seems to change in a puzzling way, e.g. distorted shapes or sizes or colour?',
        'Do you ever find that your skin is more sensitive to touch, heat or cold than usual?',
        'Do you ever think that food or drink tastes much stronger than it normally would?',
        'Do you ever look in the mirror and think that your face seems different from usual?',
        'Do you ever have days where lights or colours seem brighter or more intense than usual?',
        'Do you ever have the feeling that of being uplifted, as if driving or rolling over a road while sitting quietly?',
        'Do you ever find that common smells sometimes seem unusually different?',
        'Do you ever think that everyday things look abnormal to you?',
        'Do you ever find that your experience of time changes dramatically?',
        'Have you ever heard two or more unexplained voices talking with each other?',
        'Do you ever notice smells or odours that people next to you seem unaware of?',
        'Do you ever notice that food or drink seems to have an unusual taste?',
        'Do you ever see things that other people cannot?',
        'Do you ever hear sounds or music that people near you don’t hear?',
      ].map((label, index) => ({
        key: toWords.convert(index).replace(/ /g, '').toLowerCase(),
        fieldGroup: [
          {
            className: 'row',
            key: 'a',
            type: 'radio',
            templateOptions: {
              label,
              required: true,
              options: [
                { value: true, label: 'True' },
                { value: false, label: 'False' },
              ],
            },
          },
          {
            className: 'row bg-light p-3',
            key: 'b',
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
            hideExpression: '!model.a',
          },
          {
            className: 'row bg-light p-3',
            key: 'c',
            type: 'radio',
            templateOptions: {
              label:
                'How often do you think about these beliefs or experiences?',
              required: true,
              options: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ],
            },
            hideExpression: '!model.a',
          },
          {
            className: 'row bg-light p-3',
            key: 'd',
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
            hideExpression: '!model.a',
          },
          feedbackQuestion,
        ],
      })),
      feedbackConsent,
    ],
    moreInfoLink: '#',
  },
];
