import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { HeaderComponent } from './header/header.component';
import { SidebarSearchComponent } from './sidebar-search/sidebar-search.component';
import { PaginationSearchComponent } from './pagination-search/pagination-search.component';
import { EmpInfoDisplayComponent } from './emp-info-display/emp-info-display.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmpDeleteConfirmComponent } from './emp-delete-confirm/emp-delete-confirm.component';
import { DepartmentsComponent } from './departments/departments.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpAddEditComponent,
    HeaderComponent,
    SidebarSearchComponent,
    PaginationSearchComponent,
    EmpInfoDisplayComponent,
    EmployeeCardComponent,
    EmpDeleteConfirmComponent,
    DepartmentsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    // Angular Material
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
