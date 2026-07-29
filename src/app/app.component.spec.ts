import { TestBed } from '@angular/core/testing'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { MessageService } from 'primeng/api'

import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppComponent,
        TranslateTestingModule.withTranslations({
          en: require('src/assets/i18n/en.json'),
          de: require('src/assets/i18n/de.json')
        }).withDefaultLanguage('en')
      ],
      providers: [MessageService, provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'onecx-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app.title).toEqual('onecx-ui')
  })
})
