import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { BehaviorSubject } from 'rxjs'

import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'

import { CustomResourceDatabase, StatusStatusEnum } from 'src/app/shared/generated'
import { DatabaseFormComponent } from './database-form.component'

describe('DatabaseFormComponent', () => {
  let component: DatabaseFormComponent
  let fixture: ComponentFixture<DatabaseFormComponent>
  const mockUserService = {
    lang$: new BehaviorSubject<string>('de')
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        DatabaseFormComponent,
        ReactiveFormsModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] }
        })
      ],
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: UserService, useValue: mockUserService }]
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
})
