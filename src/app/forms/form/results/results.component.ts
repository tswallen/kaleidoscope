import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormService } from '../../form.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results!: any;
  @Input() form!: FormlyFieldConfig[];

  ngOnInit() { }

  constructor(private route: ActivatedRoute, private formService: FormService) {
    this.getResults();
  }

  getResults(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const form = this.route.snapshot.paramMap.get('form')!;
    this.form = this.formService.getForm(form)?.fields!;
    this.formService.getResults(id).subscribe(results => {
      this.results = JSON.parse(results['data']);
      this.populateForm();
    });
  }

  populateForm() {
    this.form.forEach(field => {
      console.log(field.key);
      const value = this.findValue(field.key as string);
      console.log(value);
    })
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

  private findValue(key: string) {
    return this.results[key];
  }
}
