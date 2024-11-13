import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { catchError, combineLatest, finalize, map, Observable, of } from 'rxjs'
import { Table } from 'primeng/table'
import { SelectItem } from 'primeng/api'

import { Action, Column, PortalMessageService, UserService } from '@onecx/portal-integration-angular'

import { limitText, dropDownSortItemsByLabel } from 'src/app/shared/utils'
import {
  CrdResponse,
  CustomResourceData,
  DataAPIService,
  GenericCrd,
  GetCustomResourcesByCriteriaRequestParams
} from 'src/app/shared/generated'

type ExtendedColumn = Column & {
  hasFilter?: boolean
  isDate?: boolean
  isDropdown?: true
  css?: string
  limit?: boolean
  needsDisplayName?: boolean
}
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
  public crd: GenericCrd | undefined //just crd data type for now
  public crds$: Observable<GenericCrd[]> | undefined
  public displayDeleteDialog = false
  public displayDetailDialog = false
  public searchInProgress = false
  public exceptionKey: string | undefined = undefined
  public dateFormat: string
  public allCriteriaLists$: Observable<allCriteriaLists> | undefined
  public allItem: SelectItem | undefined

  public allMetaData$!: Observable<string>
  public filteredColumns: Column[] = []

  public limitText = limitText

  public columns: ExtendedColumn[] = [
    {
      field: 'status',
      header: 'STATUS',
      active: true,
      translationPrefix: 'CRD',
      css: 'text-center'
    },
    {
      field: 'name',
      header: 'NAME',
      active: true,
      translationPrefix: 'CRD',
      limit: true,
      css: 'text-center'
    },
    {
      field: 'kind',
      header: 'TYPE',
      active: true,
      translationPrefix: 'CRD',
      css: 'text-center hidden xl:table-cell',
      isDropdown: true
    },
    {
      field: 'version',
      header: 'VERSION',
      active: true,
      translationPrefix: 'CRD',
      css: 'text-center ',
      limit: true
    },
    {
      field: 'resourceVersion',
      header: 'RESOURCE_VERSION',
      active: true,
      translationPrefix: 'CRD',
      css: 'text-center ',
      limit: true
    },
    {
      field: 'creationTimestamp',
      header: 'CREATION_DATE',
      active: true,
      translationPrefix: 'CRD',
      css: 'text-center ',
      limit: true
    }
  ]

  constructor(
    private readonly user: UserService,
    private readonly dataOrchestratorApi: DataAPIService,
    private readonly msgService: PortalMessageService,
    private readonly translate: TranslateService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.MM.yyyy HH:mm' : 'M/d/yy, h:mm a'
  }

  ngOnInit(): void {
    this.filteredColumns = this.columns.filter((a) => {
      return a.active === true
    })
  }

  /****************************************************************************
   *  SEARCH announcements
   */
  public onSearch(criteria: GetCustomResourcesByCriteriaRequestParams, reuseCriteria = false): void {
    if (!reuseCriteria) {
      if (criteria?.crdSearchCriteria?.name === '') criteria.crdSearchCriteria.name = undefined
    }
    this.searchInProgress = true
    this.crds$ = this.dataOrchestratorApi.getCustomResourcesByCriteria(criteria).pipe(
      catchError((err) => {
        this.exceptionKey = 'EXCEPTIONS.HTTP_STATUS_' + err.status + '.ANNOUNCEMENTS'
        console.error('searchHelps():', err)
        this.msgService.error({ summaryKey: 'ACTIONS.SEARCH.MSG_SEARCH_FAILED' })
        return of({ stream: [] } as CrdResponse)
      }),
      map((data: CrdResponse) => data.customResources ?? []),
      finalize(() => (this.searchInProgress = false))
    )
  }

  public onCriteriaReset(): void {}

  public onColumnsChange(activeIds: string[]) {
    this.filteredColumns = activeIds.map((id) => this.columns.find((col) => col.field === id)) as Column[]
  }
  public onFilterChange(event: string): void {
    this.crdTable?.filterGlobal(event, 'contains')
  }

  /****************************************************************************
   *  CHANGES
   */
  public onCloseDetail(refresh: boolean): void {
    this.displayDetailDialog = false
    this.crd = undefined
  }

  public onDetail(ev: MouseEvent, item: GenericCrd, mode: ChangeMode): void {
    ev.stopPropagation()
    this.changeMode = mode
    this.crd = item
    this.displayDetailDialog = true
  }
}
