import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
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
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup
  public dateFormat: string
  public timeFormat: string
  constructor(private readonly user: UserService) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.mm.yy' : 'mm/dd/yy'
    this.timeFormat = this.user.lang$.getValue() === 'de' ? '24' : '12'
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
