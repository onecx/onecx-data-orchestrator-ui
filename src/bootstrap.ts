import { bootstrapModule } from '@onecx/angular-webcomponents'
import { environment } from 'src/environments/environment'
import { OneCXDataOrchestratorModule } from './app/onecx-data-orchestrator-remote.module'

bootstrapModule(OneCXDataOrchestratorModule, 'microfrontend', environment.production)
