import { Component, Input, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results!: FormlyFieldConfig[];

  constructor() {}

  ngOnInit() {}

  shouldRender(result: FormlyFieldConfig) {
    return (
      result.key !== 'personal' &&
      result.formControl &&
      /* TODO: handle empty answers */
      result.formControl.touched
    )
  }

  isNotContainer(result: FormlyFieldConfig) {
    return (
      result.templateOptions &&
      result.templateOptions.label &&
      result.formControl &&
      /* TODO: handle empty answers */
      result.formControl.touched
    );
  }

  print() {
    window.print();
  }
}
