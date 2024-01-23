import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  // Khai báo biến empForm kiểu FormGroup
  empForm!: FormGroup<any>;

  // Mảng chứa các tùy chọn cho trường 'education' trong form
  education: string[] = [
    'Matric',
    'Diploma',
    'Internmediate',
    'Graduate',
    'Post Graduate'
  ];

  // Constructor - khởi tạo các dependency
  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    // Tạo form group và định nghĩa các trường của nó
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  // Lifecycle hook - được gọi khi component được tạo
  ngOnInit(): void {
    // Đặt giá trị của form dựa trên dữ liệu đầu vào
    this.empForm.patchValue(this.data);
  }

  // Xử lý khi form được submit
  onFormSubmit() {
    // Kiểm tra xem form có hợp lệ không
    if (this.empForm.valid) {
      // Nếu có dữ liệu đầu vào (this.data tồn tại), là trường hợp cập nhật
      if (this.data) {
        this._empService
          .UpdateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              // Hiển thị thông báo và đóng dialog khi cập nhật thành công
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
              console.log(val);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        // Trường hợp thêm mới
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // Hiển thị thông báo và đóng dialog khi thêm mới thành công
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
            console.log(val);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
    }
  }
}
