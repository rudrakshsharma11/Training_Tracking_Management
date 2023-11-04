import { Component, Input, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/Service/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import axios from 'axios';
import { environment } from 'src/environments/environment';
 
const check_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;
 
const wrong_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License)
 Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
 
const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;
 
const Edit_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
 
export interface PeriodicElement {
  Actions: string;
 
  Code: string;
 
  CourseName: string;
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  isFormVisible: boolean = true;
 
  // Input field values
  field1Value: string = '';
  field2Value: string = '';
  editpercentageValue: string = '';
  editpercentagetopicname: string = '';
 
  courseCode: string = ''; // Declare courseId as a class variable
 
  index: number = 0;
  isdata_deleted: boolean = false;
  is_edited_show: boolean = false;
 
  // Array to store table data
  tableData: any[] = [];
  inputData: any = {
    input1: '',
    input2: '',
  };
  people: any[] = JSON.parse(
    localStorage.getItem('add_attdence_details') || '[]'
  );
  people_length: number = 0;
 
  data_length: string = JSON.parse(
    localStorage.getItem('add_attdence_details') || '[]'
  ).length;
  topicdata: any;
  topicdata2: any;
  topicId: string = '';
  topicName: string = '';
  ApiDataById: any;
  indexNumber: number = 0;
 
  topicIDm:string="";
 
 
  studentData: any;
  batch_datem: any;
  batchIdm: any;
 
