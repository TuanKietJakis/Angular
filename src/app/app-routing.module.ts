import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';






// const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent,
//     children: [

//       { path: 'list-employee', component: ListEmployeeComponent },
//       { path: 'create-employee', component: CreateEmployeeComponent },
//     ]
// }
// ];



const routes: Routes = [
  { path: '', redirectTo: '/list-employee', pathMatch: 'full' }, // Redirect to 'list-employee' by default
  { path: 'list-employee', component: ListEmployeeComponent },
  { path: 'create-employee', component: CreateEmployeeComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}