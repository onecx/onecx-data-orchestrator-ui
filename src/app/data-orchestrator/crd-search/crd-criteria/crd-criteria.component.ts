import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { catchError, map, Observable, of, switchMap } from 'rxjs'
import { SelectItem } from 'primeng/api'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { TooltipModule } from 'primeng/tooltip'

import { UserService } from '@onecx/angular-integration-interface'
import { Action, AngularAcceleratorModule } from '@onecx/angular-accelerator'

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    TranslateModule,
    TooltipModule,
    AngularAcceleratorModule,
    ReactiveFormsModule,
    MultiSelectModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './crd-criteria.component.html',
  styleUrls: ['./crd-criteria.component.scss']
})
export class CrdCriteriaComponent implements OnChanges {
  @Input() public actions: Action[] = []
  @Input() public criteria: GetCustomResourcesByCriteriaRequestParams = {}
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['criteria']) {
      this.applyCriteriaToForm()
    }
  }

  private applyCriteriaToForm(): void {
    this.crdCriteria.patchValue(
      {
        name: this.criteria.crdSearchCriteria?.name ?? null,
        type: this.criteria.crdSearchCriteria?.type ?? null
      },
      { emitEvent: false }
    )
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
    this.type$ = this.dataOrchestratorApi.getActiveCrdKinds().pipe(
      map((response: GetContextKindsResponse) => response.kinds ?? []),
      switchMap((kinds) => {
        if (kinds.length === 0) {
          return of([])
        }

        return this.translate.get(kinds.map((kind) => 'ENUMS.CRD_TYPE.' + kind)).pipe(
          map((data) => {
            return kinds
              .map((kind) => ({
                label: data['ENUMS.CRD_TYPE.' + kind],
                value: kind
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
          })
        )
      }),
      catchError(() => of([]))
    )
  }
}
