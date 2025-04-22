import { Component, Input } from '@angular/core'

import { Status, StatusStatusEnum } from 'src/app/shared/generated'

type Severity = 'success' | 'warning' | 'danger'

@Component({
  selector: 'app-status-tab',
  templateUrl: './status-tab.component.html',
  styleUrls: ['./status-tab.component.scss']
})
export class StatusTabComponent {
  @Input() public status: Status | undefined

  constructor() {}

  public getSeverity(status: StatusStatusEnum | undefined): Severity {
    if (!status) return 'warning'
    switch (status) {
      case StatusStatusEnum.Created:
      case StatusStatusEnum.Updated:
        return 'success'
      case StatusStatusEnum.Error:
        return 'danger'
      case StatusStatusEnum.Undefined:
        return 'warning'
    }
  }
}
