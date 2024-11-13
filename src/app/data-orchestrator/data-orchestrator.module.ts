import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { PortalCoreModule } from '@onecx/portal-integration-angular'
import { InitializeModuleGuard, addInitializeModuleGuard } from '@onecx/angular-integration-interface'
import { SharedModule } from '../shared/shared.module'
import { CrdSearchComponent } from './crd-search/crd-search.component'
import { CrdCriteriaComponent } from './crd-search/crd-criteria/crd-criteria.component'

const routes: Routes = [
  {
    path: '',
    component: CrdSearchComponent,
    pathMatch: 'full'
  }
]
@NgModule({
  declarations: [CrdSearchComponent, CrdCriteriaComponent],
  imports: [
    CommonModule,
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
