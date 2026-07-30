import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StandaloneShellModule } from '@onecx/angular-standalone-shell'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  imports: [StandaloneShellModule]
})
export class AppComponent {
  title = 'onecx-ui'
}
