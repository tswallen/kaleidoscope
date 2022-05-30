import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { eachDeep, mapKeysDeep } from 'deepdash-es/standalone';
import { IIterateeContext } from 'deepdash-es/IIterateeContext';
import { clone, each, filter, find, findKey, flatMapDeep, has, indexOf, isArray, isEmpty, isObject, keys, mapKeys, mapValues, times } from 'lodash';
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
    this.results = mapKeysDeep(this.results, (value: any, key: string | number, parentValue: any, context: IIterateeContext) => {
      if (isObject(value)) {
        return key;
      }
      let f: any = clone(this.form);
      //console.log(context.path);
      each(context.path, (path) => {
        let f$ = find(f, { 'key': path });
        if (has(f$, 'fieldGroup')) {
          f = f$.fieldGroup;
        } else {
          key = f$.templateOptions.label;
        }
      });
      return key;
    }, { pathFormat: 'array'});
    console.log(this.results);
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
