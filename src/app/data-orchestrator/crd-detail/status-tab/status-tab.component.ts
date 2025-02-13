import { Component, Input } from '@angular/core'
import { Status } from 'src/app/shared/generated'

@Component({
  selector: 'app-status-tab',
  templateUrl: './status-tab.component.html'
})
export class StatusTabComponent {
  @Input() public status: Status | undefined

  constructor() {}
}
