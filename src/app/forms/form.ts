import { FormlyFieldConfig } from "@ngx-formly/core/lib/core";

export class Form {
  title: string;
  route: string;
  description: string;
  time: number;
  fields: FormlyFieldConfig[];
  moreInfoLink: string;
}