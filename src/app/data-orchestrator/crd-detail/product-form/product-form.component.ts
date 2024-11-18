import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceProduct } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public productCrd: CustomResourceProduct | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup
  public dateFormat: string
  public timeFormat: string
  constructor(
    private readonly user: UserService,
    private readonly fb: FormBuilder
  ) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.mm.yy' : 'mm/dd/yy'
    this.timeFormat = this.user.lang$.getValue() === 'de' ? '24' : '12'
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
