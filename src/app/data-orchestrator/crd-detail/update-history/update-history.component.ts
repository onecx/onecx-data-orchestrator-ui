import { Component, Input } from '@angular/core'
import { UserService } from '@onecx/angular-integration-interface'
import { Update } from '../crd-detail.component'

@Component({
  selector: 'app-update-history',
  templateUrl: './update-history.component.html'
})
export class UpdateHistoryComponent {
  @Input() public updateHistory: Update[] | undefined
  public dateFormat: string
  objectKeys = Object.keys

  constructor(private readonly user: UserService) {
    this.dateFormat = this.user.lang$.getValue() === 'de' ? 'dd.MM.yy HH:mm:ss' : 'MM/dd/yy HH:mm:ss'
  }
}
