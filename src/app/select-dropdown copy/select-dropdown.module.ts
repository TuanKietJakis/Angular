import { NgModule } from '@angular/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { SelectDropdownComponent } from './select-dropdown.component';

@NgModule({
  declarations: [SelectDropdownComponent],
  imports: [SelectDropDownModule],
  exports: [SelectDropdownComponent],
  providers: [],
})
export class SelectDropdownModule {}
