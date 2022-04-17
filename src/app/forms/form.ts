import { FormlyFieldConfig } from "@ngx-formly/core";

export class Form {
  title!: string;
  route!: string;
  description!: string;
  time!: number;
  fields!: FormlyFieldConfig[];
  moreInfoLink!: string;
}