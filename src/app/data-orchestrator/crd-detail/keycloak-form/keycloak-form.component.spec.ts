import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { KeycloakFormComponent } from './keycloak-form.component'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { CheckboxModule } from 'primeng/checkbox'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceKeycloakClient, StatusStatusEnum } from 'src/app/shared/generated'

describe('KeycloakFormComponent', () => {
  let component: KeycloakFormComponent
  let fixture: ComponentFixture<KeycloakFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KeycloakFormComponent],
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
    fixture = TestBed.createComponent(KeycloakFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['name'].value).toBeNull()
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['basePath'].value).toBeNull()
    expect(component.formGroup.controls['description'].value).toBeNull()
    expect(component.formGroup.controls['realm'].value).toBeNull()
    expect(component.formGroup.controls['type'].value).toBeNull()
    expect(component.formGroup.controls['bearerOnly'].value).toBeNull()
    expect(component.formGroup.controls['clientAuthenticatorType'].value).toBeNull()
    expect(component.formGroup.controls['clientId'].value).toBeNull()
    expect(component.formGroup.controls['directAccessGrantsEnabled'].value).toBeNull()
    expect(component.formGroup.controls['enabled'].value).toBeNull()
    expect(component.formGroup.controls['implicitFlowEnabled'].value).toBeNull()
    expect(component.formGroup.controls['protocol'].value).toBeNull()
    expect(component.formGroup.controls['publicClient'].value).toBeNull()
    expect(component.formGroup.controls['serviceAccountsEnabled'].value).toBeNull()
    expect(component.formGroup.controls['standardFlowEnabled'].value).toBeNull()
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

  it('should fill form with keycloakClientCrd values', () => {
    const mockKeycloakClientCrd: CustomResourceKeycloakClient = {
      apiVersion: 'v1',
      kind: 'KeycloakClient',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        realm: 'testRealm',
        type: 'testType'
      },
      status: { status: StatusStatusEnum.Created }
    }
    component.keycloakClientCrd = mockKeycloakClientCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['realm'].value).toBe('testRealm')
    expect(component.formGroup.controls['type'].value).toBe('testType')
  })
})
