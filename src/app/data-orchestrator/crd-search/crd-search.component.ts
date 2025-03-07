import { Component, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { BehaviorSubject, catchError, finalize, map, Observable, of } from 'rxjs'
import { Table } from 'primeng/table'
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

import { limitText } from 'src/app/shared/utils'
import {
  CrdResponse,
  DataAPIService,
  GenericCrd,
  GenericCrdStatusEnum,
  GetCustomResourcesByCriteriaRequestParams
} from 'src/app/shared/generated'

type ChangeMode = 'VIEW' | 'NEW' | 'EDIT'
type allCriteriaLists = { products: SelectItem[]; workspaces: SelectItem[] }

@Component({
  selector: 'app-crd-search',
  templateUrl: './crd-search.component.html',
  styleUrls: ['./crd-search.component.scss']
})
export class CrdSearchComponent implements OnInit {
  @ViewChild('crdTable', { static: false }) crdTable: Table | undefined

  public changeMode: ChangeMode = 'NEW'
  public actions$: Observable<Action[]> | undefined
  public additionalActions!: DataAction[]
  public crd: GenericCrd | undefined
  public crds$: Observable<GenericCrd[]> | undefined
  public displayDeleteDialog = false
  public displayDetailDialog = false
  public searchInProgress = false
  public exceptionKey: string | undefined = undefined
  public dateFormat: string
  public allCriteriaLists$: Observable<allCriteriaLists> | undefined
  public allItem: SelectItem | undefined
  private filterData = ''

  public allMetaData$!: Observable<string>
  public filteredData$ = new BehaviorSubject<RowListGridData[]>([])
  public resultData$ = new BehaviorSubject<RowListGridData[]>([])

  public limitText = limitText

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
      nameKey: 'CRD.LAST_MODIFIED_DATE',
      columnType: ColumnType.DATE,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.DEFAULT', 'ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    },
    {
      id: 'creationTimestamp',
      nameKey: 'CRD.CREATION_DATE',
      columnType: ColumnType.DATE,
      predefinedGroupKeys: ['ACTIONS.SEARCH.PREDEFINED_GROUP.ALL'],
      sortable: true
    }
  ]

  diagramColumnId = 'status'
  diagramColumn: DiagramColumn = { columnType: ColumnType.STRING, id: 'status' }
  chartVisible = false
  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly msgService: PortalMessageService,
    private readonly translate: TranslateService
  ) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.MM.yyyy HH:mm' : 'M/d/yy, h:mm a'
  }

  ngOnInit(): void {
    this.prepareActionButtons()
    this.initFilter()
  }

  initFilter() {
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
        labelKey: 'ACTIONS.VIEW.LABEL',
        icon: 'pi pi-eye',
        permission: 'CRD#VIEW',
        callback: (event: any) => this.onDetail(event, 'VIEW')
      },
      {
        id: 'edit',
        labelKey: 'ACTIONS.EDIT.LABEL',
        icon: 'pi pi-pencil',
        permission: 'CRD#EDIT',
        callback: (event) => this.onDetail(event, 'EDIT')
      },
      {
        id: 'touch',
        labelKey: 'ACTIONS.DELETE.USER.TOOLTIP',
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
    this.exceptionKey = undefined
    if (!reuseCriteria) {
      if (criteria?.crdSearchCriteria?.name === '') criteria.crdSearchCriteria.name = undefined
    }
    this.searchInProgress = true
    this.crds$ = this.dataOrchestratorApi.getCustomResourcesByCriteria(criteria).pipe(
      catchError((err) => {
        this.exceptionKey = 'EXCEPTIONS.HTTP_STATUS_' + err.status + '.CRDS'
        this.msgService.error({ summaryKey: 'ACTIONS.SEARCH.MSG_SEARCH_FAILED' })
        return of({ stream: [] } as CrdResponse)
      }),
      map((data: CrdResponse) => {
        const modifiedData = data.customResources?.map((c) => {
          if (c.status === undefined || c.status === null) {
            c.status = GenericCrdStatusEnum.Undefined
          }
          return c
        })
        modifiedData?.sort((a, b) => {
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
        return data.customResources ?? []
      }),
      finalize(() => (this.searchInProgress = false))
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
  public onCloseDetail(refresh: boolean): void {
    this.displayDetailDialog = false
    this.crd = undefined
  }

  public onDetail(ev: RowListGridData, mode: ChangeMode): void {
    this.changeMode = mode
    this.crd = ev as GenericCrd
    this.displayDetailDialog = true
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
