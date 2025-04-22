import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourceDatabase } from 'src/app/shared/generated'

import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss']
})
export class DatabaseFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public databaseCrd: CustomResourceDatabase | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined
  objectKeys = Object.keys

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
