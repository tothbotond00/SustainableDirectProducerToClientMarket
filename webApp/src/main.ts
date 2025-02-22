import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

const providers = [
  { provide: 'BASE_URL', useValue: 'https://localhost:7100/' }
  // { provide: 'BASE_URL', useValue: 'https://sdptcm-api.azurewebsites.net/' }
]

platformBrowserDynamic(providers).bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
