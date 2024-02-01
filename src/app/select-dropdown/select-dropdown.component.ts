import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  @Input() options: any[] = []; // Input data for dropdown options
  @Input() displayField: string = ''; // Input to specify the field to display

  // Add other properties and methods as needed

  constructor() { }
}