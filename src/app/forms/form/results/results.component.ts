import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { eachDeep } from 'deepdash-es/standalone';
import { IIterateeContext } from 'deepdash-es/IIterateeContext';
import { clone, each, filter, find, flatMapDeep, indexOf, isEmpty, isObject, keys, mapKeys, mapValues } from 'lodash';
import { FormService } from '../../form.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() results!: any;
  @Input() form!: FormlyFieldConfig[];
  path: String[] = [];

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
    // TODO: why is this running twice?
    eachDeep(this.results, (value, key, parentValue, context: IIterateeContext) => {
      if (!isObject(value)) {
        //console.log();
        //console.log('Found value!');
        //console.log(key, value, parentValue);
        //console.log(indexOf(keys(parentValue), key));
        //console.log(value);
        //console.log(context.path);
        eachDeep(this.form, (value, key, parentValue, ctx: IIterateeContext) => {
          //console.log(key, ctx.path);
        });
      }
    });
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
