import { Component, Input, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { EMPTY, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results!: FormlyFieldConfig[];

  ngOnInit() {}

  constructor() {
  }

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
