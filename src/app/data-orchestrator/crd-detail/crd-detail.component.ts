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

interface ManagedField {
  apiVersion: string
  fieldsType: string
  fieldsV1: Record<string, any>
  manager: string
  operation: string
  time: string
  subresource?: string
}

export interface Update {
  date: string
  fields: Record<string, string[]>
  operation: string
}

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
  public updateHistory: Update[] = []

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
            this.updateHistory = this.prepareHistory().reverse()
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

  /**
   *
   * @param base generic custom resource which we want to update
   * @param update form values of one of the sub-form-components which changes should be applied to the base custom resource
   * this function iterates through a custom resource object and finds all matching keys of the submitted
   * form values to update those field in the initial base object.
   *
   * When adding a prefix to a form field e.g. "spec" as "specName", this method will exclusivly search the key "name" inside
   * of the nested "spec" object. This is helpful if the initial custom resource objects contains a key multiple times in
   * different sub-objects.
   */
  private updateFields(base: any, update: { [key: string]: any }): any {
    for (const key in update) {
      if (update.hasOwnProperty(key)) {
        const contextMatch = /^(spec|metadata)([A-Z].*)$/.exec(key)
        if (contextMatch) {
          const context = contextMatch[1]
          const field = contextMatch[2].charAt(0).toLowerCase() + contextMatch[2].slice(1)

          if (context === 'spec' && base.spec) {
            base.spec[field] = update[key]
          } else if (context === 'metadata' && base.metadata) {
            base.metadata[field] = update[key]
          }
        } else if (key in base) {
          base[key] = update[key]
        } else if (base.spec && key in base.spec) {
          base.spec[key] = update[key]
        } else if (base.metadata && key in base.metadata) {
          base.metadata[key] = update[key]
        }
      }
    }
    return base
  }

  /**
   * This method extracts all past updates from the managedFields sub-object and groups them by date on top-level
   * and all updated fields by its parent-object name underneath.
   */
  prepareHistory(): Update[] {
    const managedFields: ManagedField[] = this.crd.metadata.managedFields
    return managedFields.map((field) => {
      const fields: Record<string, string[]> = {}

      function extractFields(obj: Record<string, any>, prefix: string = '') {
        for (const key in obj) {
          if (key === '.') continue
          const newKey = prefix ? `${prefix}.${key}` : key
          if (Object.keys(obj[key]).length === 0) {
            const topLevelKey = newKey.split('.')[0].replace(/f:/g, '')
            const fieldKey = newKey.split('.').slice(1).join('.').replace(/f:/g, '')
            if (!fields[topLevelKey]) {
              fields[topLevelKey] = []
            }
            fields[topLevelKey].push(fieldKey)
          } else {
            extractFields(obj[key], newKey)
          }
        }
      }

      extractFields(field.fieldsV1)
      return {
        date: field.time,
        fields: fields,
        operation: field.operation
      }
    })
  }
}
