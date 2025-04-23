import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs'
import { PrimeIcons, SelectItem } from 'primeng/api'

import {
  Action,
  ColumnType,
  DataAction,
  DataTableColumn,
  DiagramColumn,
  PortalMessageService,
  RowListGridData,
  UserService
} from '@onecx/portal-integration-angular'

import {
  CrdResponse,
  DataAPIService,
  GenericCrd,
  GenericCrdStatusEnum,
  GetCustomResourcesByCriteriaRequestParams
} from 'src/app/shared/generated'

export type ChangeMode = 'VIEW' | 'NEW' | 'EDIT'
type allCriteriaLists = { products: SelectItem[]; workspaces: SelectItem[] }

@Component({
  selector: 'app-crd-search',
  templateUrl: './crd-search.component.html',
  styleUrls: ['./crd-search.component.scss']
})
export class CrdSearchComponent implements OnInit {
  // dialog
  public loading = false
  public exceptionKey: string | undefined = undefined
  public changeMode: ChangeMode = 'VIEW'
  public actions$: Observable<Action[]> | undefined
  public additionalActions!: DataAction[]
  public displayDeleteDialog = false
  public displayDetailDialog = false
  public dateFormat: string
  public allCriteriaLists$: Observable<allCriteriaLists> | undefined
  public allItem: SelectItem | undefined
  private filterData = ''

  public crd: GenericCrd | undefined
  public crds$!: Observable<GenericCrd[]>
  public allMetaData$!: Observable<string>
  public filteredData$ = new BehaviorSubject<RowListGridData[]>([])
  public resultData$ = new BehaviorSubject<RowListGridData[]>([])
  public diagramColumn: DiagramColumn = { columnType: ColumnType.STRING, id: 'status' }
  public chartVisible = false

