import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { finalize } from 'rxjs'

import { PortalMessageService, UserService } from '@onecx/portal-integration-angular'
import { ContextKind, CustomResourceData, DataAPIService } from 'src/app/shared/generated'

@Component({
  selector: 'app-crd-detail',
  templateUrl: './crd-detail.component.html',
  styleUrls: ['./crd-detail.component.scss']
})
export class CrdDetailComponent implements OnChanges {
  @Input() public changeMode = 'VIEW'
  @Input() public displayDetailDialog = false
  @Input() public crdName: string | undefined
  @Output() public hideDialogAndChanged = new EventEmitter<boolean>()
  public dateFormat: string
  public timeFormat: string
  public isLoading = false
  public displayDateRangeError = false
  public dataCrd: CustomResourceData | undefined
  // form
  formGroup: FormGroup
  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly fb: FormBuilder,
    private readonly msgService: PortalMessageService
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
    this.displayDateRangeError = false
    this.getDataCrd()
    if (this.changeMode === 'VIEW') this.formGroup.disable()
    if (this.changeMode === 'EDIT') {
      this.formGroup.enable()
      this.formGroup.controls['apiVersion'].disable()
      this.formGroup.controls['name'].disable()
      this.formGroup.controls['kind'].disable()
    }
  }
  public onDialogHide() {
    this.displayDetailDialog = false
    this.changeMode = ''
    this.hideDialogAndChanged.emit(false)
  }
  /**
   * READING data
   */
  private getDataCrd(): void {
    if (this.crdName) {
      this.isLoading = true
      this.dataCrd = undefined
      this.dataOrchestratorApi
        .getCrdByTypeAndName({ type: ContextKind.Data, name: this.crdName })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (item) => {
            this.dataCrd = item.crd as CustomResourceData
            this.fillForm()
          },
          error: () => this.msgService.error({ summaryKey: 'ACTIONS.SEARCH.SEARCH_FAILED' })
        })
    }
  }
  private fillForm(): void {
    this.formGroup.patchValue({
      ...this.dataCrd,
      ...this.dataCrd?.metadata,
      ...this.dataCrd?.spec
    })
  }
  /**
   * SAVING
   */
  public onSave(): void {
    if (this.changeMode === 'EDIT' && this.crdName) {
      this.dataOrchestratorApi
        .editCrd({
          editResourceRequest: { CrdData: this.submitFormValues() as CustomResourceData }
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
  private submitFormValues(): any {
    if (this.dataCrd) {
      const dataCrd: CustomResourceData = this.updateFields(this.dataCrd, { ...this.formGroup.value })
      return dataCrd
    }
  }

  private updateFields(base: any, update: any): any {
    for (const key in update) {
      if (update.hasOwnProperty(key)) {
        if (typeof update[key] === 'object' && update[key] !== null && !Array.isArray(update[key])) {
          if (!base[key]) {
            base[key] = {}
          }
          this.updateFields(base[key], update[key])
        } else {
          if (key in base) {
            base[key] = update[key]
          } else {
            for (const nestedKey in base) {
              if (typeof base[nestedKey] === 'object' && base[nestedKey] !== null) {
                this.updateFields(base[nestedKey], { [key]: update[key] })
              }
            }
          }
        }
      }
    }
    return base
  }
}
