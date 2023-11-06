import { Component, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/Service/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import Swal from 'sweetalert2';
import axios from 'axios';
import { environment } from 'src/environments/environment';
 
 
const check_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
 
const wrong_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License)
 Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
 
const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`
 
const Edit_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`
 
 
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
 
export class AddTeacherComponent  implements OnInit {
  isFormVisible: boolean = false;
 
  isDropdownVisible: boolean = false;
 
  selectedCourses: { [courseId: number]: boolean } = {};
  selectedCourseIds: number[] = [];
 
  ApiData: any;
  ApiData1: any;
  ApiDataById: any;
  indexNumber: number = 0;
 
  courseData: any;
  courseId: number = 0;
  courseName: string = '';
  courseToggleStatus: boolean = false;
 
 
  // Input field values
  field1Value: string = '';
  field2Value: string = '';
  selectedCourse: string = ''; // Initialize as per your requirement
  courses: string[] = ['Course 1', 'Course 2', 'Course 3']; // Add your course options
  field3Value: string = '';
 
 
  // Array to store table data
  tableData: any[] = [];
  inputData: any = {
    input1: "",
    input2: "",
    input3: "",
 
  };
  finalCourseArray:any;
  teacherCourseDetails:any[]=[];
  isdata_deleted: boolean = false;
  index: number = 0;
  people: any[] = JSON.parse(localStorage.getItem("add_teacher_details")||'[]');
  data_length: string = localStorage.getItem("add_teacher_details") ? JSON.parse(localStorage.getItem("add_teacher_details")||'[]').length : 0;
 
  constructor( iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('Check-up', sanitizer.bypassSecurityTrustHtml(check_Icon));
    iconRegistry.addSvgIconLiteral('Wrong-up', sanitizer.bypassSecurityTrustHtml(wrong_Icon));
    iconRegistry.addSvgIconLiteral('Del-up', sanitizer.bypassSecurityTrustHtml(Del_Icon));
    iconRegistry.addSvgIconLiteral('Edit-up', sanitizer.bypassSecurityTrustHtml(Edit_Icon));
  }
 
 
  // Toggle form visibility
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
 
