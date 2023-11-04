import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './Component/Admin/add-course/add-course.component';
import { AddProgramComponent } from './Component/Admin/add-program/add-program.component';
import { AddTopicComponent } from './Component/Admin/add-topic/add-topic.component';
import { AddTeacherComponent } from './Component/Admin/add-teacher/add-teacher.component';
import { AddStudentsComponent } from './Component/Admin/add-students/add-students.component';
import { AddBatchComponent } from './Component/Admin/add-batch/add-batch.component';
import { HomeComponent } from './Component/Teacher/home/home.component';
import { LoginComponent } from './Component/Login/login/login.component';
import { ExamComponent } from './Component/Teacher/exam/exam.component';
import { AssigmentComponent } from './Component/Teacher/assigment/assigment.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'admin',component:AddCourseComponent},
  {path:'admin/course',component:AddCourseComponent},
  {path:'admin/program',component:AddProgramComponent},
  {path:'admin/add-topic/:courseId/:courseCode',component:AddTopicComponent},
  {path:'admin/teacher',component:AddTeacherComponent},
  {path:'admin/student',component:AddStudentsComponent},
  {path:'admin/batch',component:AddBatchComponent},

  {path:'home',component:HomeComponent},
  {path:'exam',component:ExamComponent},
  {path:'assignment',component:AssigmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
