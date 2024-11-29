import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { SelectItem } from 'primeng/api'
import { Observable, map, of } from 'rxjs'

import { Action, UserService } from '@onecx/portal-integration-angular'
import { ContextKind, GetCustomResourcesByCriteriaRequestParams } from 'src/app/shared/generated'

export interface CrdCriteriaForm {
  name: FormControl<string | null>
  type: FormControl<ContextKind[] | null>
}

@Component({
  selector: 'app-crd-criteria',
  templateUrl: './crd-criteria.component.html',
  styleUrls: ['./crd-criteria.component.scss']
})
export class CrdCriteriaComponent implements OnInit {
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
    public readonly translate: TranslateService
  ) {
    this.dateFormatForRange = this.user.lang$.getValue() === 'de' ? 'dd.mm.yy' : 'm/d/yy'
  }

  ngOnInit(): void {
    this.crdCriteria = new FormGroup<CrdCriteriaForm>({
      name: new FormControl<string | null>(null),
      type: new FormControl<ContextKind[] | null>({ value: null, disabled: false }, { validators: Validators.required })
    })
    this.type$ = this.translate
      .get([
        'ENUMS.CRD_TYPE.' + ContextKind.Data,
        'ENUMS.CRD_TYPE.' + ContextKind.Database,
        'ENUMS.CRD_TYPE.' + ContextKind.KeycloakClient,
        'ENUMS.CRD_TYPE.' + ContextKind.Microfrontend,
        'ENUMS.CRD_TYPE.' + ContextKind.Microservice,
        'ENUMS.CRD_TYPE.' + ContextKind.Permission,
        'ENUMS.CRD_TYPE.' + ContextKind.Product,
        'ENUMS.CRD_TYPE.' + ContextKind.Slot
      ])
      .pipe(
        map((data) => {
          return [
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Data], value: ContextKind.Data },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Database], value: ContextKind.Database },
            {
              label: data['ENUMS.CRD_TYPE.' + ContextKind.KeycloakClient],
              value: ContextKind.KeycloakClient
            },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Microfrontend], value: ContextKind.Microfrontend },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Microservice], value: ContextKind.Microservice },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Permission], value: ContextKind.Permission },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Product], value: ContextKind.Product },
            { label: data['ENUMS.CRD_TYPE.' + ContextKind.Slot], value: ContextKind.Slot }
          ]
        })
      )
    this.crdCriteria.get('type')?.markAsDirty()
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
}
