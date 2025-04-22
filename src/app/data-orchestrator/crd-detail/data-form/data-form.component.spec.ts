import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'

import { createTranslateLoader } from '@onecx/angular-utils'

import { CustomResourceData, StatusStatusEnum } from 'src/app/shared/generated'
import { DataFormComponent } from './data-form.component'

describe('DataFormComponent', () => {
  let component: DataFormComponent
  let fixture: ComponentFixture<DataFormComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataFormComponent],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['name'].value).toBeNull()
    expect(component.formGroup.controls['appId'].value).toBeNull()
    expect(component.formGroup.controls['description'].value).toBeNull()
    expect(component.formGroup.controls['key'].value).toBeNull()
    expect(component.formGroup.controls['orgId'].value).toBeNull()
    expect(component.formGroup.controls['productName'].value).toBeNull()
    expect(component.formGroup.controls['data'].value).toBeNull()
  })

  it('should disable form controls in VIEW mode', () => {
    component.changeMode = 'VIEW'
    component.ngOnChanges()
    expect(component.formGroup.disabled).toBeTrue()
  })

  it('should enable form controls in EDIT mode except name and kind', () => {
    component.changeMode = 'EDIT'
    component.ngOnChanges()
    expect(component.formGroup.enabled).toBeTrue()
    expect(component.formGroup.controls['name'].disabled).toBeTrue()
    expect(component.formGroup.controls['kind'].disabled).toBeTrue()
  })

  it('should fill form with dataCrd values', () => {
    const mockDataCrd: CustomResourceData = {
      apiVersion: 'v1',
      kind: 'Data',
      metadata: { name: 'testName', namespace: '' },
      spec: { description: 'testDescription' },
      status: { status: StatusStatusEnum.Created }
    }
    component.dataCrd = mockDataCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['name'].value).toBe('testName')
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
  })
})
