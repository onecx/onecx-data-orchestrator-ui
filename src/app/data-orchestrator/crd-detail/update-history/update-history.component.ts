import { DatePipe } from '@angular/common'
import { Component, Input } from '@angular/core'
import { BadgeModule } from 'primeng/badge'

import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-update-history',
  imports: [BadgeModule, DatePipe],
  templateUrl: './update-history.component.html'
})
export class UpdateHistoryComponent {
  @Input() public updateHistory: Update[] | undefined
  @Input() public dateFormat: string | undefined

  public objectKeys = Object.keys

  constructor() {}
}
