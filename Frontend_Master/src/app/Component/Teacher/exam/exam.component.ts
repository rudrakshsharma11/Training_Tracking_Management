import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { ExamTableComponent } from '../exam-table/exam-table.component';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam',

  templateUrl: './exam.component.html',

  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  batchId: any;
  batchdata: any;
  programId: any;
  programdata: any;
  courseCode1: any;
  coursedata: any;
  courseId: any;
  constructor() {}

  ngOnInit(): void {
    this.getAllBatchList();

  }

  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;
  form5 = false;

  clicked = '';

  Click(value: string): void {
    this.clicked = value;

    this.form2 = true;
    this.form3 = true;
  }

  Click1(value: string): void {
    this.clicked = value;

    this.form2 = true;

    this.form3 = true;
    this.form4 = true;
  }

  Click2(value: string): void {
    this.clicked = value;

    this.form2 = true;

    this.form3 = true;

    this.form4 = true;
    this.form5 = true;
  }

  Click3(value: string): void {
    this.clicked = value;

    this.form2 = true;

    this.form3 = true;

    this.form4 = true;

    this.form5 = true;
  }

  getAllBatchList() {
    // axios
    //   .get(`${environment.apiURL}/attendance/batch/show/all`,{
    //     headers:{
    //       'Authorization':"bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGFybWFAMTIzIiwiaWF0IjoxNjk5MDc4MjkxLCJleHAiOjE2OTkwODU0OTF9.AJ1iuvu0zXitQyw_AZqMBfMgocXO00V0JjqMt3Uhp4Q"
    //     }
    //   })
    //   .then((response) => {
    //     // Handle the successful response here
    //     this.batchdata = response.data;
    //     console.log('this.batchdata', this.batchdata);
    //   })
    const token =localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    };
    axios
    .get('http://localhost:2023/attendance/batches/show/all', config)
    .then((response) => {
      console.log('Response:', response);
      console.log('Response data:', response.data);
      this.batchdata = response.data;
      console.log('this.programdata for attendance', this.batchdata);
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error:', error);
    });
  
  }

  batchDateClick() {
    const selectElement: any = document.querySelector('#example1');
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.batchId = output;
    console.log('BatchId', this.batchId);

    // Store batchId in local storage
    localStorage.setItem('batchId', this.batchId);

    if (this.batchId) {
      this.getAllProgramList(output);
    }
    const selectedBatch = this.batchdata.find(
      (batchData: any) => batchData.batchId == parseInt(output)
    );
    if (selectedBatch) {
      this.batchName = selectedBatch.batchStartdate ?? '';
      console.log('Attdence Batch Date:', this.batchName);
    }
  }
  batchName(arg0: string, batchName: any) {
    throw new Error('Method not implemented.');
  }

  getAllProgramList(id: any) {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/attendance/programsByBatch/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.programdata = response.data;
        console.log('this.programdata', this.programdata);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  programDateClick() {
    const selectElement: any = document.querySelector(
      '#example2'
    );
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.programId = output;
    console.log('program_id', output);
     // Store batchId in local storage
     localStorage.setItem('programId_exam', this.programId);

    if (this.programId) {
      this.getAllCourseList(output);
    }
    const selectedBatch = this.programdata.find(
      (programdata: any) => programdata.programId == parseInt(output)
    );
    // if (selectedBatch) {
    //   this.batchName = selectedBatch.batchStartdate ?? '';
    // }
  }

  getAllCourseList(id: any) {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/attendance/allCourses/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.coursedata = response.data;
        console.log('this.coursedata', this.coursedata);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  courseDateClick() {
    const selectElement: any = document.querySelector(
      '#example3'
    );
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.courseId = output;
    this.form5 = true;
    console.log('course_Id', output);

     // Store batchId in local storage
     localStorage.setItem('courseId_exam', this.courseId);
    // if(this.programId){
    //   this.getAllCourseList(output);
    // }
    const selectedBatch = this.coursedata.find(
      (coursedata: any) => coursedata.courseId == parseInt(output)
    );
    // if (selectedBatch) {
    //   this.batchName = selectedBatch.batchStartdate ?? '';
    // }
  }

  getNullCourseId() {
    const postData = {
      courseCode: this.courseCode1,
    };
    const token = localStorage.getItem('jwtToken');

    axios
      .post(
        `${environment.apiURL}/course/findCourseIdsWithNullProgram`,
        postData,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }
      )
      .then((response) => {
        console.log('POST request successful for Null Course Id');
        console.log('Response data:', response.data);

        // Store the response data in localStorage
        localStorage.setItem('response_exam_data', JSON.stringify(response.data));
      })

      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  }

  @ViewChild('container4', { read: ViewContainerRef, static: true })
  container4!: ViewContainerRef;

  AddTopic() {
    this.container4.clear();

    this.container4.createComponent(ExamTableComponent);
  }
}

