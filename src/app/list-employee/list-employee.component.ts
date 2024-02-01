import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})

export class ListEmployeeComponent implements OnInit {
  selectedCompany: string | undefined;
  displayedColumns: string[] = [
    'code',
    'loginID',
    'identity',
    'action1',
    'action2',
  ];
  // Dữ liệu nguồn cho bảng
  dataSource!: MatTableDataSource<any>;
  // Tham chiếu đến paginator và sort trong bảng
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private router: Router
  ) { }

  // Lifecycle hook - được gọi khi component được tạo
  ngOnInit(): void {
    this.getEmployeeList();
  }
  // Lấy danh sách nhân viên
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        // Cập nhật dữ liệu nguồn và sắp xếp, phân trang cho bảng
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  // Áp dụng bộ lọc cho bảng khi có sự kiện nhập liệu
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  get uniqueOrganization(): string[] {
    const organization: string[] = [];
    this.dataSource.data.forEach((row: any) => {
      if (!organization.includes(row.organization)) {
        organization.push(row.organization);
      }
    });
    console.log('Unique organization :', organization);
    return organization;
  }
  getColumnValues(columnName: string): any[] {
    const columnValues: any[] = [];

    // Lặp qua mỗi đối tượng trong mảng data
    this.dataSource.data.forEach((row: any) => {
      // Kiểm tra xem đối tượng có thuộc tính columnName không
      if (row.hasOwnProperty(columnName)) {
        // Thêm giá trị của cột vào mảng columnValues
        columnValues.push(row[columnName]);
      } else {
        // Nếu không có thuộc tính columnName, có thể xử lý hoặc bỏ qua tùy thuộc vào yêu cầu
        console.warn(`Object does not have property: ${columnName}`);
      }
    });

    return columnValues;
  }
  get uniqueCompanies(): string[] {
    const companies: string[] = [];
    this.dataSource.data.forEach((row: any) => {
      if (!companies.includes(row.company)) {
        companies.push(row.company);
      }
    });
    console.log('Unique Companies:', companies);
    return companies;
  }
  applyCompanyFilter() {
    if (!this.selectedCompany) {
      // Nếu không có công ty nào được chọn, đặt giá trị của selectedCompany là ''
      this.selectedCompany = '';
    }

    // Lọc dữ liệu theo công ty được chọn
    this.dataSource.filter = this.selectedCompany.trim().toLowerCase();

    // Đặt lại trang về trang đầu tiên
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Xóa nhân viên theo ID
  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (confirmed) => {
        if (confirmed) {
          this._coreService.openSnackBar('Employee deleted!', 'done');
          this.getEmployeeList();
        } else {
          // Người dùng đã cancel, không làm gì cả
        }
      },
      error: console.log,
    });
  }
  // Mở dialog để chỉnh sửa thông tin nhân viên
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val: any) => {
        console.log(val);
        this.getEmployeeList();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  openAddEditEmpForm() {
    this.router.navigate(['/create-employee']);
  }

}
