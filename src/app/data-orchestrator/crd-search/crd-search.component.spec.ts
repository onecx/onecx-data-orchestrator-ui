import { NO_ERRORS_SCHEMA } from '@angular/core'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { BehaviorSubject, of, throwError } from 'rxjs'

import { PortalMessageService, UserService, RowListGridData } from '@onecx/portal-integration-angular'
import { createTranslateLoader } from '@onecx/angular-utils'

import { ContextKind, DataAPIService, GenericCrdStatusEnum } from 'src/app/shared/generated'
import { CrdSearchComponent } from '../crd-search/crd-search.component'

const crdData: any = [
  {
    kind: 'Data',
    resourceVersion: '301195144',
    version: '',
    creationTimestamp: '2024-07-03T08:28:37Z',
    lastModified: '2024-08-22T13:15:10Z',
    name: 'onecx-help-ui',
    message: null,
    responseCode: 200,
    status: 'UPDATED'
  },
  {
    kind: 'Data',
    resourceVersion: '202689008',
    version: '',
    creationTimestamp: '2024-07-03T09:11:06Z',
    lastModified: '2024-10-14T09:27:41Z',
    name: 'onecx-help-ui-tenant-mho',
    message: 'Missing configuration for key tenant1XXXXX1',
    responseCode: -1,
    status: 'ERROR'
  }
]

