import { Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { CustomResourceProduct } from 'src/app/shared/generated'

import { ChangeMode } from '../../crd-search/crd-search.component'
import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnChanges {
  @Input() public changeMode: ChangeMode = 'VIEW'
  @Input() public productCrd: CustomResourceProduct | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      metadataName: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      basePath: new FormControl(null),
      description: new FormControl(null),
      displayName: new FormControl(null),
      iconName: new FormControl(null),
      imageUrl: new FormControl(null),
      specName: new FormControl(null),
      provider: new FormControl(null),
      version: new FormControl(null)
    })
  }

  ngOnChanges() {
    this.fillForm()
    if (this.changeMode === 'VIEW') this.formGroup.disable()
    if (this.changeMode === 'EDIT') {
      this.formGroup.enable()
      this.formGroup.controls['metadataName'].disable()
      this.formGroup.controls['kind'].disable()
      this.formGroup.controls['version'].disable()
    }
  }

  private fillForm(): void {
    this.formGroup.patchValue({
      ...this.productCrd,
      ...this.productCrd?.metadata,
      ...this.productCrd?.spec,
      metadataName: this.productCrd?.metadata?.name,
      specName: this.productCrd?.spec?.name
    })
  }
}
