import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MicroserviceFormComponent } from './microservice-form.component'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceMicroservice, StatusStatusEnum } from 'src/app/shared/generated'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckboxModule } from 'primeng/checkbox'

describe('MicroserviceFormComponent', () => {
  let component: MicroserviceFormComponent
  let fixture: ComponentFixture<MicroserviceFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MicroserviceFormComponent],
      imports: [
        ReactiveFormsModule,
        CheckboxModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: UserService, useValue: mockUserService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroserviceFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['metadataName'].value).toBeNull()
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['appId'].value).toBeNull()
    expect(component.formGroup.controls['description'].value).toBeNull()
    expect(component.formGroup.controls['specName'].value).toBeNull()
    expect(component.formGroup.controls['version'].value).toBeNull()
    expect(component.formGroup.controls['productName'].value).toBeNull()
    expect(component.formGroup.controls['type'].value).toBeNull()
  })

  it('should disable form controls in VIEW mode', () => {
    component.changeMode = 'VIEW'
    component.ngOnChanges()
    expect(component.formGroup.disabled).toBeTrue()
  })

  it('should enable form controls in EDIT mode except apiVersion, metadataName, and kind', () => {
    component.changeMode = 'EDIT'
    component.ngOnChanges()
    expect(component.formGroup.enabled).toBeTrue()
    expect(component.formGroup.controls['metadataName'].disabled).toBeTrue()
    expect(component.formGroup.controls['kind'].disabled).toBeTrue()
  })

  it('should fill form with microserviceCrd values', () => {
    const mockMicroserviceCrd: CustomResourceMicroservice = {
      apiVersion: 'v1',
      kind: 'Microservice',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        appId: 'testAppId',
        description: 'testDescription',
        name: 'testSpecName',
        version: 'testVersion',
        productName: 'testProductName',
        type: 'testType'
      },
      status: { status: StatusStatusEnum.Created }
    }
    component.microserviceCrd = mockMicroserviceCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['metadataName'].value).toBe('testName')
    expect(component.formGroup.controls['appId'].value).toBe('testAppId')
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
    expect(component.formGroup.controls['specName'].value).toBe('testSpecName')
    expect(component.formGroup.controls['version'].value).toBe('testVersion')
    expect(component.formGroup.controls['productName'].value).toBe('testProductName')
    expect(component.formGroup.controls['type'].value).toBe('testType')
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(MicroserviceFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.mm.yy')
    expect(component.timeFormat).toEqual('24')
  })
})
