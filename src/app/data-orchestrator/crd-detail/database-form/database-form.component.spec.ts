import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { DatabaseFormComponent } from './database-form.component'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { CustomResourceDatabase, StatusStatusEnum } from 'src/app/shared/generated'
import { ReactiveFormsModule } from '@angular/forms'

describe('DatabaseFormComponent', () => {
  let component: DatabaseFormComponent
  let fixture: ComponentFixture<DatabaseFormComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseFormComponent],
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
    fixture = TestBed.createComponent(DatabaseFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize form group with default values', () => {
    expect(component.formGroup.controls['metadataName'].value).toBeNull()
    expect(component.formGroup.controls['kind'].value).toBeNull()
    expect(component.formGroup.controls['host'].value).toBeNull()
    expect(component.formGroup.controls['specName'].value).toBeNull()
    expect(component.formGroup.controls['schema'].value).toBeNull()
    expect(component.formGroup.controls['user'].value).toBeNull()
    expect(component.formGroup.controls['user_search_path'].value).toBeNull()
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

  it('should fill form with databaseCrd values', () => {
    const mockDatabaseCrd: CustomResourceDatabase = {
      apiVersion: 'v1',
      kind: 'Database',
      metadata: { name: 'testName', namespace: '' },
      spec: { name: 'testSpecName', schema: 'testSchema' },
      status: { status: StatusStatusEnum.Created }
    }
    component.databaseCrd = mockDatabaseCrd
    component.ngOnChanges()
    expect(component.formGroup.controls['metadataName'].value).toBe('testName')
    expect(component.formGroup.controls['specName'].value).toBe('testSpecName')
    expect(component.formGroup.controls['schema'].value).toBe('testSchema')
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(DatabaseFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.mm.yy')
    expect(component.timeFormat).toEqual('24')
  })
})
