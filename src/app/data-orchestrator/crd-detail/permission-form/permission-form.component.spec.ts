import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { PermissionFormComponent } from './permission-form.component'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-accelerator'
import { AppStateService, UserService } from '@onecx/angular-integration-interface'
import { CustomResourcePermission, StatusStatusEnum } from 'src/app/shared/generated'
import { ReactiveFormsModule } from '@angular/forms'

describe('PermissionFormComponent', () => {
  let component: PermissionFormComponent
  let fixture: ComponentFixture<PermissionFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient, AppStateService]
          }
        })
      ],
      providers: [{ provide: UserService, useValue: mockUserService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormComponent)
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

  it('should fill form with permissionCrd values', () => {
    const mockPermissionCrd: CustomResourcePermission = {
      apiVersion: 'v1',
      kind: 'Permission',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        appId: 'testAppId',
        description: 'testDescription',
        name: 'testSpecName',
        productName: 'testProductName'
      },
      status: { status: StatusStatusEnum.Created }
    }
    component.permissionCrd = mockPermissionCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['metadataName'].value).toBe('testName')
    expect(component.formGroup.controls['appId'].value).toBe('testAppId')
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
    expect(component.formGroup.controls['productName'].value).toBe('testProductName')
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(PermissionFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.mm.yy')
    expect(component.timeFormat).toEqual('24')
  })
})
