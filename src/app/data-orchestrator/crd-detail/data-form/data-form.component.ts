import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { TabViewModule } from 'primeng/tabview'
import { TextareaModule } from 'primeng/textarea'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceData } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { ChangeMode } from '../../crd-search/crd-search.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { TranslateModule } from '@ngx-translate/core'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

@Component({
  selector: 'app-data-form',
  imports: [
    StatusTabComponent,
    TranslateModule,
    TabViewModule,
    UpdateHistoryComponent,
    TooltipModule,
    TextareaModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './data-form.component.html'
})
export class DataFormComponent implements OnChanges {
  @Input() public changeMode: ChangeMode = 'VIEW'
  @Input() public dataCrd: CustomResourceData | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      kind: new FormControl({ value: null, disabled: true }),
      name: new FormControl({ value: null, disabled: true }),
      appId: new FormControl(null),
      description: new FormControl(null),
      key: new FormControl(null),
      orgId: new FormControl(null),
      productName: new FormControl(null),
      data: new FormControl(null)
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
      ...this.dataCrd,
      ...this.dataCrd?.metadata,
      ...this.dataCrd?.spec
    })
  }
}
