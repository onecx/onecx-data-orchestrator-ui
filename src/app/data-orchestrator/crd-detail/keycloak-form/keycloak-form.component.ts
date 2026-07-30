import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { CheckboxModule } from 'primeng/checkbox'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { TabsModule } from 'primeng/tabs'
import { TooltipModule } from 'primeng/tooltip'

import { CustomResourceKeycloakClient } from 'src/app/shared/generated'
import { Update } from '../crd-detail.component'
import { StatusTabComponent } from '../status-tab/status-tab.component'
import { UpdateHistoryComponent } from '../update-history/update-history.component'

@Component({
  selector: 'app-keycloak-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    StatusTabComponent,
    TranslateModule,
    TabsModule,
    UpdateHistoryComponent,
    TooltipModule,
    CheckboxModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './keycloak-form.component.html'
})
export class KeycloakFormComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public keycloakClientCrd: CustomResourceKeycloakClient | undefined
  @Input() public dateFormat: string | undefined
  @Input() public updateHistory: Update[] | undefined

  public formGroup: FormGroup

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl({ value: null, disabled: true }),
      kind: new FormControl({ value: null, disabled: true }),
      basePath: new FormControl(null),
      description: new FormControl(null),
      realm: new FormControl(null),
      type: new FormControl(null),
      bearerOnly: new FormControl(null),
      clientAuthenticatorType: new FormControl(null),
      clientId: new FormControl(null),
      directAccessGrantsEnabled: new FormControl(null),
      enabled: new FormControl(null),
      implicitFlowEnabled: new FormControl(null),
      protocol: new FormControl(null),
      publicClient: new FormControl(null),
      serviceAccountsEnabled: new FormControl(null),
      standardFlowEnabled: new FormControl(null)
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
      ...this.keycloakClientCrd,
      ...this.keycloakClientCrd?.metadata,
      ...this.keycloakClientCrd?.spec
    })
  }
}