  constructor(
    private iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private homeobj: HomeComponent
  ) {
    iconRegistry.addSvgIconLiteral(
      'Check-up',
      sanitizer.bypassSecurityTrustHtml(check_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Wrong-up',
      sanitizer.bypassSecurityTrustHtml(wrong_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Del-up',
      sanitizer.bypassSecurityTrustHtml(Del_Icon)
    );
    iconRegistry.addSvgIconLiteral(
      'Edit-up',
      sanitizer.bypassSecurityTrustHtml(Edit_Icon)
    );
    // Retrieve response data from localStorage
    const responseStr = localStorage.getItem('response_data');
    console.log('Course Id  retrived for Topic', responseStr);
 
    const batchId = localStorage.getItem('batchId');
    console.log("Batch Id:-",batchId);
    this.batchIdm=batchId;
 
    const batch_date = localStorage.getItem('batch_date');
    console.log("Batch Date:-",batch_date);
    this. batch_datem=batch_date;
 
    if (responseStr) {
      this.topicdata = JSON.parse(responseStr);
    }
  }
  // studentlist: any[] = [
  //   {
  //     id: 1,
  //     name: 'All Students',
  //     value: false,
  //   },
  //   {
  //     id: 1,
  //     name: 'Mohit Singh',
  //     value: true,
  //   },
  //   {
  //     id: 1,
  //     name: 'Neha Mohan',
  //     value: true,
  //   },
  //   {
  //     id: 1,
  //     name: 'Saurabh Sinha',
  //     value: false,
  //   },
  //   {
  //     id: 1,
  //     name: 'Tanmaya Shekar',
  //     value: true,
  //   },
  // ];
 
  ngOnInit(): void {
    // Check if response data is available, and if so, pass it to getTopicByCourse
    if (this.topicdata) {
      this.getTopicByCourse(this.topicdata);
    }
    this.getTopicNotNull();
    this.getStudentlist();
  }
 
  getTopicByCourse(id: any) {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/attendance/allTopics/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.topicdata = response.data;
        console.log('this.topicdata', this.topicdata);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
  GetDataById(id: number) {
    console.log();
    const token = localStorage.getItem('jwtToken');

    axios
      .get(`${environment.apiURL}/topic/show/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        console.log('Dataffgdgv:', response.data);
        this.ApiDataById = response.data;
        console.log('ApiDataByIdsddcsd', this.ApiDataById);
        this.isdata_deleted = true;
 
        this.field2Value = this.ApiDataById.topicPercentageCompleted;
 
        console.log('this.field2Value', this.field2Value);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
  getTopicNotNull() {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/topic/percentage-not-null`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.topicdata2 = response.data;
        console.log('this.topicdata2', this.topicdata2);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
  topicDateClick() {
    const selectElement: any = document.querySelector('#education1');
    console.log('selectElement', selectElement, selectElement.id);
    const output = selectElement.value;
    this.topicId = output;
    console.log('toipcId:-', this.topicId);
    // if(this.topicId){
    //   this.getAllProgramList(output);
    // }
    const selectedBatch = this.topicdata.find(
      (topicdata: any) => topicdata.batchId == parseInt(output)
    );
    // if (selectedBatch) {
    //   this.topicName = selectedBatch.batchStartdate ?? '';
    // }
  }
 
  postTopicData() {
    console.log('Field Value 2 ', this.field2Value);
    // const postData={
    //   topicPercentage: this.field2Value,
 
    //   }
    //   axios
    // .post(`${environment.apiURL}/topic/addTopicPercentage/${this.topicId}`, postData)
    // .then((response) => {
    //   console.log('POST request successful for percentage');
    //   console.log('Response data:', response.data);
 
    // })
    // .catch((error) => {
    //   console.error('Error making POST request:', error);
    // });
  }
 
  getStudentlist() {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/student/show/uniqueByStudentCode`,
      {
              headers: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
              },
            })
      .then((response) => {
        // Handle the successful response here
        this.studentData = response.data;
        console.log('this.studentData', this.studentData);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
  // Toggle form visibility
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
 
  // Submit data from first pop-up
  submitPopup() {
    this.inputData.input1 = this.field1Value;
    this.inputData.input2 = this.field2Value;
  }
 
  // Reset input fields
  resetFields() {
    this.field1Value = '';
    this.field2Value = '';
  }
 
  // Submit table data (combined from both pop-ups)
  submitTableData() {
    if (this.isdata_deleted) {
      this.inputData.input1 = this.field1Value;
      this.inputData.input2 = this.field2Value;
 
      let details = JSON.parse(
        localStorage.getItem('add_attdence_details') || '[]'
      );
      details[this.index] = this.inputData;
      console.log(
        'hello',
        this.inputData,
        this.index,
        details,
        this.isdata_deleted
      );
      localStorage.setItem('add_attdence_details', JSON.stringify(details));
      this.data_length = JSON.parse(
        localStorage.getItem('add_attdence_details') || '[]'
      ).length;
      this.showList();
      this.resetFields();
      this.isdata_deleted = false;
    } else {
      // this.tableData.push(this.inputData)
      // let details = JSON.parse(localStorage.getItem("add_attdence_details") || '[]');
      // details.push(this.inputData)
      // localStorage.setItem("add_attdence_details", JSON.stringify(details))
      // this.data_length = JSON.parse(localStorage.getItem("add_attdence_details") || '[]').length;
      // console.log("details", localStorage.getItem("add_attdence_details"))
      // this.showList()
      // this.resetFields();
      const postData = {
        topicPercentage: this.field2Value,
      };
      const token = localStorage.getItem('jwtToken');
      axios
        .post(
          `${environment.apiURL}/topic/addTopicPercentage/${this.topicId}`,
          postData,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          }
        )
        .then((response) => {
          console.log('POST request successful for percentage');
          console.log('Response data:', response.data);
          this.getTopicNotNull();
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
    }
 
    // Do whatever you need with the table data
  }
  submitTableData1() {
    // this.tableData.push(this.inputData)
    // let details = JSON.parse(localStorage.getItem("add_attdence_details") || '[]');
    // details.push(this.inputData)
    // localStorage.setItem("add_attdence_details", JSON.stringify(details))
    // this.data_length = JSON.parse(localStorage.getItem("add_attdence_details") || '[]').length;
    // console.log("details", localStorage.getItem("add_attdence_details"))
    // this.showList()
    // this.resetFields();
    const postData = {
      topicPercentage: this.editpercentageValue,
    };
    const token = localStorage.getItem('jwtToken');
    axios
      .post(
        `${environment.apiURL}/topic/addTopicPercentage/${this.topicId}`,
        postData,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }
      )
      .then((response) => {
        console.log('POST request successful for percentage');
        console.log('Response data:', response.data);
        this.getTopicNotNull();
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
 
    // Do whatever you need with the table data
  }
  showList() {
    this.people = JSON.parse(
      localStorage.getItem('add_attdence_details') || '[]'
    );
    this.people_length = this.people.length;
  }
 
  deleteItem(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.people.splice(index, 1);
        localStorage.setItem(
          'add_attdence_details',
          JSON.stringify(this.people)
        );
        this.data_length = JSON.parse(
          localStorage.getItem('add_attdence_details') || '[]'
        ).length;
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  }
 
  editItem(index: number) {
    this.is_edited_show = true;
    //localhost:2023/topic/show/28
    // this.index = index;
    // this.people = JSON.parse(
    //   localStorage.getItem('add_attdence_details') || '[]'
    // );
    // const selectedPerson = this.people[index];
    // this.field1Value = selectedPerson.input1;
    // this.field2Value = selectedPerson.input2;
 
    // console.log('this.field1Value', this.field1Value);
    // this.showList();
    const token = localStorage.getItem('jwtToken');
    http: axios
      .get(`${environment.apiURL}/topic/show/${index}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        // this.topicdata2 = response.data;
        console.log('topicPercentageCompleted', response);
        console.log('this.topicdata2', this.topicdata2);
        this.editpercentageValue = response.data.topicPercentageCompleted;
        this.editpercentagetopicname = response.data.topicName;
        this.topicId = response.data.topicId;
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
 
  radioButton(topicId1: any) {
    console.log('topic_id is', topicId1);
    this.topicIDm=topicId1;
    console.log("Main Topic ID",this.topicIDm)
  }
 
  selectedStudentIds: number[] = [];
  selectButton(studentId1: any) {
    console.log('student_id is', studentId1);
 
    // Check if the studentId is already in the array, and add or remove it accordingly
    const index = this.selectedStudentIds.indexOf(studentId1);
    // } else {
    //   this.selectedStudentIds.splice(index, 1); // Remove from the array if already present
    // }
    if (this.selectedStudentIds.includes(studentId1)) {
      console.log("hello",studentId1)
      this.selectedStudentIds=this.selectedStudentIds.filter((ids) => {return ids != studentId1});
      console.log('Selected student IDs:', this.selectedStudentIds);
 
    } else {
      this.selectedStudentIds.push(studentId1); // Add to the array if not already present
    }
 
    // Now, this.selectedStudentIds array contains all the selected student IDs
    console.log('Selected student IDs:', this.selectedStudentIds);
  }
 
 postAttendence()
 {
  const postData={
   
    topicId:this.topicIDm,
    date:this.batch_datem,
    batchId:this.batchIdm,
    studentIds:this.selectedStudentIds
   
    };
    const token = localStorage.getItem('jwtToken');
    axios
  .post(`${environment.apiURL}/attendance/addAttendances`, postData,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  })
  .then((response) => {
    console.log('POST request successful for Attdence');
    console.log('Response data:', response.data);
 
    this.resetFields();
  })
  .catch((error) => {
    console.error('Error making POST request:', error);
  });
 }
 
 
 
}
