import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { PortalCoreModule } from '@onecx/portal-integration-angular'
import { InitializeModuleGuard, addInitializeModuleGuard } from '@onecx/angular-integration-interface'
import { SharedModule } from '../shared/shared.module'
import { CrdSearchComponent } from './crd-search/crd-search.component'
import { CrdCriteriaComponent } from './crd-search/crd-criteria/crd-criteria.component'
import { CrdDetailComponent } from './crd-detail/crd-detail.component'
import { DataFormComponent } from './crd-detail/data-form/data-form.component'
import { DatabaseFormComponent } from './crd-detail/database-form/database-form.component'
import { ProductFormComponent } from './crd-detail/product-form/product-form.component'
import { PermissionFormComponent } from './crd-detail/permission-form/permission-form.component'
import { KeycloakFormComponent } from './crd-detail/keycloak-form/keycloak-form.component'
import { MicrofrontendFormComponent } from './crd-detail/microfrontend-form/microfrontend-form.component'
import { MicroserviceFormComponent } from './crd-detail/microservice-form/microservice-form.component'
import { SlotFormComponent } from './crd-detail/slot-form/slot-form.component'
import { TabViewModule } from 'primeng/tabview'
import { CheckboxModule } from 'primeng/checkbox'
import { UpdateHistoryComponent } from './crd-detail/update-history/update-history.component'

const routes: Routes = [
  {
    path: '',
    component: CrdSearchComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [
    CrdSearchComponent,
    CrdCriteriaComponent,
    CrdDetailComponent,
    DataFormComponent,
    DatabaseFormComponent,
    ProductFormComponent,
    SlotFormComponent,
    PermissionFormComponent,
    KeycloakFormComponent,
    MicrofrontendFormComponent,
    MicroserviceFormComponent,
    UpdateHistoryComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,
    CheckboxModule,
    FormsModule,
    PortalCoreModule.forMicroFrontend(),
    [RouterModule.forChild(addInitializeModuleGuard(routes))],
    SharedModule
  ],
  providers: [InitializeModuleGuard],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class DataOrchestratorModule {
  constructor() {
    console.info('Data Orchestrator Module constructor')
  }
}
