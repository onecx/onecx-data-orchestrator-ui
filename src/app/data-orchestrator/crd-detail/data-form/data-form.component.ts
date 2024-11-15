import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceData } from 'src/app/shared/generated'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public dataCrd: CustomResourceData | undefined

  public formGroup: FormGroup
  public dateFormat: string
  public timeFormat: string
  constructor(
    private readonly user: UserService,
    private readonly fb: FormBuilder
  ) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.mm.yy' : 'mm/dd/yy'
    this.timeFormat = this.user.lang$.getValue() === 'de' ? '24' : '12'
    this.formGroup = fb.nonNullable.group({
      apiVersion: new FormControl({ value: null, disabled: true }),
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
      this.formGroup.controls['apiVersion'].disable()
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
