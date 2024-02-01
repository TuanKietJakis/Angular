import { NgModule } from '@angular/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DbsSelectDropdownComponent } from './dbs-select-dropdown.component';

@NgModule({
  declarations: [DbsSelectDropdownComponent],
  imports: [SelectDropDownModule],
  exports: [DbsSelectDropdownComponent],
  providers: [],
})
export class SelectDropdownModule {}
