import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { CheckboxModule } from 'primeng/checkbox'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceMicrofrontend, StatusStatusEnum } from 'src/app/shared/generated'
import { MicrofrontendFormComponent } from './microfrontend-form.component'

describe('MicrofrontendFormComponent', () => {
  let component: MicrofrontendFormComponent
  let fixture: ComponentFixture<MicrofrontendFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MicrofrontendFormComponent],
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
    fixture = TestBed.createComponent(MicrofrontendFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['name'].value).toBeNull()
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['appId'].value).toBeNull()
    expect(component.formGroup.controls['appName'].value).toBeNull()
    expect(component.formGroup.controls['appVersion'].value).toBeNull()
    expect(component.formGroup.controls['contact'].value).toBeNull()
    expect(component.formGroup.controls['deprecated'].value).toBeNull()
    expect(component.formGroup.controls['description'].value).toBeNull()
    expect(component.formGroup.controls['exposedModule'].value).toBeNull()
    expect(component.formGroup.controls['iconName'].value).toBeNull()
    expect(component.formGroup.controls['note'].value).toBeNull()
    expect(component.formGroup.controls['productName'].value).toBeNull()
    expect(component.formGroup.controls['remoteBaseUrl'].value).toBeNull()
    expect(component.formGroup.controls['remoteEntry'].value).toBeNull()
    expect(component.formGroup.controls['remoteName'].value).toBeNull()
    expect(component.formGroup.controls['tagName'].value).toBeNull()
    expect(component.formGroup.controls['technology'].value).toBeNull()
    expect(component.formGroup.controls['type'].value).toBeNull()
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

  it('should fill form with microfrontendCrd values', () => {
    const mockMicrofrontendCrd: CustomResourceMicrofrontend = {
      apiVersion: 'v1',
      kind: 'Microfrontend',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        appId: 'testAppId',
        appName: 'testAppName',
        appVersion: 'testAppVersion',
        contact: 'testContact',
        deprecated: true,
        description: 'testDescription',
        exposedModule: 'testExposedModule',
        iconName: 'testIconName',
        note: 'testNote',
        productName: 'testProductName',
        remoteBaseUrl: 'testRemoteBaseUrl',
        remoteEntry: 'testRemoteEntry',
        remoteName: 'testRemoteName',
        tagName: 'testTagName',
        technology: 'testTechnology'
      },
      status: { status: StatusStatusEnum.Created }
    }
    component.microfrontendCrd = mockMicrofrontendCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['name'].value).toBe('testName')
    expect(component.formGroup.controls['appId'].value).toBe('testAppId')
    expect(component.formGroup.controls['appName'].value).toBe('testAppName')
    expect(component.formGroup.controls['appVersion'].value).toBe('testAppVersion')
    expect(component.formGroup.controls['contact'].value).toBe('testContact')
    expect(component.formGroup.controls['deprecated'].value).toBeTrue()
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
    expect(component.formGroup.controls['exposedModule'].value).toBe('testExposedModule')
    expect(component.formGroup.controls['iconName'].value).toBe('testIconName')
    expect(component.formGroup.controls['note'].value).toBe('testNote')
    expect(component.formGroup.controls['productName'].value).toBe('testProductName')
    expect(component.formGroup.controls['remoteBaseUrl'].value).toBe('testRemoteBaseUrl')
    expect(component.formGroup.controls['remoteEntry'].value).toBe('testRemoteEntry')
    expect(component.formGroup.controls['remoteName'].value).toBe('testRemoteName')
    expect(component.formGroup.controls['tagName'].value).toBe('testTagName')
    expect(component.formGroup.controls['technology'].value).toBe('testTechnology')
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(MicrofrontendFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.mm.yy')
    expect(component.timeFormat).toEqual('24')
  })
})
