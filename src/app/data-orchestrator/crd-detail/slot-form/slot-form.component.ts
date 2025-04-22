import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourceSlot } from 'src/app/shared/generated'

import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-slot-form',
  templateUrl: './slot-form.component.html',
  styleUrls: ['./slot-form.component.scss']
})
export class SlotFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public slotCrd: CustomResourceSlot | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      metadataName: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      appId: new FormControl(null),
      description: new FormControl(null),
      specName: new FormControl(null),
      deprecated: new FormControl(null),
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
      ...this.slotCrd,
      ...this.slotCrd?.metadata,
      ...this.slotCrd?.spec,
      metadataName: this.slotCrd?.metadata?.name,
      specName: this.slotCrd?.spec?.name
    })
  }
}
