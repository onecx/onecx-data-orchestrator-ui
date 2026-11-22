import { AbstractControl, FormArray, FormGroup } from '@angular/forms'
import { SelectItem } from 'primeng/api'

export type DropDownChangeEvent = MouseEvent & { value: any }

export class Utils {
  static mapping_error_status(status: number): number {
    return [400, 401, 403, 404, 500, 504].includes(status) ? status : 0
  }

  /**
   *  FORM
   */
  static forceFormValidation(form: AbstractControl): void {
    if (form instanceof FormGroup || form instanceof FormArray) {
      for (const inner in form.controls) {
        const control = form.get(inner)
        if (control) {
          Utils.forceFormValidation(control)
        }
      }
    } else {
      form.markAsDirty()
      form.markAsTouched()
      form.updateValueAndValidity()
    }
  }

  /**
   *  DROPDOWN
   */
  static dropDownSortItemsByLabel(a: SelectItem, b: SelectItem): number {
    return (a.label ? a.label.toUpperCase() : '').localeCompare(b.label ? b.label.toUpperCase() : '')
  }
  static dropDownGetLabelByValue(ddArray: SelectItem[], val: string): string | undefined {
    const a = ddArray.find((item: SelectItem) => {
      return item?.value == val
    })
    return a?.label
  }

  static limitText(text: string | undefined, limit: number): string {
    if (text) {
      return text.length < limit ? text : text.substring(0, limit) + '...'
    } else {
      return ''
    }
  }

  static copyToClipboard(text?: string): void {
    if (text) navigator.clipboard.writeText(text).catch((err) => console.error(err))
  }

  // display simple formatted text
  static convertLineBreaks(text?: string) {
    return text?.replaceAll(/(?:\r\n|\r|\n)/g, '<br/>') ?? ''
  }

  static asArray(value: string | string[] | null | undefined): string[] | undefined {
    if (value == null || value === '') {
      return undefined
    }

    return Array.isArray(value) ? value : [value]
  }

  static sortByLocale(a: string, b: string): number {
    return a.toUpperCase().localeCompare(b.toUpperCase())
  }
}
