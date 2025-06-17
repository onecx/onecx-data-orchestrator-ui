import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { Observable, map, of } from 'rxjs'
import { SelectItem } from 'primeng/api'

import { UserService } from '@onecx/angular-integration-interface'
import { Action } from '@onecx/angular-accelerator'

import {
  ContextKind,
  DataAPIService,
  GetContextKindsResponse,
  GetCustomResourcesByCriteriaRequestParams
} from 'src/app/shared/generated'

export interface CrdCriteriaForm {
  name: FormControl<string | null>
  type: FormControl<ContextKind[] | null>
}

@Component({
  selector: 'app-crd-criteria',
  templateUrl: './crd-criteria.component.html',
  styleUrls: ['./crd-criteria.component.scss']
})
export class CrdCriteriaComponent {
  @Input() public actions: Action[] = []
  @Output() public criteriaEmitter = new EventEmitter<GetCustomResourcesByCriteriaRequestParams>()
  @Output() public resetSearchEmitter = new EventEmitter<boolean>()

  public displayCreateDialog = false
  public crdCriteria!: FormGroup<CrdCriteriaForm>
  public dateFormatForRange: string
  public filteredTitles = []
  public type$: Observable<SelectItem[]> = of([])
  public statusOptions$: Observable<SelectItem[]> = of([])
  public priorityType$: Observable<SelectItem[]> = of([])

  constructor(
    private readonly user: UserService,
    public readonly translate: TranslateService,
    private readonly dataOrchestratorApi: DataAPIService
  ) {
    this.dateFormatForRange = this.user.lang$.getValue() === 'de' ? 'dd.mm.yy' : 'm/d/yy'
    this.crdCriteria = new FormGroup<CrdCriteriaForm>({
      name: new FormControl<string | null>(null),
      type: new FormControl<ContextKind[] | null>({ value: null, disabled: false }, { validators: Validators.required })
    })
    this.fillTypes()
  }

  public submitCriteria(): void {
    const criteriaRequest: GetCustomResourcesByCriteriaRequestParams = {
      crdSearchCriteria: {
        name: this.crdCriteria.value.name === null ? undefined : this.crdCriteria.value.name,
        type: this.crdCriteria.value.type === null ? undefined : this.crdCriteria.value.type
      }
    }
    this.criteriaEmitter.emit(criteriaRequest)
  }

  public resetCriteria(): void {
    this.crdCriteria.reset()
    this.resetSearchEmitter.emit(true)
  }

  private fillTypes(): void {
    this.dataOrchestratorApi.getActiveCrdKinds().subscribe((response: GetContextKindsResponse) => {
      const kinds = response.kinds ?? []
      this.type$ = this.translate.get(kinds.map((kind) => 'ENUMS.CRD_TYPE.' + kind)).pipe(
        map((data) => {
          return kinds
            .map((kind) => ({
              label: data['ENUMS.CRD_TYPE.' + kind],
              value: kind
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
        })
      )
      this.crdCriteria.get('type')?.markAsDirty()
    })
  }
}
