import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { MessageModule } from 'primeng/message'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceParameter } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

type Parameter = { name: string; displayName: string | undefined; value: string; description: string | undefined }
@Component({
  selector: 'app-parameter-form',
  imports: [
    TranslateModule,
    MessageModule,
    TabViewModule,
    StatusTabComponent,
    UpdateHistoryComponent,
    TooltipModule,
    ReactiveFormsModule
  ],
  templateUrl: './parameter-form.component.html'
})
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
