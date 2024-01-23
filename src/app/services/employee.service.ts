import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SweetAlertService } from './sweetalert.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient, private sweetAlertService: SweetAlertService) { }

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  UpdateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.sweetAlertService.confirmDelete().then((result) => {
        if (result.isConfirmed) {
          this._http.delete(`http://localhost:3000/employees/${id}`).subscribe(
            () => {
              observer.next(true); // Người dùng xác nhận xóa
              observer.complete();
            },
            (error) => observer.error(error)
          );
        } else {
          observer.next(false); // Người dùng hủy xóa
          observer.complete();
        }
      });
    });
  }
}