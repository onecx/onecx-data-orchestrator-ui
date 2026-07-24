import { Component, Input } from '@angular/core'
import { Update } from '../crd-detail.component'
import { CommonModule } from '@angular/common'
import { BadgeModule } from 'primeng/badge'

@Component({
  selector: 'app-update-history',
  imports: [BadgeModule, CommonModule],
  templateUrl: './update-history.component.html'
})
export class UpdateHistoryComponent {
  @Input() public updateHistory: Update[] | undefined
  @Input() public dateFormat: string | undefined

  public objectKeys = Object.keys

  constructor() {}
}
