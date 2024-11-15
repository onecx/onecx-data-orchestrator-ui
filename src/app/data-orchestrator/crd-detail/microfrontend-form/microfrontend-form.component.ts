import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceMicrofrontend } from 'src/app/shared/generated'

@Component({
  selector: 'app-microfrontend-form',
  templateUrl: './microfrontend-form.component.html',
  styleUrls: ['./microfrontend-form.component.scss']
})
export class MicrofrontendFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public microfrontendCrd: CustomResourceMicrofrontend | undefined

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
      appName: new FormControl(null),
      appVersion: new FormControl(null),
      contact: new FormControl(null),
      deprecated: new FormControl(null),
      description: new FormControl(null),
      exposedModule: new FormControl(null),
      iconName: new FormControl(null),
      note: new FormControl(null),
      productName: new FormControl(null),
      remoteBaseUrl: new FormControl(null),
      remoteEntry: new FormControl(null),
      remoteName: new FormControl(null),
      tagName: new FormControl(null),
      technology: new FormControl(null),
      type: new FormControl(null)
    })
  }
  //TODO:
  //classifications?: Array<string>
  //endpoints?: Array<CustomResourceMicrofrontendSpecEndpointsInner>

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
      ...this.microfrontendCrd,
      ...this.microfrontendCrd?.metadata,
      ...this.microfrontendCrd?.spec
    })
  }
}
