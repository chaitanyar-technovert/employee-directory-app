import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmpInfoDisplayComponent } from './emp-info-display/emp-info-display.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees', component: EmpInfoDisplayComponent, children: [
      {
        path: 'create',
        component: EmpAddEditComponent
      },
      {
        path: ':action/:id',
        component: EmpInfoDisplayComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }