import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourcePermission, StatusStatusEnum } from 'src/app/shared/generated'
import { PermissionFormComponent } from './permission-form.component'

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
    fixture = TestBed.createComponent(PermissionFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  describe('initialize', () => {
    it('should create', () => {
      expect(component).toBeTruthy()
    })

    it('should initialize form group with default values', () => {
      expect(component.formGroup.controls['metadataName'].value).toBeNull()
      expect(component.formGroup.controls['kind'].value).toBeNull()
      expect(component.formGroup.controls['productName'].value).toBeNull()
      expect(component.formGroup.controls['appId'].value).toBeNull()
      expect(component.formGroup.controls['description'].value).toBeNull()
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
        productName: 'testProductName',
        permissions: {
          PERMISSION: {
            VIEW: 'View user permissions'
          }
        }
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
})
