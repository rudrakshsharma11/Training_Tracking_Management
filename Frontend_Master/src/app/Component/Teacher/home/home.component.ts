import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AttendanceComponent } from '../attendance/attendance.component';
import { BatchProgramComponent } from '../batch-program/batch-program.component';
// import * as moment from 'moment';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form1 = true;
  form2 = false;
  form3 = false;
  form4 = false;
  form5 = false;
  clicked = '';

  batchdata: any;
  programdata: any;
  coursedata: any;
  batch: any;
  batchName: string = '';
  batchId: string = '';
  programName: string = '';
  programId: string = '';
  courseName: string = '';
  courseId: string = '';
  courseCode1: string = '';

  batchdata1: any;
  programdata1: any;
  coursedata1: any;
  batch1: any;
  batchName1: string = '';
  batchId1: string = '';
  programName1: string = '';
  programId1: string = '';
  courseName1: string = '';
  courseId1: string = '';
  courseCode2: string = '';

  selectedBatchStartDate: string = ''; // Variable to store the selected batch start date

  Click(value: string): void {
    console.log('1st Input');
    this.clicked = value;
    this.form2 = true;
    this.form3 = true;
  }
  // Click1(value: string): void {

  //   this.clicked = value;
  //   console.log("2st Input");
  //   this.form2 = true;
  //   this.form3 = true;
  // }
  Click2(value: string): void {
    this.clicked = value;
    console.log('3st Input');
    this.form2 = true;
    this.form3 = true;
    this.form4 = true;
  }
  Click3(value: string): void {
    this.clicked = value;
    console.log('4st Input');
    this.form2 = true;
    this.form3 = true;
    this.form4 = true;
    this.form5 = true;
  }

  @ViewChild('container1', { read: ViewContainerRef, static: true })
  container1!: ViewContainerRef;

  AddTopic() {
    this.container1.clear();
    this.container1.createComponent(AttendanceComponent);
  }
  ngOnInit(): void {
    this.getAllBatchList();
    this.getAllBatchList1();
    console.log('This is the parent page');
  }

  batch_date: Date | null = null; // Define batch_date property

  constructor() {
    // Initialize batch_date from local storage if available
    const storedDate = localStorage.getItem('batch_date');
    if (storedDate) {
      this.batch_date = new Date(storedDate);
    }
  }

  // Function to handle date selection changes
  onDateSelected(event: Date) {
    console.log('Date selected:', event);

    if (event) {
      // Store the selected date in local storage as "batch_date"

      if (localStorage.getItem('batch_date')) {
        localStorage.removeItem('batch_date');
        localStorage.setItem('batch_date', event.toISOString());
      } else {
        localStorage.setItem('batch_date', event.toISOString());
      }
    } else {
      // Clear the date from local storage if it's null
      localStorage.removeItem('batch_date');
    }
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
    const selectElement: any = document.querySelector('#education');
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
  test() {
    alert('hello');
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
      '#exampleFormControlSelect1'
    );
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.programId = output;
    console.log('program_id', output);
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
      '#exampleFormControlSelect2'
    );
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.courseCode1 = output;
    this.form5 = true;
    console.log('course_code', output);
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
        localStorage.setItem('response_data', JSON.stringify(response.data));
      })

      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  }

  //--------------------------------------------------------------------------------------------------------------------------------//

  form12 = false;
  form13 = false;
  Click01(value: string): void {
    this.clicked = value;
    console.log('5st Input');
    this.form12 = true;
    this.form13 = true;
  }
  Click11(value: string): void {
    this.clicked = value;
    console.log('6st Input');
    this.form12 = true;
    this.form13 = true;
  }
  Click12(value: string): void {
    this.clicked = value;
    console.log('7st Input');
    this.form12 = true;
    this.form13 = true;
    this.container2.clear();
    this.container2.createComponent(BatchProgramComponent);
  }

  getAllBatchList1() {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/batch/show/all`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.batchdata1 = response.data;
        console.log('this.batchdataProgram', this.batchdata1);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  batchDateClick1() {
    const selectElement1: any = document.querySelector('#rudraksh');
    console.log('selectElement', selectElement1, selectElement1.id);
    const output1 = selectElement1.value;
    this.batchId1 = output1;
    console.log('BatchId Program', this.batchId1);

    // Store batchId in local storage
    localStorage.setItem('batchId_for_batch ', this.batchId1);

    if (this.batchId1) {
      this.getAllProgramList1(output1);
    }
    const selectedBatch1 = this.batchdata1.find(
      (batchData1: any) => batchData1.batchId == parseInt(output1)
    );
    if (selectedBatch1) {
      this.batchName1 = selectedBatch1.batchStartdate ?? '';
      console.log('Program Batch date:-', this.batchName1);
    }
  }

  getAllProgramList1(id: any) {
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
        this.programdata1 = response.data;
        console.log('this.programdata for batch & program', this.programdata1);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }

  programDateClick1() {
    const selectElement: any = document.querySelector('#gourish');
    console.log('selectElement', selectElement, selectElement.id);
    const output2 = selectElement.value;
    this.programId1 = output2;
    console.log('program_id', output2);
    // if(this.programId1){
    //   this.getAllCourseList1(output);
    // }

    localStorage.setItem('ProgramId_batch', output2);

    const selectedBatch = this.programdata1.find(
      (programdata1: any) => programdata1.programId1 == parseInt(output2)
    );
    // if (selectedBatch) {
    //   this.batchName = selectedBatch.batchStartdate ?? '';
    // }
  }

  @ViewChild('container2', { read: ViewContainerRef, static: true })
  container2!: ViewContainerRef;
}
