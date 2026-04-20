import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HttpClient } from '@angular/common/http'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { createTranslateLoader } from '@onecx/angular-utils'
import { StatusTabComponent } from './status-tab.component'
import { StatusStatusEnum } from 'src/app/shared/generated'

describe('StatusTabComponent', () => {
  let component: StatusTabComponent
  let fixture: ComponentFixture<StatusTabComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatusTabComponent],
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
    fixture = TestBed.createComponent(StatusTabComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  describe('getSeverity', () => {
    it('should return warning when status is undefined', () => {
      expect(component.getSeverity(undefined)).toBe('warning')
    })

    it('should return success for CREATED status', () => {
      expect(component.getSeverity(StatusStatusEnum.Created)).toBe('success')
    })

    it('should return success for UPDATED status', () => {
      expect(component.getSeverity(StatusStatusEnum.Updated)).toBe('success')
    })

    it('should return danger for ERROR status', () => {
      expect(component.getSeverity(StatusStatusEnum.Error)).toBe('danger')
    })

    it('should return warning for UNDEFINED status', () => {
      expect(component.getSeverity(StatusStatusEnum.Undefined)).toBe('warning')
    })
  })
})
