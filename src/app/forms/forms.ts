import { Form } from './form';

export const forms: Form[] = [
  {
    title: 'Prodromal Questionnaire',
    time: 5,
    description:
      'A short and simple multiple-choice questionnaire about the nature of psychosis.',
    route: 'prodromal',
    fields: [
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
    })),
    moreInfoLink: '#',
  },
  {
    title: 'QPE',
    time: 15,
    description: 'Lorem Ipsum',
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
    title: 'PDI',
    time: 15,
    description: 'Lorem Ipsum',
    route: 'pdi',
    fields: [
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
    })),
    moreInfoLink: '#',
  },
  {
    title: 'CAPS',
    time: 15,
    description: 'Lorem Ipsum',
    route: 'caps',
    fields: [
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
    ].map((label, index) => ({
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
    })),
    moreInfoLink: '#',
  },
];
