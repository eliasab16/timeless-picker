import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { TimePickerComponent } from "./app/timeless-picker/components/pages/time-picker/time-picker.component";
import { BasePickerComponent} from "./app/timeless-picker/components/pages/base-picker/base-picker.component";
import { TimelessContainerComponent } from "./app/timeless-picker/components/templates/timeless-container/timeless-container.component";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export { TimePickerComponent }
export { BasePickerComponent }
export { TimelessContainerComponent }
