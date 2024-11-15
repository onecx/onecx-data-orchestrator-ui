import { Component, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { finalize } from 'rxjs'

import { PortalMessageService, UserService } from '@onecx/portal-integration-angular'
import {
  ContextKind,
  CustomResourceData,
  CustomResourceDatabase,
  CustomResourceKeycloakClient,
  CustomResourceMicrofrontend,
  CustomResourceMicroservice,
  CustomResourcePermission,
  CustomResourceProduct,
  CustomResourceSlot,
  DataAPIService,
  EditResourceRequest
} from 'src/app/shared/generated'
import { DataFormComponent } from './data-form/data-form.component'
import { DatabaseFormComponent } from './database-form/database-form.component'
import { ProductFormComponent } from './product-form/product-form.component'
import { PermissionFormComponent } from './permission-form/permission-form.component'
import { KeycloakFormComponent } from './keycloak-form/keycloak-form.component'
import { SlotFormComponent } from './slot-form/slot-form.component'
import { MicrofrontendFormComponent } from './microfrontend-form/microfrontend-form.component'
import { MicroserviceFormComponent } from './microservice-form/microservice-form.component'

@Component({
  selector: 'app-crd-detail',
  templateUrl: './crd-detail.component.html',
  styleUrls: ['./crd-detail.component.scss']
})
export class CrdDetailComponent implements OnChanges {
  @ViewChildren(DataFormComponent, { read: DataFormComponent }) dataFormComponent!: QueryList<DataFormComponent>
  @ViewChildren(DatabaseFormComponent, { read: DatabaseFormComponent })
  databaseFormComponent!: QueryList<DatabaseFormComponent>
  @ViewChildren(ProductFormComponent, { read: ProductFormComponent })
  productFormComponent!: QueryList<ProductFormComponent>
  @ViewChildren(PermissionFormComponent, { read: PermissionFormComponent })
  permissionFormComponent!: QueryList<PermissionFormComponent>
  @ViewChildren(KeycloakFormComponent, { read: KeycloakFormComponent })
  keycloakFormComponent!: QueryList<KeycloakFormComponent>
  @ViewChildren(SlotFormComponent, { read: SlotFormComponent }) slotFormComponent!: QueryList<SlotFormComponent>
  @ViewChildren(MicrofrontendFormComponent, { read: MicrofrontendFormComponent })
  microfrontendFormComponent!: QueryList<MicrofrontendFormComponent>
  @ViewChildren(MicroserviceFormComponent, { read: MicroserviceFormComponent })
  microserviceFormComponent!: QueryList<MicroserviceFormComponent>

  @Input() public changeMode = 'VIEW'
  @Input() public displayDetailDialog = false
  @Input() public crdName: string | undefined = ''
  @Input() public crdType: string | undefined = ''
  @Output() public hideDialogAndChanged = new EventEmitter<boolean>()
  public isLoading = false
  public displayDateRangeError = false
  public crd: any

  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly fb: FormBuilder,
    private readonly msgService: PortalMessageService
  ) {}
  ngOnChanges(): void {
    this.getCrd()
  }
  public onDialogHide() {
    this.displayDetailDialog = false
    this.changeMode = ''
    this.hideDialogAndChanged.emit(false)
  }

  private getCrd(): void {
    if (this.crdName && this.crdType) {
      this.isLoading = true
      this.crd = undefined
      this.dataOrchestratorApi
        .getCrdByTypeAndName({ type: this.crdType as ContextKind, name: this.crdName })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (item) => {
            this.crd = item.crd
          },
          error: () => this.msgService.error({ summaryKey: 'ACTIONS.SEARCH.SEARCH_FAILED' })
        })
    }
  }

  /**
   * SAVING
   */
  public onSave(): void {
    if (this.changeMode === 'EDIT' && this.crdName && this.crdType) {
      const formValuesOfChild = this.getFormValuesOfActiveChild()
      const editResourceRequest: EditResourceRequest = this.prepareUpdateData(
        this.crdType,
        this.submitFormValues(formValuesOfChild)
      )
      this.dataOrchestratorApi
        .editCrd({
          editResourceRequest
        })
        .subscribe({
          next: () => {
            this.msgService.success({ summaryKey: 'ACTIONS.EDIT.MESSAGE.OK' })
            this.hideDialogAndChanged.emit(true)
          },
          error: () => this.msgService.error({ summaryKey: 'ACTIONS.EDIT.MESSAGE.NOK' })
        })
    }
  }
  private getFormValuesOfActiveChild(): any {
    if (this.crdType === 'Data' && this.dataFormComponent) {
      return this.dataFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Database' && this.databaseFormComponent) {
      return this.databaseFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Product' && this.productFormComponent) {
      return this.productFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Permission' && this.permissionFormComponent) {
      return this.permissionFormComponent.first.formGroup.value
    }
    if (this.crdType === 'KeycloakClient' && this.keycloakFormComponent) {
      return this.keycloakFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Slot' && this.slotFormComponent) {
      return this.slotFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Microfrontend' && this.microfrontendFormComponent) {
      return this.microfrontendFormComponent.first.formGroup.value
    }
    if (this.crdType === 'Microservice' && this.microserviceFormComponent) {
      return this.microserviceFormComponent.first.formGroup.value
    }
  }
  private prepareUpdateData(type: string, crd: any): EditResourceRequest {
    let editResourceRequest: EditResourceRequest = {}
    if (type === ContextKind.Data) {
      editResourceRequest = { CrdData: crd as CustomResourceData }
    } else if (type === ContextKind.Database) {
      editResourceRequest = { CrdDatabase: crd as CustomResourceDatabase }
    } else if (type === ContextKind.Product) {
      editResourceRequest = { CrdProduct: crd as CustomResourceProduct }
    } else if (type === ContextKind.Permission) {
      editResourceRequest = { CrdPermission: crd as CustomResourcePermission }
    } else if (type === ContextKind.KeycloakClient) {
      editResourceRequest = { CrdKeycloakClient: crd as CustomResourceKeycloakClient }
    } else if (type === ContextKind.Slot) {
      editResourceRequest = { CrdSlot: crd as CustomResourceSlot }
    } else if (type === ContextKind.Microfrontend) {
      editResourceRequest = { CrdMicrofrontend: crd as CustomResourceMicrofrontend }
    } else if (type === ContextKind.Microservice) {
      editResourceRequest = { CrdMicroservice: crd as CustomResourceMicroservice }
    }
    return editResourceRequest
  }

  private submitFormValues(formValues: any): any {
    if (this.crd) {
      const crd: any = this.updateFields(this.crd, { ...formValues })
      return crd
    }
  }

  private updateFields(base: any, update: { [key: string]: any }): any {
    for (const key in update) {
      if (update.hasOwnProperty(key)) {
        const contextMatch = key.match(/^(spec|metadata)([A-Z].*)$/)
        if (contextMatch) {
          const context = contextMatch[1]
          const field = contextMatch[2].charAt(0).toLowerCase() + contextMatch[2].slice(1)

          if (context === 'spec' && base.spec) {
            ;(base.spec as any)[field] = update[key]
          } else if (context === 'metadata' && base.metadata) {
            ;(base.metadata as any)[field] = update[key]
          }
        } else {
          if (key in base) {
            ;(base as any)[key] = update[key]
          } else if (base.spec && key in base.spec) {
            ;(base.spec as any)[key] = update[key]
          } else if (base.metadata && key in base.metadata) {
            ;(base.metadata as any)[key] = update[key]
          }
        }
      }
    }
    return base
  }
}