  ngOnInit (): void {
    this.test1()
    console.log('ydcbdsjchds');
   
   
  }
  test1=async()=>{
    await  this.GetData();
    await this.getAllCourseList();
    await this.test();
  }
  GetData(){
    const token = localStorage.getItem('jwtToken');
    axios.get(`${environment.apiURL}/teacher/show/all`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
    .then(response => {
      // Handle the successful response here
      console.log('Data:', response.data);
      this.ApiData=response.data
      this.ApiData1=response.data.teacher
      console.log("this.apiDataTeacher",this.ApiData)
      console.log("CourseID:-",this.ApiData1)
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error:', error);
    });
  }
 
  // GetCourseData()
  // {
  //   axios.get(`${environment.apiURL}/teacher/courses/$`)
  // }
 
  GetDataById(id:number){
    console.log()
    const token = localStorage.getItem('jwtToken');
    axios.get(`${environment.apiURL}/teacher/show/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
    .then(response => {
      // Handle the successful response here
      console.log('Dataffgdgv:', response.data);
      this.ApiDataById=response.data;
      console.log("ApiDataByIdsddcsd",this.ApiDataById)
      this.isdata_deleted = true;
  this.field1Value = this.ApiDataById.teacherName;
  this.field3Value = this.ApiDataById.teacherEmail;
 
  console.log("this.field1Value", this.field1Value)
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error:', error);
    });
  }
 
 
 
  // Reset input fields
  resetFields() {
    this.field1Value = '';
    this.field2Value = '';
    this.field3Value = '';
 
  }
 
  // Submit table data (combined from both pop-ups)
  submitTableData() {
    if(this.isdata_deleted){
      // this.inputData.input1 = this.field1Value
     
      // this.inputData.input3 = this.field3Value
 
      const postData = {
     
        teacherName: this.field1Value,
     
        teacherEmail: this.field3Value
      };
      const payloadData = {
        teacher: postData,
        courseIds: this.selectedCourseIds,
      };
      const token = localStorage.getItem('jwtToken');
      axios
      .post(
        `${environment.apiURL}/teacher/update/${this.indexNumber}`,
        payloadData,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        }
      )
      .then((response) => {
        console.log('POST request successful');
        console.log('Response data:', response.data);
        this.GetData();
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
 
 
 
    }
    else{
 
      const postData = {
     
        teacherName: this.field1Value,
     
        teacherEmail: this.field3Value
      };
      const payloadData = {
        teacher: postData,
        courseIds: this.selectedCourseIds,
      };
      const token = localStorage.getItem('jwtToken');
      console.log("payloadData",payloadData)
      axios
        .post(`${environment.apiURL}/teacher/addTeacherWithCourses`, payloadData,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((response) => {
          console.log('POST request successful');
          console.log('Response data:', response.data);
          this.GetData();
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
     
 
 
 
 
 
 
 
 
      // this.inputData.input1 = this.field1Value
     
      // this.inputData.input3 = this.field3Value
 
 
      // this.tableData.push(this.inputData)
      // let details = JSON.parse(localStorage.getItem("add_teacher_details")||'[]') ;
      // details.push(this.inputData)
      // localStorage.setItem("add_teacher_details", JSON.stringify(details))
      // this.data_length = JSON.parse(localStorage.getItem("add_teacher_details")||'[]').length;
      // console.log("details", localStorage.getItem("add_teacher_details")||'[]')
      // this.showList()
      // this.resetFields();
    }
 
 
    // Do whatever you need with the table data
  }
  showList() {
    this.people = JSON.parse(localStorage.getItem("add_teacher_details")||'[]');
  }
 
 
 
  // deleteItem(indexNumber: number) {
  //   console.log(indexNumber);
 
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: `Delete the item  with Program value `,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const token = localStorage.getItem('jwtToken');
  //       axios
  //         .post(`${environment.apiURL}/teacher/delete/${indexNumber}`,{
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             'Access-Control-Allow-Origin': '*',
  //             'Access-Control-Allow-Headers': '*',
  //           },
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
  //           this.GetData();
  //         })
  //         .catch((error) => {
  //           console.log('error', error);
  //         });
  //     }
  //   });
  // }


  deleteItem(indexNumber: number) {
    Swal.fire({
      html: `
      <div>
        <h2>Delete Course</h2>
        <hr style="margin: 10px 0;">
        <p>Are you sure that you want to delete this Course?</p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: 'basic',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('jwtToken');
  
        // Set the headers correctly
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        };
  
        axios
          .post(`${environment.apiURL}/teacher/delete/${indexNumber}`, null, config) // Pass null as the request payload
          .then((response) => {
            console.log(response);
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            this.GetData();
          })
          .catch((error) => {
            console.log('error', error);
          });
      }
    });
  }
 
  editItem(index: number) {
    this.GetDataById(index);
    this.indexNumber = index;
    console.log('this.ApiDataById', this.ApiDataById);
  }
 
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
 
  selectCourse(course: string) {
    this.selectedCourse = course;
    this.isDropdownVisible = false;
  }
  selectedValue(course: string) {
    console.log("socuicnsdd", course);
    this.field2Value = course;
    this.isDropdownVisible = false;
  }
 
 
  getAllCourseList() {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/course/distinctCoursesByCourseCode`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.courseData = response.data;
        console.log('this.courseData', this.courseData);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  }
  eachCourseName(id: number, name: string) {
    this.courseId = id;
    this.courseName = name;
    console.log('id', id);
    this.courseToggleStatus = false;
  }
  updateSelectedCourses(courseId: number, courseName: string) {
    if (this.selectedCourses[courseId]) {
      // Course is selected
      this.selectedCourseIds.push(courseId);
    } else {
      // Course is deselected
      const index = this.selectedCourseIds.indexOf(courseId);
      if (index !== -1) {
        this.selectedCourseIds.splice(index, 1);
      }
    }
    console.log('Selected Course IDs:', this.selectedCourseIds);
  }
 
  courseToggle() {
    this.courseToggleStatus = !this.courseToggleStatus;
  }
  test=async()=>{
    let teacherData:any="";
    const teacherDetails: any[]=[];
    const courseDetails: { coursename: any; courseid: any; }[]=[];
    await axios.get(`${environment.apiURL}/teacher/show/all`)
    .then(response => {
      // Handle the successful response here
      console.log('Data:', response.data);
     
        response.data.map((items: { courseIds: any; },index: any)=>{
         teacherDetails.push(items.courseIds)
        })
      teacherData=response.data
      console.log("teacherData",teacherData)
      console.log("teacherData",teacherDetails)
 
    })
    .catch(error => {
      // Handle any errors here
      console.error('Error:', error);
    });
    // Course all data
    await axios
      .get(`${environment.apiURL}/course/show/all`)
      .then((response) => {
        if(response.data){
          response.data.map((items: { courseName: any; courseId: any; },index: any)=>{
             if(1){
              teacherDetails.map((ids,index)=>{
                // console.log("ids",ids.length);
                for (let i = 0; i < ids.length; i++) {
                  // console.log("i length",ids[i],items.courseId)
                  if(ids[i]==response.data[index].courseId){
                  //   console.log("ids",ids.includes(items.courseId))
                   console.log("found",items.courseName)
                   courseDetails.push({
                    coursename:items.courseName,
                    courseid:items.courseId
                   })
                  }
                }
               
              })
             }
          })
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
      console.log("teacherDetails",teacherDetails)
      console.log("courseDetails",courseDetails)
      this.finalCourseArray=courseDetails;
  }
 
 
}
