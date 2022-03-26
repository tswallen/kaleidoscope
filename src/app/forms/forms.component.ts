import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  forms = [
    {
      title: 'Prodromal Questionnaire',
      time: 5,
      description:
        'A short and simple multiple-choice questionnaire about the nature of psychosis.',
      link: 'prodromal',
      moreInfoLink: '#',
    },
    {
      title: 'QPE',
      time: 15,
      description: 'Lorem Ipsum',
      link: 'qpe',
      moreInfoLink: '#',
    },
    {
      title: 'PDI',
      time: 15,
      description: 'Lorem Ipsum',
      link: 'pdi',
      moreInfoLink: '#',
    },
    {
      title: 'CAPS',
      time: 15,
      description: 'Lorem Ipsum',
      link: 'caps',
      moreInfoLink: '#',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
