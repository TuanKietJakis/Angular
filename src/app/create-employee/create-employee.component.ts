// create-employee.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  empForm: FormGroup;
  submitted = false;


  education: string[] = [
    'Matric',
    'Diploma',
    'Internmediate',
    'Graduate',
    'Post Graduate'
  ];


  constructor( 
       private _fb: FormBuilder,
       private _empService: EmployeeService,  
         private _coreService: CoreService,



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
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFormSubmit() {
    this.submitted = true;

    // Check if the form is valid
    if (this.empForm.valid) {
           // Trường hợp thêm mới
            this._empService.addEmployee(this.empForm.value).subscribe({
            next: (val: any) => {
              // Hiển thị thông báo và đóng dialog khi thêm mới thành công
              this._coreService.openSnackBar('Employee added successfully');
              // this._dialogRef.close(true);
              console.log(val);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      console.log(this.empForm.value);
    }
  }
}