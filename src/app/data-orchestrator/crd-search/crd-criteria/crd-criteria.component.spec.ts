import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { provideRouter } from '@angular/router'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { SelectItem } from 'primeng/api'
import { BehaviorSubject, firstValueFrom, of, throwError } from 'rxjs'

import { UserService } from '@onecx/angular-integration-interface'

import { ContextKind, DataAPIService } from 'src/app/shared/generated'
import { CrdCriteriaComponent, CrdCriteriaForm } from '../crd-criteria/crd-criteria.component'

const filledCriteria = new FormGroup<CrdCriteriaForm>({
  name: new FormControl<string | null>('test'),
  type: new FormControl<ContextKind[] | null>([ContextKind.Data])
})

const emptyCriteria = new FormGroup<CrdCriteriaForm>({
  name: new FormControl<string | null>(null),
  type: new FormControl<ContextKind[] | null>(null)
})

describe('CrdCriteriaComponent', () => {
  let component: CrdCriteriaComponent
  let fixture: ComponentFixture<CrdCriteriaComponent>

  const mockUserService = { lang$: new BehaviorSubject('de') }

  const getKindMock = {
    kinds: [
      ContextKind.Data,
      ContextKind.Database,
      ContextKind.KeycloakClient,
      ContextKind.Microfrontend,
      ContextKind.Microservice,
      ContextKind.Parameter,
      ContextKind.Permission,
      ContextKind.Product,
      ContextKind.Slot
    ]
  }
  const apiServiceSpy = {
    getActiveCrdKinds: jasmine.createSpy('getActiveCrdKinds').and.returnValue(of(getKindMock))
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        NoopAnimationsModule,
        CrdCriteriaComponent,
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en.json'),
          de: require('src/assets/i18n/de.json')
        }).withDefaultLanguage('en')
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: UserService, useValue: mockUserService },
        { provide: DataAPIService, useValue: apiServiceSpy }
      ]
    })
    TestBed.overrideComponent(CrdCriteriaComponent, {
      set: {
        providers: [
          {
            provide: DataAPIService,
            useValue: apiServiceSpy
          }
        ]
      }
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdCriteriaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    mockUserService.lang$.next('de')
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('submitCriteria & resetCriteria', () => {
    it('should search crds with criteria', () => {
      component.crdCriteria = filledCriteria
      spyOn(component.criteriaEmitter, 'emit')

      component.submitCriteria()

      expect(component.criteriaEmitter.emit).toHaveBeenCalled()
    })

    it('should prevent user from searching with missing criteria', () => {
      component.crdCriteria = emptyCriteria
      spyOn(component.criteriaEmitter, 'emit')

      component.submitCriteria()

      expect(component.criteriaEmitter.emit).toHaveBeenCalled()
    })

    it('should reset search criteria', () => {
      component.crdCriteria = filledCriteria
      spyOn(component.criteriaEmitter, 'emit')

      component.submitCriteria()

      expect(component.criteriaEmitter.emit).toHaveBeenCalled()

      spyOn(component.resetSearchEmitter, 'emit')
      spyOn(component.crdCriteria, 'reset')

      component.resetCriteria()

      expect(component.crdCriteria.reset).toHaveBeenCalled()
      expect(component.resetSearchEmitter.emit).toHaveBeenCalled()
    })
  })

  it('should restore criteria in form when input criteria changes', () => {
    const restoredCriteria: { crdSearchCriteria: { name: string; type: ContextKind[] } } = {
      crdSearchCriteria: {
        name: 'my-crd',
        type: [ContextKind.Data, ContextKind.Product]
      }
    }

    fixture.componentRef.setInput('criteria', restoredCriteria)
    fixture.detectChanges()

    expect(component.crdCriteria.get('name')?.value).toBe('my-crd')
    expect(component.crdCriteria.get('type')?.value).toEqual([ContextKind.Data, ContextKind.Product])
  })

  /**
   * Translations
   */

  it('should load dropdown lists with translations', async () => {
    const freshFixture = TestBed.createComponent(CrdCriteriaComponent)
    const freshComponent = freshFixture.componentInstance

    freshFixture.detectChanges()

    expect(apiServiceSpy.getActiveCrdKinds).toHaveBeenCalled()

    const data = await firstValueFrom(freshComponent.type$)

    expect(data.length).toBeGreaterThanOrEqual(8)
  })

  it('should have no kinds if api returns nothing', async () => {
    // Mock API response with kinds as null
    apiServiceSpy.getActiveCrdKinds.and.returnValue(of({ kinds: null }))

    // Create a fresh component instance with the new mock
    const freshFixture = TestBed.createComponent(CrdCriteriaComponent)
    const freshComponent = freshFixture.componentInstance
    freshFixture.detectChanges()

    // Verify the type$ observable
    const data: SelectItem[] = await firstValueFrom(freshComponent.type$)
    expect(data).toHaveSize(0)
  })

  it('should fall back to an empty array if the API returns an error', async () => {
    apiServiceSpy.getActiveCrdKinds.and.returnValue(throwError(() => ({ status: 500 })))

    // Create a fresh component instance with the new mock
    const freshFixture = TestBed.createComponent(CrdCriteriaComponent)
    const freshComponent = freshFixture.componentInstance
    freshFixture.detectChanges()

    // Verify the type$ observable falls back to empty array
    const data: SelectItem[] = await firstValueFrom(freshComponent.type$)
    expect(data).toHaveSize(0)
  })
})
