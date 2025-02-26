import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { UpdateHistoryComponent } from './update-history.component'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-accelerator'
import { AppStateService, UserService } from '@onecx/angular-integration-interface'
import { ReactiveFormsModule } from '@angular/forms'

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
