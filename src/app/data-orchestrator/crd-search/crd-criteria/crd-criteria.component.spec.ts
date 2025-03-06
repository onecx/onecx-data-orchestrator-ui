import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { SelectItem } from 'primeng/api'
import { CrdCriteriaComponent, CrdCriteriaForm } from '../crd-criteria/crd-criteria.component'

import { UserService } from '@onecx/portal-integration-angular'
import { ContextKind } from 'src/app/shared/generated'
import { createTranslateLoader } from '@onecx/angular-utils'

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

  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CrdCriteriaComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: UserService, useValue: mockUserService }]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CrdCriteriaComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    mockUserService.lang$.getValue.and.returnValue('de')
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

  /**
   * Translations
   */
  it('should load dropdown lists with translations', () => {
    let data2: SelectItem[] = []
    component.type$?.subscribe((data) => {
      data2 = data
    })
    expect(data2.length).toBeGreaterThanOrEqual(8)
  })
})
