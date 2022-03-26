import { FormlyFieldConfig } from "@ngx-formly/core/lib/core";

const labels: string[] = [
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
];

export const pdi: FormlyFieldConfig[] = labels.map((label, index) => ({
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