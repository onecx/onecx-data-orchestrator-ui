import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { provideErrorTailorConfig } from '@ngneat/error-tailor'

import { AngularAcceleratorModule, PortalDialogService } from '@onecx/angular-accelerator'

import { AutoCompleteModule } from 'primeng/autocomplete'
import { CheckboxModule } from 'primeng/checkbox'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { ConfirmationService } from 'primeng/api'
import { DialogModule } from 'primeng/dialog'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { DropdownModule } from 'primeng/dropdown'
import { InputTextModule } from 'primeng/inputtext'
import { KeyFilterModule } from 'primeng/keyfilter'
import { ListboxModule } from 'primeng/listbox'
import { MultiSelectModule } from 'primeng/multiselect'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { SelectButtonModule } from 'primeng/selectbutton'
import { TableModule } from 'primeng/table'
import { TabViewModule } from 'primeng/tabview'
import { TagModule } from 'primeng/tag'
import { ToastModule } from 'primeng/toast'
import { TooltipModule } from 'primeng/tooltip'

import { LabelResolver } from './label.resolver'

@NgModule({
  declarations: [],
  imports: [
    AngularAcceleratorModule,
    AutoCompleteModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    KeyFilterModule,
    ListboxModule,
    MultiSelectModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToastModule,
    TooltipModule,
    TranslateModule
  ],
  exports: [
    AutoCompleteModule,
    CheckboxModule,
    CommonModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    FormsModule,
    InputTextModule,
    KeyFilterModule,
    ListboxModule,
    MultiSelectModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TableModule,
    TabViewModule,
    TagModule,
    ToastModule,
    TooltipModule,
    TranslateModule
  ],
  //this is not elegant, for some reason the injection token from primeng does not work across federated module
  providers: [
    ConfirmationService,
    LabelResolver,
    { provide: DialogService, useClass: PortalDialogService },
    provideErrorTailorConfig({
      controlErrorsOn: { async: true, blur: true, change: true },
      errors: {
        useFactory: (i18n: TranslateService) => {
          return {
            required: () => i18n.instant('VALIDATION.ERRORS.EMPTY_REQUIRED_FIELD'),
            maxlength: ({ requiredLength }) =>
              i18n.instant('VALIDATION.ERRORS.MAXIMUM_LENGTH').replace('{{chars}}', requiredLength),
            minlength: ({ requiredLength }) =>
              i18n.instant('VALIDATION.ERRORS.MINIMUM_LENGTH').replace('{{chars}}', requiredLength),
            pattern: () => i18n.instant('VALIDATION.ERRORS.PATTERN_ERROR')
          }
        },
        deps: [TranslateService]
      },
      //this is required because primeng calendar wraps things in an ugly way
      blurPredicate: (element: Element) => {
        return ['INPUT', 'TEXTAREA', 'SELECT', 'CUSTOM-DATE', 'P-CALENDAR', 'P-DROPDOWN'].includes(element.tagName)
      }
    })
  ]
})
export class SharedModule {}
