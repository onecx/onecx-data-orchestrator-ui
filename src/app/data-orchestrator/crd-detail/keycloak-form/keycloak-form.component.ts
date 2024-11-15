import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceKeycloakClient } from 'src/app/shared/generated'

@Component({
  selector: 'app-keycloak-form',
  templateUrl: './keycloak-form.component.html',
  styleUrls: ['./keycloak-form.component.scss']
})
export class KeycloakFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public keycloakClientCrd: CustomResourceKeycloakClient | undefined

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
      name: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      basePath: new FormControl(null),
      description: new FormControl(null),
      passwordKey: new FormControl(null),
      passwordSecrets: new FormControl(null),
      realm: new FormControl(null),
      type: new FormControl(null),
      bearerOnly: new FormControl(null),
      clientAuthenticatorType: new FormControl(null),
      clientId: new FormControl(null),
      directAccessGrantsEnabled: new FormControl(null),
      enabled: new FormControl(null),
      implicitFlowEnabled: new FormControl(null),
      password: new FormControl(null),
      protocol: new FormControl(null),
      publicClient: new FormControl(null),
      serviceAccountsEnabled: new FormControl(null),
      standardFlowEnabled: new FormControl(null)
    })
  }
  //TODO:
  //attributes?: { [key: string]: string }
  //defaultClientScopes?: Array<string>
  // optionalClientScopes?: Array<string>
  //redirectUris?: Array<string>
  //webOrigins?: Array<string>

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
      ...this.keycloakClientCrd,
      ...this.keycloakClientCrd?.metadata,
      ...this.keycloakClientCrd?.spec
    })
  }
}
