import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FloatLabelModule } from 'primeng/floatlabel'
import { TabViewModule } from 'primeng/tabview'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceDatabase } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

@Component({
  selector: 'app-database-form',
  imports: [
    StatusTabComponent,
    TranslateModule,
    TabViewModule,
    UpdateHistoryComponent,
    TooltipModule,
    ReactiveFormsModule,
    FloatLabelModule
  ],
  templateUrl: './database-form.component.html'
})
export class DatabaseFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public databaseCrd: CustomResourceDatabase | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public objectKeys = Object.keys
  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      metadataName: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      host: new FormControl(null),
      specName: new FormControl(null),
      schema: new FormControl(null),
      user: new FormControl(null),
      user_search_path: new FormControl(null)
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
      ...this.databaseCrd,
      ...this.databaseCrd?.metadata,
      ...this.databaseCrd?.spec,
      metadataName: this.databaseCrd?.metadata?.name,
      specName: this.databaseCrd?.spec?.name
    })
  }
}
