import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { UserService } from '@onecx/angular-integration-interface'
import { UpdateHistoryComponent } from './update-history.component'

describe('UpdateHistoryComponent', () => {
  let component: UpdateHistoryComponent
  let fixture: ComponentFixture<UpdateHistoryComponent>
  const mockUserService = {
    lang$: {
      getValue: jasmine.createSpy('getValue')
    }
  }
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHistoryComponent],
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
    fixture = TestBed.createComponent(UpdateHistoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  /**
   * Language tests
   */
  it('should set german date format', () => {
    mockUserService.lang$.getValue.and.returnValue('de')
    fixture = TestBed.createComponent(UpdateHistoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    expect(component.dateFormat).toEqual('dd.MM.yy HH:mm:ss')
  })
})
