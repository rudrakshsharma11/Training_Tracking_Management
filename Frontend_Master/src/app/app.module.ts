import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavabrComponent } from './Component/Admin/navabr/navabr.component';
import { AddCourseComponent } from './Component/Admin/add-course/add-course.component';
import { AddProgramComponent } from './Component/Admin/add-program/add-program.component';
import { AddStudentsComponent } from './Component/Admin/add-students/add-students.component';
import { AddTeacherComponent } from './Component/Admin/add-teacher/add-teacher.component';
import { AddTopicComponent } from './Component/Admin/add-topic/add-topic.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';

import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import { AddBatchComponent } from './Component/Admin/add-batch/add-batch.component';
import { LoginComponent } from './Component/Login/login/login.component';
import { HomeComponent } from './Component/Teacher/home/home.component';
import { AttendanceComponent } from './Component/Teacher/attendance/attendance.component';
import { NavbarComponent } from './Component/Teacher/navbar/navbar.component';
import { BatchProgramComponent } from './Component/Teacher/batch-program/batch-program.component';
import { ExamComponent } from './Component/Teacher/exam/exam.component';
import { ExamTableComponent } from './Component/Teacher/exam-table/exam-table.component';
import { AssigmentComponent } from './Component/Teacher/assigment/assigment.component';
import { AssignTableComponent } from './Component/Teacher/assign-table/assign-table.component';


@NgModule({
  declarations: [
    AppComponent,
    NavabrComponent,
    AddCourseComponent,
    AddProgramComponent,
    AddStudentsComponent,
    AddTeacherComponent,
    AddTopicComponent,
    AddBatchComponent,
    LoginComponent,
    HomeComponent,
    AttendanceComponent,
    NavbarComponent,
    BatchProgramComponent,
    ExamComponent,
    ExamTableComponent,
    AssigmentComponent,
    AssignTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
    MatGridListModule,
    MatSelectModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
