import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ProductFormComponent } from './product-form.component'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceProduct } from 'src/app/shared/generated'
import { ReactiveFormsModule } from '@angular/forms'

describe('ProductFormComponent', () => {
  let component: ProductFormComponent
  let fixture: ComponentFixture<ProductFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
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
    fixture = TestBed.createComponent(ProductFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['metadataName'].value).toBeNull()
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['basePath'].value).toBeNull()
    expect(component.formGroup.controls['description'].value).toBeNull()
    expect(component.formGroup.controls['displayName'].value).toBeNull()
    expect(component.formGroup.controls['iconName'].value).toBeNull()
    expect(component.formGroup.controls['imageUrl'].value).toBeNull()
    expect(component.formGroup.controls['specName'].value).toBeNull()
    expect(component.formGroup.controls['provider'].value).toBeNull()
    expect(component.formGroup.controls['version'].value).toBeNull()
  })

  it('should disable form controls in VIEW mode', () => {
    component.changeMode = 'VIEW'
    component.ngOnChanges()
    expect(component.formGroup.disabled).toBeTrue()
  })

  it('should enable form controls in EDIT mode except metadataName, kind, and version', () => {
    component.changeMode = 'EDIT'
    component.ngOnChanges()
    expect(component.formGroup.enabled).toBeTrue()
    expect(component.formGroup.controls['metadataName'].disabled).toBeTrue()
    expect(component.formGroup.controls['kind'].disabled).toBeTrue()
    expect(component.formGroup.controls['version'].disabled).toBeTrue()
  })

  it('should fill form with productCrd values', () => {
    const mockProductCrd: CustomResourceProduct = {
      apiVersion: 'v1',
      kind: 'Product',
      metadata: { name: 'testName', namespace: '' },
      spec: {
        basePath: 'testBasePath',
        description: 'testDescription',
        displayName: 'testDisplayName',
        iconName: 'testIconName',
        imageUrl: 'testImageUrl',
        name: 'testSpecName',
        provider: 'testProvider',
        version: 'testVersion'
      }
    }
    component.productCrd = mockProductCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['metadataName'].value).toBe('testName')
    expect(component.formGroup.controls['basePath'].value).toBe('testBasePath')
    expect(component.formGroup.controls['description'].value).toBe('testDescription')
    expect(component.formGroup.controls['displayName'].value).toBe('testDisplayName')
    expect(component.formGroup.controls['iconName'].value).toBe('testIconName')
    expect(component.formGroup.controls['imageUrl'].value).toBe('testImageUrl')
    expect(component.formGroup.controls['specName'].value).toBe('testSpecName')
    expect(component.formGroup.controls['provider'].value).toBe('testProvider')
    expect(component.formGroup.controls['version'].value).toBe('testVersion')
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(ProductFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.mm.yy')
    expect(component.timeFormat).toEqual('24')
  })
})
