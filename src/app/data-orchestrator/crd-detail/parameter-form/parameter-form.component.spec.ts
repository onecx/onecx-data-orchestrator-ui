import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceParameter, StatusStatusEnum } from 'src/app/shared/generated'
import { ParameterFormComponent } from './parameter-form.component'

describe('ParameterFormComponent', () => {
  let component: ParameterFormComponent
  let fixture: ComponentFixture<ParameterFormComponent>
  const mockUserService = { lang$: { getValue: jasmine.createSpy('getValue') } }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ParameterFormComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: UserService, useValue: mockUserService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should initialize form group with default values', () => {
      expect(component.formGroup.controls['name'].value).toBeNull()
      expect(component.formGroup.controls['kind'].value).toBeNull()
      expect(component.formGroup.controls['productName'].value).toBeNull()
      expect(component.formGroup.controls['applicationId'].value).toBeNull()
      expect(component.formGroup.controls['key'].value).toBeNull()
      expect(component.formGroup.controls['orgId'].value).toBeNull()
    })
  })

  it('should disable form controls in VIEW mode', () => {
    component.changeMode = 'VIEW'
    component.ngOnChanges()
    expect(component.formGroup.disabled).toBeTrue()
  })

  it('should enable form controls in EDIT mode except metadataName and kind', () => {
    component.changeMode = 'EDIT'
    component.ngOnChanges()
    expect(component.formGroup.enabled).toBeTrue()
    expect(component.formGroup.controls['name'].disabled).toBeTrue()
    expect(component.formGroup.controls['kind'].disabled).toBeTrue()
  })

  it('should fill form with parameterCrd values', () => {
    const mockParameterCrd: CustomResourceParameter = {
      apiVersion: 'v1',
      kind: 'Parameter',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        applicationId: 'testAppId',
        productName: 'testProductName',
        parameters: { Parameter1: { value: 'value', description: 'desc1', displayName: 'displayName1' } }
      },
      status: { status: StatusStatusEnum.Created }
    }
    component.parameterCrd = mockParameterCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['name'].value).toBe('testName')
    expect(component.formGroup.controls['applicationId'].value).toBe('testAppId')
    expect(component.formGroup.controls['productName'].value).toBe('testProductName')
  })
})