  public columns: DataTableColumn[] = [
    {
      id: 'status',
      nameKey: 'CRD.STATUS',
      columnType: ColumnType.STRING,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true,
      filterable: true
    },
    {
      id: 'name',
      nameKey: 'CRD.NAME',
      columnType: ColumnType.STRING,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    },
    {
      id: 'kind',
      nameKey: 'CRD.TYPE',
      columnType: ColumnType.STRING,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true,
      filterable: true
    },
    {
      id: 'version',
      nameKey: 'CRD.VERSION',
      columnType: ColumnType.STRING,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    },
    {
      id: 'lastModified',
      nameKey: 'INTERNAL.MODIFICATION_DATE',
      columnType: ColumnType.DATE,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    },
    {
      id: 'creationTimestamp',
      nameKey: 'INTERNAL.CREATION_DATE',
      columnType: ColumnType.DATE,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    }
  ]

  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly msgService: PortalMessageService,
    private readonly translate: TranslateService
  ) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.MM.yyyy HH:mm:ss' : 'M/d/yy, h:mm:ss a'
  }

  ngOnInit(): void {
    this.prepareActionButtons()
    this.initFilter()
  }

  private initFilter() {
    this.resultData$
      .pipe(
        map((array) => {
          if (this.filterData.trim()) {
            const lowerCaseFilter = this.filterData.toLowerCase()
            return array.filter((item) => {
              return ['kind', 'name', 'status'].some((key) => {
                const value = item[key]
                return value?.toString().toLowerCase().includes(lowerCaseFilter)
              })
            })
          } else {
            return array
          }
        })
      )
      .subscribe({
        next: (filteredData) => {
          this.filteredData$.next(filteredData)
        }
      })
  }

  private prepareActionButtons(): void {
    this.actions$ = this.translate.get(['ACTIONS.SEARCH.SHOW_DIAGRAM']).pipe(
      map((data) => {
        return [
          {
            label: data['ACTIONS.SEARCH.SHOW_DIAGRAM'],
            actionCallback: () => this.toggleChartVisibility(),
            icon: PrimeIcons.EYE,
            show: 'asOverflow'
          }
        ]
      })
    )
    this.additionalActions = [
      {
        id: 'view',
        labelKey: 'ACTIONS.VIEW.CRD',
        icon: 'pi pi-eye',
        permission: 'CRD#VIEW',
        callback: (event: any) => this.onDetail(event, 'VIEW')
      },
      {
        id: 'edit',
        labelKey: 'ACTIONS.EDIT.CRD',
        icon: 'pi pi-pencil',
        permission: 'CRD#EDIT',
        callback: (event) => this.onDetail(event, 'EDIT')
      },
      {
        id: 'touch',
        labelKey: 'ACTIONS.TOUCH.CRD',
        icon: 'pi pi-refresh',
        permission: 'CRD#TOUCH',
        callback: (event) => this.onTouch(event)
      }
    ]
  }

  public toggleChartVisibility() {
    this.chartVisible = !this.chartVisible
  }

  /****************************************************************************
   *  SEARCH CRDs
   */
  public onSearch(criteria: GetCustomResourcesByCriteriaRequestParams, reuseCriteria = false): void {
    if (!reuseCriteria) {
      if (criteria?.crdSearchCriteria?.name === '') criteria.crdSearchCriteria.name = undefined
    }
    this.loading = true
    this.exceptionKey = undefined
    this.crds$ = this.dataOrchestratorApi.getCustomResourcesByCriteria(criteria).pipe(
      map((data: CrdResponse) => {
        // manage missing status
        const modifiedData: GenericCrd[] = []
        data.customResources?.map((c) => {
          c.status = c.status ?? GenericCrdStatusEnum.Undefined
          modifiedData.push(c)
        })
        // sort
        modifiedData?.sort((a, b) => {
          // Errors on top of the list
          if (a.status === GenericCrdStatusEnum.Error && b.status !== GenericCrdStatusEnum.Error) {
            return -1
          }
          if (a.status !== GenericCrdStatusEnum.Error && b.status === GenericCrdStatusEnum.Error) {
            return 1
          }
          const dateA = new Date(a.lastModified!).getTime()
          const dateB = new Date(b.lastModified!).getTime()
          return dateB - dateA
        })
        this.resultData$.next(modifiedData as any)
        this.filteredData$.next(modifiedData as any)
        return modifiedData
      }),
      catchError((err) => {
        this.msgService.error({ summaryKey: 'ACTIONS.SEARCH.SEARCH_FAILED' })
        this.exceptionKey = 'EXCEPTIONS.HTTP_STATUS_' + err.status + '.CRDS'
        console.error('getCustomResourcesByCriteria', err)
        return of([])
      }),
      finalize(() => (this.loading = false))
    )
  }

  public onCriteriaReset(): void {
    this.exceptionKey = undefined
  }

  //   public onColumnsChange(activeIds: string[]) {
  //     this.filteredColumns = activeIds.map((id) => this.columns.find((col) => col.field === id)) as Column[]
  //   }
  public onFilterChange(filter: string): void {
    this.filterData = filter
    this.resultData$.next(this.resultData$.value)
  }

  /****************************************************************************
   *  CHANGES
   */
  public onDetail(ev: RowListGridData, mode: ChangeMode): void {
    this.changeMode = mode
    this.crd = ev as GenericCrd
    this.displayDetailDialog = true
  }

  public onCloseDetail(refresh: boolean): void {
    this.displayDetailDialog = false
    this.crd = undefined
  }

  public onTouch(item: GenericCrd): void {
    if (item.kind && item.name) {
      this.dataOrchestratorApi.touchCrdByNameAndType({ name: item.name, type: item.kind }).subscribe({
        next: () => {
          this.msgService.success({ summaryKey: 'ACTIONS.TOUCH.MESSAGE.OK' })
        },
        error: () => this.msgService.error({ summaryKey: 'ACTIONS.TOUCH.MESSAGE.NOK' })
      })
    }
  }
}
