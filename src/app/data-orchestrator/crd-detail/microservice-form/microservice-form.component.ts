import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceMicroservice } from 'src/app/shared/generated'

@Component({
  selector: 'app-microservice-form',
  templateUrl: './microservice-form.component.html',
  styleUrls: ['./microservice-form.component.scss']
})
export class MicroserviceFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public microserviceCrd: CustomResourceMicroservice | undefined

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
      this.formGroup.controls['apiVersion'].disable()
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