describe('CrdSearchComponent', () => {
  let component: CrdSearchComponent
  let fixture: ComponentFixture<CrdSearchComponent>

  const msgServiceSpy = jasmine.createSpyObj<PortalMessageService>('PortalMessageService', ['success', 'error', 'info'])
  const apiServiceSpy = {
    getCustomResourcesByCriteria: jasmine.createSpy('getCustomResourcesByCriteria').and.returnValue(of({})),
    touchCrdByNameAndType: jasmine.createSpy('touchCrdByNameAndType').and.returnValue(of({}))
  }
  const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get'])

  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrdSearchComponent],
      imports: [
        TranslateModule.forRoot({
          isolate: true,
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PortalMessageService, useValue: msgServiceSpy },
        { provide: DataAPIService, useValue: apiServiceSpy },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents()
    msgServiceSpy.success.calls.reset()
    msgServiceSpy.error.calls.reset()
    msgServiceSpy.info.calls.reset()
    apiServiceSpy.getCustomResourcesByCriteria.calls.reset()
    apiServiceSpy.touchCrdByNameAndType.calls.reset()
    translateServiceSpy.get.calls.reset()
    mockUserService.lang$.getValue.and.returnValue('de')
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdSearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should filter data based on filterData', () => {
      component.resultData$ = new BehaviorSubject(crdData)
      ;(component as any).filterData = 'UPDATED'

      component.filteredData$ = new BehaviorSubject(crdData)

      component.ngOnInit()

      component.filteredData$.subscribe((filteredData) => {
        expect(filteredData.length).toEqual(1)
      })
    })
  })

  describe('search', () => {
    it('should search crds of type Data', (done) => {
      apiServiceSpy.getCustomResourcesByCriteria.and.returnValue(of({ customResources: crdData }))

      component.onSearch({ crdSearchCriteria: { type: [ContextKind.Data] } })

      component.crds$.subscribe({
        next: (data) => {
          expect(data.length).toBe(2)
          expect(data[0]).toEqual(crdData[1])
          expect(data[1]).toEqual(crdData[0])
          done()
        },
        error: done.fail
      })
    })
  })

  it('should search crds by type and name', (done) => {
    apiServiceSpy.getCustomResourcesByCriteria.and.returnValue(of({ customResources: [crdData[0]] }))

    component.onSearch({ crdSearchCriteria: { type: [ContextKind.Data], name: 'onecx-help-ui' } })

    component.crds$.subscribe({
      next: (data) => {
        expect(data.length).toBe(1)
        expect(data[0]).toEqual(crdData[0])
        done()
      },
      error: done.fail
    })
  })

  it('should set criteria.crdSearchCriteria.name to undefined if it is an empty string', () => {
    const criteria = { crdSearchCriteria: { name: '' } }
    component.onSearch(criteria)

    expect(criteria.crdSearchCriteria.name).toBeUndefined()
  })

  it('should display an error message if the search call fails', (done) => {
    const errorResponse = { status: 403, statusText: 'No permissions' }
    apiServiceSpy.getCustomResourcesByCriteria.and.returnValue(throwError(() => errorResponse))
    spyOn(console, 'error')

    component.onSearch({ crdSearchCriteria: { type: [ContextKind.Data] } })

    component.crds$.subscribe({
      next: (data) => {
        expect(data.length).toBe(0)
        done()
      },
      error: () => {
        expect(component.exceptionKey).toEqual('EXCEPTIONS.HTTP_STATUS_' + errorResponse.status + '.CRDS')
        expect(msgServiceSpy.error).toHaveBeenCalledWith({
          summaryKey: 'ACTIONS.SEARCH.SEARCH_FAILED',
          detailKey: component.exceptionKey
        })
        expect(console.error).toHaveBeenCalledWith('getCustomResourcesByCriteria', errorResponse)
        done.fail
      }
    })
  })

  it('should set status to Undefined and sort data by lastModified date, prioritizing Error status', (done) => {
    const mockData = {
      customResources: [
        { kind: 'Data', name: 'Item5', status: GenericCrdStatusEnum.Error, lastModified: '2023-01-05T00:00:00Z' },
        { kind: 'Data', name: 'Item4', status: GenericCrdStatusEnum.Error, lastModified: '2023-01-04T00:00:00Z' },
        { kind: 'Data', name: 'Item2', status: GenericCrdStatusEnum.Created, lastModified: '2023-01-02T00:00:00Z' },
        { kind: 'Data', name: 'Item1', status: undefined, lastModified: '2023-01-01T00:00:00Z' },
        { kind: 'Data', name: 'Item3', status: null, lastModified: '2023-01-03T00:00:00Z' }
      ]
    }
    apiServiceSpy.getCustomResourcesByCriteria.and.returnValue(of(mockData))

    component.onSearch({ crdSearchCriteria: { type: [ContextKind.Data] } })

    component.crds$.subscribe({
      next: (data) => {
        expect(data[0]['status']).toEqual(GenericCrdStatusEnum.Error)
        expect(data[1]['status']).toEqual(GenericCrdStatusEnum.Error)
        expect(data[2]['status']).toEqual(GenericCrdStatusEnum.Undefined)
        expect(data[3]['status']).toEqual(GenericCrdStatusEnum.Created)
        expect(data[4]['status']).toEqual(GenericCrdStatusEnum.Undefined)
        done()
      },
      error: () => done.fail('Expected no error')
    })
  })

  it('should reset exceptionKey to undefined when onCriteriaReset is called', () => {
    component.exceptionKey = 'someException'
    component.onCriteriaReset()
    expect(component.exceptionKey).toBeUndefined()
  })

  it('should set filterData and update resultData$ when onFilterChange is called', () => {
    const filter = 'newFilter'
    const resultDataSpy = spyOn(component.resultData$, 'next')

    component.onFilterChange(filter)

    expect((component as any).filterData).toEqual(filter)
    expect(resultDataSpy).toHaveBeenCalledWith(component.resultData$.value)
  })

  it('should set displayDetailDialog to false and crd to undefined when onCloseDetail is called', () => {
    component.displayDetailDialog = true
    component.crd = { someProperty: 'someValue' } as any

    component.onCloseDetail(true)

    expect(component.displayDetailDialog).toBeFalse()
    expect(component.crd).toBeUndefined()
  })

  /*
   * UI ACTIONS
   */
  describe('ui actions', () => {
    it('should show details of an crd', () => {
      const ev: RowListGridData = { id: '1', imagePath: '', ...crdData[0] }
      const mode = 'EDIT'

      component.onDetail(ev, mode)

      expect(component.changeMode).toEqual(mode)
      expect(component.crd).toEqual({ id: '1', imagePath: '', ...crdData[0] })
      expect(component.displayDetailDialog).toBeTrue()
    })

    it('should touch a crd', () => {
      apiServiceSpy.touchCrdByNameAndType.and.returnValue(of({}))

      component.onTouch(crdData[0])

      expect(msgServiceSpy.success).toHaveBeenCalledWith({ summaryKey: 'ACTIONS.TOUCH.MESSAGE.OK' })
    })

    it('should display error if touch fails', () => {
      apiServiceSpy.touchCrdByNameAndType.and.returnValue(throwError(() => new Error()))
      component.crd = { name: '' }

      component.onTouch(crdData[0])

      expect(msgServiceSpy.error).toHaveBeenCalledWith({ summaryKey: 'ACTIONS.TOUCH.MESSAGE.NOK' })
    })

    it('should trigger diagram action', () => {
      translateServiceSpy.get.and.returnValue(of({ 'ACTIONS.SEARCH.SHOW_DIAGRAM': 'Show diagram' }))
      spyOn(component, 'toggleChartVisibility')

      component.ngOnInit()

      component.actions$?.subscribe((action) => {
        action[0].actionCallback()
      })

      expect(component.toggleChartVisibility).toHaveBeenCalled()
    })

    it('should show/hide diagram', () => {
      translateServiceSpy.get.and.returnValue(of({ 'ACTIONS.SEARCH.SHOW_DIAGRAM': 'Show diagram' }))
      spyOn(component, 'toggleChartVisibility').and.callThrough()

      component.ngOnInit()

      component.actions$?.subscribe((action) => {
        action[0].actionCallback()
      })

      expect(component.toggleChartVisibility).toHaveBeenCalled()
      expect(component.chartVisible).toBeTrue()

      component.actions$?.subscribe((action) => {
        action[0].actionCallback()
      })

      expect(component.chartVisible).toBeFalse()
    })

    it('should open edit dialog', () => {
      translateServiceSpy.get.and.returnValue(of({ 'ACTIONS.EDIT.CRD': 'Edit' }))
      spyOn(component, 'onDetail')

      component.ngOnInit()

      const editAction = component.additionalActions.find((action) => action.id === 'edit')
      editAction?.callback(null)

      expect(component.onDetail).toHaveBeenCalled()
    })

    it('should open detail dialog', () => {
      translateServiceSpy.get.and.returnValue(of({ 'ACTIONS.VIEW.CRD': 'View' }))
      spyOn(component, 'onDetail')

      component.ngOnInit()

      const viewAction = component.additionalActions.find((action) => action.id === 'view')
      viewAction?.callback(null)

      expect(component.onDetail).toHaveBeenCalled()
    })

    it('should trigger touch action', () => {
      translateServiceSpy.get.and.returnValue(of({ 'ACTIONS.TOUCH.LABEL': 'Touch' }))
      spyOn(component, 'onTouch')

      component.ngOnInit()

      const touchAction = component.additionalActions.find((action) => action.id === 'touch')
      touchAction?.callback(null)

      expect(component.onTouch).toHaveBeenCalled()
    })
  })

  /**
   * Language tests
   */
  describe('language', () => {
    it('should set a German date format', () => {
      expect(component.dateFormat).toEqual('dd.MM.yyyy HH:mm:ss')
    })

    it('should set default date format', () => {
      mockUserService.lang$.getValue.and.returnValue('en')
      fixture = TestBed.createComponent(CrdSearchComponent)
      component = fixture.componentInstance
      fixture.detectChanges()

      expect(component.dateFormat).toEqual('M/d/yy, h:mm:ss a')
    })
  })
})
