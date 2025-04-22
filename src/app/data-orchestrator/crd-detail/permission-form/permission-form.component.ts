import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourcePermission } from 'src/app/shared/generated'

import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public permissionCrd: CustomResourcePermission | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      metadataName: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      appId: new FormControl(null),
      description: new FormControl(null),
      productName: new FormControl(null)
    })
  }
  ngOnChanges() {
    this.fillForm()
    if (this.changeMode === 'VIEW') this.formGroup.disable()
    if (this.changeMode === 'EDIT') {
      this.formGroup.enable()
      this.formGroup.controls['metadataName'].disable()
      this.formGroup.controls['kind'].disable()
    }
  }

  private fillForm(): void {
    this.formGroup.patchValue({
      ...this.permissionCrd,
      ...this.permissionCrd?.metadata,
      ...this.permissionCrd?.spec,
      specName: this.permissionCrd?.spec?.name,
      metadataName: this.permissionCrd?.metadata?.name
    })
  }
}
