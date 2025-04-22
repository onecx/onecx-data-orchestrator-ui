import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { CheckboxModule } from 'primeng/checkbox'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceSlot } from 'src/app/shared/generated'
import { SlotFormComponent } from './slot-form.component'

describe('SlotFormComponent', () => {
  let component: SlotFormComponent
  let fixture: ComponentFixture<SlotFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SlotFormComponent],
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
    fixture = TestBed.createComponent(SlotFormComponent)
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
    expect(component.formGroup.controls['deprecated'].value).toBeNull()
    expect(component.formGroup.controls['productName'].value).toBeNull()
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
    expect(component.formGroup.controls['metadataName'].disabled).toBeTrue()
    expect(component.formGroup.controls['kind'].disabled).toBeTrue()
  })

  it('should fill form with slotCrd values', () => {
    const mockSlotCrd: CustomResourceSlot = {
      apiVersion: 'v1',
      kind: 'Slot',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        appId: 'testAppId',
        description: 'testDescription',
        name: 'testSpecName',
        deprecated: false,
        productName: 'testProductName'
      }
    }
    component.slotCrd = mockSlotCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['metadataName'].value).toBe('testName')
    expect(component.formGroup.controls['appId'].value).toBe('testAppId')
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
    expect(component.formGroup.controls['specName'].value).toBe('testSpecName')
    expect(component.formGroup.controls['deprecated'].value).toBe(false)
    expect(component.formGroup.controls['productName'].value).toBe('testProductName')
  })
})
