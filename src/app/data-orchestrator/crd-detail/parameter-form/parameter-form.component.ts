import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourceParameter } from 'src/app/shared/generated'

import { Update } from '../crd-detail.component'

type Parameter = { name: string; displayName: string | undefined; value: string; description: string | undefined }
@Component({ selector: 'app-parameter-form', templateUrl: './parameter-form.component.html' })
export class ParameterFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public parameterCrd: CustomResourceParameter | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup
  public parameters: Parameter[] = []

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      productName: new FormControl(null),
      applicationId: new FormControl(null),
      key: new FormControl(null),
      orgId: new FormControl(null)
    })
  }

  ngOnChanges() {
    this.fillForm()
    if (this.changeMode === 'VIEW') this.formGroup.disable()
    if (this.changeMode === 'EDIT') {
      this.formGroup.enable()
      this.formGroup.controls['name'].disable()
      this.formGroup.controls['kind'].disable()
    }
  }

  private fillForm(): void {
    this.formGroup.patchValue({ ...this.parameterCrd, ...this.parameterCrd?.metadata, ...this.parameterCrd?.spec })

    // transfer parameter object to displayable table format
    if (this.parameterCrd?.spec?.parameters) {
      const permObj = this.parameterCrd?.spec?.parameters // important move
      Object.keys(this.parameterCrd?.spec?.parameters).forEach((res) => {
        this.parameters.push({
          name: res,
          displayName: permObj[res].displayName,
          value: permObj[res].value!,
          description: permObj[res].description
        })
      })
    }
  }
}
