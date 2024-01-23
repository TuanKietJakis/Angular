import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent {
  @Input() items: any[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  // Các thuộc tính và phương thức tùy chỉnh khác nếu cần thiết

  onDropdownChange(event: any) {
    // Xử lý khi giá trị thay đổi
    this.selectionChange.emit(event.value);
  }
}