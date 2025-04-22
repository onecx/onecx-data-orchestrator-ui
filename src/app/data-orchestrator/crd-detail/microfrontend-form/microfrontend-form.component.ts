import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourceMicrofrontend } from 'src/app/shared/generated'

import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-microfrontend-form',
  templateUrl: './microfrontend-form.component.html',
  styleUrls: ['./microfrontend-form.component.scss']
})
export class MicrofrontendFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public microfrontendCrd: CustomResourceMicrofrontend | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      appId: new FormControl(null),
      appName: new FormControl(null),
      appVersion: new FormControl(null),
      contact: new FormControl(null),
      deprecated: new FormControl(null),
      description: new FormControl(null),
      exposedModule: new FormControl(null),
      iconName: new FormControl(null),
      note: new FormControl(null),
      productName: new FormControl(null),
      remoteBaseUrl: new FormControl(null),
      remoteEntry: new FormControl(null),
      remoteName: new FormControl(null),
      tagName: new FormControl(null),
      technology: new FormControl(null),
      type: new FormControl(null)
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
    this.formGroup.patchValue({
      ...this.microfrontendCrd,
      ...this.microfrontendCrd?.metadata,
      ...this.microfrontendCrd?.spec
    })
  }
}
