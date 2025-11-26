import { Component, EventEmitter, Input, OnChanges, Output, QueryList, ViewChildren } from '@angular/core'
import { catchError, finalize, map, Observable, of } from 'rxjs'

import { PortalMessageService, UserService } from '@onecx/angular-integration-interface'
import {
  ContextKind,
  CustomResourceData,
  CustomResourceDatabase,
  CustomResourceKeycloakClient,
  CustomResourceMicrofrontend,
  CustomResourceMicroservice,
  CustomResourceParameter,
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

import { ChangeMode } from '../crd-search/crd-search.component'
import { ParameterFormComponent } from './parameter-form/parameter-form.component'

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
  @Input() public changeMode: ChangeMode = 'VIEW'
  @Input() public displayDetailDialog = false
  @Input() public crdName: string | undefined = undefined
  @Input() public crdType: string | undefined = undefined
  @Output() public hideDialogAndChanged = new EventEmitter<boolean>()

  @ViewChildren(DataFormComponent, { read: DataFormComponent }) dataFormComponent:
    | QueryList<DataFormComponent>
    | undefined
  @ViewChildren(DatabaseFormComponent, { read: DatabaseFormComponent })
  databaseFormComponent!: QueryList<DatabaseFormComponent>
  @ViewChildren(ParameterFormComponent, { read: ParameterFormComponent })
  parameterFormComponent!: QueryList<ParameterFormComponent>
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

  // dialog
  public loading = false
  public exceptionKey: string | undefined = undefined
  public displayDateRangeError = false
  public datetimeFormat: string
  // data
  public crd$!: Observable<any>
  public updateHistory: Update[] = []

  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly msgService: PortalMessageService
  ) {
    this.datetimeFormat = this.user.lang$.getValue() === 'de' ? 'dd.MM.yyyy HH:mm:ss' : 'M/d/yyyy, hh:mm:ss a'
  }

  public ngOnChanges(): void {
    this.exceptionKey = undefined
    if (this.displayDetailDialog) this.getCrd()
  }

  public onDialogHide() {
    this.displayDetailDialog = false
    this.exceptionKey = undefined
    this.hideDialogAndChanged.emit(false)
  }

  private getCrd(): void {
    if (this.crdName && this.crdType) {
      this.loading = true
      this.exceptionKey = undefined
      this.crd$ = this.dataOrchestratorApi
        .getCrdByTypeAndName({ type: this.crdType as ContextKind, name: this.crdName })
        .pipe(
          map((response) => {
            const obj = response.crd
            this.updateHistory = this.prepareHistory(obj).reverse()
            return obj ?? {}
          }),
          catchError((err) => {
            this.exceptionKey = 'EXCEPTIONS.HTTP_STATUS_' + err.status + '.CRD'
            console.error('getCrdByTypeAndName', err)
            return of({} as any)
          }),
          finalize(() => (this.loading = false))
        )
    }
  }

  /**
   * This method extracts all past updates from the managedFields sub-object and groups them by date on top-level
   * and all updated fields by its parent-object name underneath.
   */
  public prepareHistory(item: any): Update[] {
    if (Object.keys(item).length === 0 || !item.metadata?.managedFields) return []

    const managedFields: ManagedField[] = item.metadata.managedFields
    const history: Update[] = managedFields.map((field) => {
      const fields: Record<string, string[]> = {}

      function extractFields(obj: Record<string, any>, prefix: string = '') {
        for (const key in obj) {
          if (key === '.') continue
          const newKey = prefix ? `${prefix}.${key}` : key
          if (Object.keys(obj[key]).length === 0) {
            const topLevelKey = newKey.split('.')[0].replaceAll(/f:/g, '')
            const fieldKey = newKey.split('.').slice(1).join('.').replaceAll(/f:/g, '')
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
      return { date: field.time, fields: fields, operation: field.operation }
    })
    return history
  }

  /**
   * SAVING
   */
  public onSave(): void {
    if (this.changeMode === 'EDIT' && this.crdName && this.crdType) {
      const formValuesOfChild = this.getFormValuesOfActiveChild()

      this.submitFormValues(formValuesOfChild).subscribe((crd) => {
        const editResourceRequest: EditResourceRequest = this.prepareUpdateData(this.crdType!, crd)

        this.dataOrchestratorApi.editCrd({ editResourceRequest }).subscribe({
          next: () => {
            this.msgService.success({ summaryKey: 'ACTIONS.EDIT.MESSAGE.OK' })
            this.hideDialogAndChanged.emit(true)
          },
          error: (err) => {
            this.msgService.error({ summaryKey: 'ACTIONS.EDIT.MESSAGE.NOK' })
            console.error('editCrd', err)
          }
        })
      })
    }
  }

  private submitFormValues(formValues: any): Observable<any> {
    return this.crd$.pipe(
      map((crd) => {
        if (crd) {
          return this.updateFields(crd, { ...formValues })
        }
      })
    )
  }

  private getFormValuesOfActiveChild(): any {
    switch (this.crdType) {
      case 'Data':
        return this.dataFormComponent?.first.formGroup.value
      case 'Database':
        return this.databaseFormComponent?.first.formGroup.value
      case 'KeycloakClient':
        return this.keycloakFormComponent?.first.formGroup.value
      case 'Microfrontend':
        return this.microfrontendFormComponent?.first.formGroup.value
      case 'Microservice':
        return this.microserviceFormComponent?.first.formGroup.value
      case 'Parameter':
        return this.parameterFormComponent?.first.formGroup.value
      case 'Permission':
        return this.permissionFormComponent?.first.formGroup.value
      case 'Product':
        return this.productFormComponent?.first.formGroup.value
      case 'Slot':
        return this.slotFormComponent?.first.formGroup.value
    }
  }
  private prepareUpdateData(type: string, crd: any): EditResourceRequest {
    let editResourceRequest: EditResourceRequest = {}
    if (type === ContextKind.Data) {
      editResourceRequest = { CrdData: crd as CustomResourceData }
    } else if (type === ContextKind.Database) {
      editResourceRequest = { CrdDatabase: crd as CustomResourceDatabase }
    } else if (type === ContextKind.Parameter) {
      editResourceRequest = { CrdParameter: crd as CustomResourceParameter }
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
        this.applyUpdateToBase(base, key, update[key])
      }
    }
    return base
  }

  private applyUpdateToBase(base: any, key: string, value: any): void {
    const contextMatch = /^(spec|metadata)([A-Z].*)$/.exec(key)
    if (contextMatch) {
      this.updateContextField(base, contextMatch, value)
    } else {
      this.updateDirectOrNestedField(base, key, value)
    }
  }

  private updateContextField(base: any, contextMatch: RegExpExecArray, value: any): void {
    const context = contextMatch[1]
    const field = contextMatch[2].charAt(0).toLowerCase() + contextMatch[2].slice(1)

    if (context === 'spec' && base.spec) {
      base.spec[field] = value
    } else if (context === 'metadata' && base.metadata) {
      base.metadata[field] = value
    }
  }

  private updateDirectOrNestedField(base: any, key: string, value: any): void {
    if (key in base) {
      base[key] = value
    } else if (base.spec && key in base.spec) {
      base.spec[key] = value
    } else if (base.metadata && key in base.metadata) {
      base.metadata[key] = value
    }
  }
}
