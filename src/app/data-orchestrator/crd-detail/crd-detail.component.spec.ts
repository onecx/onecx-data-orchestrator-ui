import { QueryList } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { BehaviorSubject, of, Subject, take, throwError } from 'rxjs'

import { PortalMessageService, UserService } from '@onecx/angular-integration-interface'

import { ContextKind, DataAPIService } from 'src/app/shared/generated'
import { DataFormComponent } from './data-form/data-form.component'
import { DatabaseFormComponent } from './database-form/database-form.component'
import { ProductFormComponent } from './product-form/product-form.component'
import { MicrofrontendFormComponent } from './microfrontend-form/microfrontend-form.component'
import { MicroserviceFormComponent } from './microservice-form/microservice-form.component'
import { PermissionFormComponent } from './permission-form/permission-form.component'
import { SlotFormComponent } from './slot-form/slot-form.component'
import { KeycloakFormComponent } from './keycloak-form/keycloak-form.component'
import { CrdDetailComponent, Update } from '../crd-detail/crd-detail.component'
import { ParameterFormComponent } from './parameter-form/parameter-form.component'
import { UpdateHistoryComponent } from './update-history/update-history.component'

describe('CrdDetailComponent', () => {
  let component: CrdDetailComponent
  let fixture: ComponentFixture<CrdDetailComponent>
  const mockUserService = { lang$: new BehaviorSubject<string>('de') }
  const msgServiceSpy = jasmine.createSpyObj<PortalMessageService>('PortalMessageService', ['success', 'error'])
  const doApiSpy = {
    getCrdByTypeAndName: jasmine.createSpy('getCrdByTypeAndName').and.returnValue(of({})),
    editCrd: jasmine.createSpy('editCrd').and.returnValue(of({}))
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        UpdateHistoryComponent,
        NoopAnimationsModule,
        CrdDetailComponent,
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en.json'),
          de: require('src/assets/i18n/de.json')
        }).withDefaultLanguage('en')
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PortalMessageService, useValue: msgServiceSpy },
        { provide: DataAPIService, useValue: doApiSpy },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents()
    // reset
    msgServiceSpy.success.calls.reset()
    msgServiceSpy.error.calls.reset()
    doApiSpy.getCrdByTypeAndName.calls.reset()
    doApiSpy.editCrd.calls.reset()
    mockUserService.lang$.next('de')
    doApiSpy.getCrdByTypeAndName.and.returnValue(of({}))
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdDetailComponent)
    component = fixture.componentInstance
    Object.assign(component, {
      dataOrchestratorApi: doApiSpy,
      msgService: msgServiceSpy,
      user: mockUserService
    })
    fixture.detectChanges()
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should set german date format', () => {
      mockUserService.lang$.next('de')
      fixture = TestBed.createComponent(CrdDetailComponent)
      component = fixture.componentInstance

      fixture.detectChanges()

      expect(component.datetimeFormat).toEqual('dd.MM.yyyy HH:mm:ss')
    })

    it('should set english date format', () => {
      mockUserService.lang$.next('en')
      fixture = TestBed.createComponent(CrdDetailComponent)
      component = fixture.componentInstance

      fixture.detectChanges()

      expect(component.datetimeFormat).toEqual('M/d/yyyy, hh:mm:ss a')
    })
  })

  describe('ngOnChanges', () => {
    it('should call getCrd if dialog is open', () => {
      component.displayDetailDialog = true
      const getCrdSpy = spyOn<any>(component, 'getCrd')

      component.ngOnChanges()

      expect(getCrdSpy).toHaveBeenCalled()
    })

    it('should load crd data and update updateHistory', (done) => {
      component.displayDetailDialog = true

      const mockCrd = { crd: { name: 'testCrd' } }
      const mockUpdateHistory = [{ date: '2023-01-01', fields: {} }] as Update[]

      doApiSpy.getCrdByTypeAndName.and.returnValue(of(mockCrd))
      spyOn(component, 'prepareHistory').and.returnValue(mockUpdateHistory)

      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.ngOnChanges()

      component.crd$.pipe(take(1)).subscribe((value) => {
        expect(value).toEqual(mockCrd.crd)
        expect(component.updateHistory).toEqual(mockUpdateHistory)
        expect(component.loading).toBeFalse()
        done()
      })
    })

    it('should load crd data, with missing crd tag', (done) => {
      component.displayDetailDialog = true
      const mockCrd = { crd: {} }
      doApiSpy.getCrdByTypeAndName.and.returnValue(of(mockCrd))
      spyOn(component, 'prepareHistory').and.returnValue([])
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.ngOnChanges()
      fixture.detectChanges()

      component.crd$.pipe(take(1)).subscribe((value) => {
        expect(value).toEqual({})
        expect(component.updateHistory).toEqual([])
        expect(component.loading).toBeFalse()
        done()
      })
    })

    it('should load crd data, data empty', (done) => {
      component.displayDetailDialog = true
      const mockCrd = {
        name: 'testCrd'
      }
      doApiSpy.getCrdByTypeAndName.and.returnValue(of(mockCrd))
      spyOn(component, 'prepareHistory').and.returnValue([])
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.ngOnChanges()
      fixture.detectChanges()

      component.crd$.pipe(take(1)).subscribe((value) => {
        expect(value).toEqual({})
        expect(component.updateHistory).toEqual([])
        expect(component.loading).toBeFalse()
        done()
      })
    })

    it('should show error when getCrd fails', (done) => {
      const errorResponse = { status: 403, statusText: 'No permissions' }
      doApiSpy.getCrdByTypeAndName.and.returnValue(throwError(() => errorResponse))
      component.displayDetailDialog = true
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data
      spyOn(console, 'error')

      component.ngOnChanges()
      fixture.detectChanges()

      component.crd$.pipe(take(1)).subscribe((value) => {
        expect(value).toEqual({})
        expect(component.exceptionKey).toBe('EXCEPTIONS.HTTP_STATUS_' + errorResponse.status + '.CRD')
        expect(console.error).toHaveBeenCalledWith('getCrdByTypeAndName', errorResponse)
        expect(component.loading).toBeFalse()
        done()
      })
    })
  })

  describe('Saving', () => {
    it('should save crd data and emit hideDialogAndChanged with true when onSave is called', (done) => {
      const mockFormValues = { name: 'testCrd' }

      const mockEditResourceRequest = {
        CrdData: mockFormValues
      }

      spyOn<any>(component, 'getFormValuesOfActiveChild').and.returnValue(mockFormValues)
      spyOn<any>(component, 'prepareUpdateData').and.returnValue(mockEditResourceRequest)

      component.crd$ = of({ name: 'testCrd' })

      const emitSpy = spyOn(component.hideDialogAndChanged, 'emit')

      component.changeMode = 'EDIT'
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.onSave()

      setTimeout(() => {
        expect(doApiSpy.editCrd).toHaveBeenCalledWith({
          editResourceRequest: mockEditResourceRequest
        })
        expect(emitSpy).toHaveBeenCalledWith(true)
        done()
      })
    })

    it('should not trigger a second save when save is already in progress', () => {
      const mockFormValues = { name: 'testCrd' }
      const editCrdSubject = new Subject<unknown>()

      spyOn<any>(component, 'getFormValuesOfActiveChild').and.returnValue(mockFormValues)
      spyOn<any>(component, 'prepareUpdateData').and.returnValue({
        CrdData: mockFormValues
      })

      doApiSpy.editCrd.and.returnValue(editCrdSubject.asObservable())
      component.crd$ = of({ name: 'testCrd' })
      component.changeMode = 'EDIT'
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.onSave()
      component.onSave()

      expect(doApiSpy.editCrd).toHaveBeenCalledTimes(1)

      editCrdSubject.complete()
    })

    it('should show error message when onSave fails', (done) => {
      const mockFormValues = { name: 'testCrd' }

      spyOn<any>(component, 'getFormValuesOfActiveChild').and.returnValue(mockFormValues)
      spyOn<any>(component, 'prepareUpdateData').and.returnValue({
        CrdData: mockFormValues
      })

      const errorResponse = {
        status: 400,
        statusText: 'Cannot save'
      }

      doApiSpy.editCrd.and.returnValue(throwError(() => errorResponse))

      component.crd$ = of({ name: 'testCrd' })

      spyOn(console, 'error')

      component.changeMode = 'EDIT'
      component.crdName = 'testCrd'
      component.crdType = ContextKind.Data

      component.onSave()

      setTimeout(() => {
        expect(console.error).toHaveBeenCalledWith('editCrd', errorResponse)
        expect(msgServiceSpy.error).toHaveBeenCalledWith({
          summaryKey: 'ACTIONS.EDIT.MESSAGE.NOK'
        })
        done()
      })
    })
  })

  it('should return form values of the active child component based on crdType', () => {
    const mockFormGroup = { value: { name: 'testCrd' } }
    //Data
    component.dataFormComponent = new QueryList<DataFormComponent>()
    component.dataFormComponent.reset([{ formGroup: mockFormGroup } as DataFormComponent])

    component.crdType = ContextKind.Data
    let formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)
    //Database
    component.databaseFormComponent = new QueryList<DatabaseFormComponent>()
    component.databaseFormComponent.reset([{ formGroup: mockFormGroup } as DatabaseFormComponent])

    component.crdType = 'Database'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Parameter
    component.parameterFormComponent = new QueryList<ParameterFormComponent>()
    component.parameterFormComponent.reset([{ formGroup: mockFormGroup } as ParameterFormComponent])

    component.crdType = 'Parameter'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Product
    component.productFormComponent = new QueryList<ProductFormComponent>()
    component.productFormComponent.reset([{ formGroup: mockFormGroup } as ProductFormComponent])

    component.crdType = 'Product'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Permission
    component.permissionFormComponent = new QueryList<PermissionFormComponent>()
    component.permissionFormComponent.reset([{ formGroup: mockFormGroup } as PermissionFormComponent])

    component.crdType = 'Permission'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //KeycloakClient
    component.keycloakFormComponent = new QueryList<KeycloakFormComponent>()
    component.keycloakFormComponent.reset([{ formGroup: mockFormGroup } as KeycloakFormComponent])

    component.crdType = 'KeycloakClient'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Slot
    component.slotFormComponent = new QueryList<SlotFormComponent>()
    component.slotFormComponent.reset([{ formGroup: mockFormGroup } as SlotFormComponent])

    component.crdType = 'Slot'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Microfrontend
    component.microfrontendFormComponent = new QueryList<MicrofrontendFormComponent>()
    component.microfrontendFormComponent.reset([{ formGroup: mockFormGroup } as MicrofrontendFormComponent])

    component.crdType = 'Microfrontend'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)

    //Microservice
    component.microserviceFormComponent = new QueryList<MicroserviceFormComponent>()
    component.microserviceFormComponent.reset([{ formGroup: mockFormGroup } as MicroserviceFormComponent])

    component.crdType = 'Microservice'
    formValues = (component as any).getFormValuesOfActiveChild()

    expect(formValues).toEqual(mockFormGroup.value)
  })

  it('should prepare update data based on crdType', () => {
    const mockCrd = { name: 'testCrd' }

    // Data
    let expectedRequest: any = { CrdData: mockCrd }
    let result = (component as any).prepareUpdateData('Data', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Database
    expectedRequest = { CrdDatabase: mockCrd }
    result = (component as any).prepareUpdateData('Database', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Product
    expectedRequest = { CrdParameter: mockCrd }
    result = (component as any).prepareUpdateData('Parameter', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Product
    expectedRequest = { CrdProduct: mockCrd }
    result = (component as any).prepareUpdateData('Product', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Permission
    expectedRequest = { CrdPermission: mockCrd }
    result = (component as any).prepareUpdateData('Permission', mockCrd)
    expect(result).toEqual(expectedRequest)

    // KeycloakClient
    expectedRequest = { CrdKeycloakClient: mockCrd }
    result = (component as any).prepareUpdateData('KeycloakClient', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Slot
    expectedRequest = { CrdSlot: mockCrd }
    result = (component as any).prepareUpdateData('Slot', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Microfrontend
    expectedRequest = { CrdMicrofrontend: mockCrd }
    result = (component as any).prepareUpdateData('Microfrontend', mockCrd)
    expect(result).toEqual(expectedRequest)

    // Microservice
    expectedRequest = { CrdMicroservice: mockCrd }
    result = (component as any).prepareUpdateData('Microservice', mockCrd)
    expect(result).toEqual(expectedRequest)
  })

  it('should update crd data with form values when submitFormValues is called', (done) => {
    const mockCrd = { name: 'testCrd' }
    const mockFormValues = { name: 'updatedCrd' }
    spyOn<any>(component, 'updateFields').and.returnValue(mockFormValues)

    component.crd$ = of(mockCrd)
    ;(component as any).submitFormValues(mockFormValues).subscribe((result: any) => {
      expect(result).toEqual(mockFormValues)
      done()
    })
  })

  it('should update crd fields with form values when updateFields is called', () => {
    const base = { name: 'testCrd', spec: { description: 'old' }, metadata: { labels: 'old' } }
    const update = { name: 'updatedCrd', specDescription: 'new', metadataLabels: 'new' }

    const result = (component as any).updateFields(base, update)

    expect(result.name).toEqual('updatedCrd')
    expect(result.spec.description).toEqual('new')
    expect(result.metadata.labels).toEqual('new')
  })

  it('should update fields directly inside spec or metadata if they exist', () => {
    const base = {
      name: 'testCrd',
      spec: { description: 'old', version: 'v1' },
      metadata: { labels: 'old', annotations: 'oldAnnotation' }
    }
    const update = { version: 'v2', annotations: 'newAnnotation' }

    const result = (component as any).updateFields(base, update)

    expect(result.spec.version).toEqual('v2')
    expect(result.metadata.annotations).toEqual('newAnnotation')
  })

  describe('history', () => {
    it('should provide empty history if given object is empty', () => {
      let history = component.prepareHistory({})

      expect(history).toEqual([])

      history = component.prepareHistory({ metadata: {} })

      expect(history).toEqual([])
    })

    it('should prepare history from managedFields and skip keys with "."', () => {
      const mockManagedFields = [
        { time: '2023-01-02T00:00:00Z', fieldsV1: { 'f:spec': { 'f:version': {} } }, operation: 'Update' },
        {
          time: '2023-01-01T00:00:00Z',
          fieldsV1: {
            'f:spec': {
              'f:name': {},
              'f:description': {},
              '.': {} // This key should be skipped
            },
            'f:metadata': { 'f:labels': {} }
          },
          operation: 'Update'
        }
      ]
      component.crd$ = of({ metadata: { managedFields: mockManagedFields } })
      const expectedHistory: Update[] = [
        { date: '2023-01-02T00:00:00Z', fields: { spec: ['version'] }, operation: 'Update' },
        {
          date: '2023-01-01T00:00:00Z',
          fields: { spec: ['name', 'description'], metadata: ['labels'] },
          operation: 'Update'
        }
      ]

      // Mock the crd$ observable and get the value synchronously
      let crdValue: any
      component.crd$.subscribe((crd) => (crdValue = crd))

      // Call the prepareHistory method with the mocked value
      const history = component.prepareHistory(crdValue)

      expect(history).toEqual(expectedHistory)
    })
  })

  /*
   * UI ACTIONS
   */
  describe('ui actions', () => {
    it('should close the dialog', () => {
      spyOn(component.hideDialogAndChanged, 'emit')
      component.onDialogHide()

      expect(component.displayDetailDialog).toBeFalse()
      expect(component.hideDialogAndChanged.emit).toHaveBeenCalledWith(false)
    })
  })
})
