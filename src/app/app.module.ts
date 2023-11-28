import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CouponsComponent } from './components/coupons/coupons.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpdateComponent } from './components/update/update.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddComponent } from './components/add/add.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DatePipe } from '@angular/common';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CouponsComponent,
    AddComponent,
    NavbarComponent,
    HomeComponent,
    UpdateComponent,
    AddComponent,
    LoaderComponent,

  ],
  imports: [
    
    MatRadioModule,
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule, RouterModule
  ],
  providers: [
    DatePipe,
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






