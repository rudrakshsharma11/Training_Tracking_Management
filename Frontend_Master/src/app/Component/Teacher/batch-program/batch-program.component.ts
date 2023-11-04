import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-batch-program',
  templateUrl: './batch-program.component.html',
  styleUrls: ['./batch-program.component.css']
})
export class BatchProgramComponent implements OnInit {
  programIdBatch: string | null; // Initialize the variable
 
  coursedatamain:any;
  coursedatamain1:any;
 
  constructor() {
    // Retrieve "ProgramId_batch" from local storage in the constructor
    this.programIdBatch = localStorage.getItem("ProgramId_batch");
  }
 
  ngOnInit(): void {
    // You can access this.programIdBatch within your component after it's retrieved from local storage.
    if (this.programIdBatch) {
      console.log("ProgramId_batch from Local:", this.programIdBatch);
    } else {
      console.log("ProgramId_batch is not set in local storage.");
    }
 
    // this.getAllCourseListMain(this.programIdBatch);
    this.getAllCourseListbatch(this.programIdBatch);
  }
 
  // getAllCourseListMain(id: any) {
  //   axios
  //     .get(`${environment.apiURL}/attendance/allCourses/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       this.coursedatamain = response.data;
  //       console.log('coursedata from batch', this.coursedatamain);
 
  //       // Assuming the response data is an array, you can access the courseId as follows
  //       if (this.coursedatamain && this.coursedatamain.length > 0) {
  //         const firstCourse = this.coursedatamain[0];
  //         if (firstCourse.courseId) {
  //           const courseId = firstCourse.courseId;
  //           console.log("Course Id from Batch", courseId);
 
  //           // If you want to store it in a variable, you can do so here
  //           // this.storedCourseId = courseId;
  //         } else {
  //           console.log("Course Id not found in the response");
  //         }
  //       } else {
  //         console.log("No course data found in the response");
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle any errors here
  //       console.error('Error:', error);
  //     });
  // }
 
 
 
 
 
  getAllCourseListbatch(id:any) {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/program/topics/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.coursedatamain1 = response.data;
        console.log(' ALL coursedata from batch', this.coursedatamain1);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
}
