import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceMicroservice } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

@Component({
  selector: 'app-microservice-form',
  imports: [
    StatusTabComponent,
    TranslateModule,
    TabViewModule,
    UpdateHistoryComponent,
    TooltipModule,
    ReactiveFormsModule,
    FloatLabelModule
  ],
  templateUrl: './microservice-form.component.html'
})
export class MicroserviceFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public microserviceCrd: CustomResourceMicroservice | undefined
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
      version: new FormControl(null),
      productName: new FormControl(null),
      type: new FormControl(null)
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
      ...this.microserviceCrd,
      ...this.microserviceCrd?.metadata,
      ...this.microserviceCrd?.spec,
      metadataName: this.microserviceCrd?.metadata?.name,
      specName: this.microserviceCrd?.spec?.name
    })
  }
}
