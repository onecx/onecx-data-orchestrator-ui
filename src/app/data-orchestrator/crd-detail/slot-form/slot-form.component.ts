import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { CheckboxModule } from 'primeng/checkbox'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceSlot } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

@Component({
  selector: 'app-slot-form',
  imports: [
    TranslateModule,
    TabViewModule,
    UpdateHistoryComponent,
    StatusTabComponent,
    TooltipModule,
    ReactiveFormsModule,
    CheckboxModule
  ],
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
