import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import * as moment from 'moment';
import axios from 'axios';
import { environment } from 'src/environments/environment';
 
const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`
 
const Plus_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>`
 
const Edit_Icon =`<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`
 
const Down_Icon =`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707-1.414-1.414z"></path></svg>`
 
const check_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
 
const wrong_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License)
 Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`
 
 
 
@Component({
    selector: 'app-add-batch',
    templateUrl: './add-batch.component.html',
    styleUrls: ['./add-batch.component.css']
})
export class AddBatchComponent implements OnInit  {
    batches: any[] = [];
    batchCode:string | undefined;
    batchName:String | undefined;
    batchDate:any;
    batchdata:any;
    programData: any;
    studentData:any;
    courseData:any;
    teacherData:any;
    ApiDataById:any;
    index: number = 0;
    isdata_deleted: boolean = false;
 
 
    selectedProgram: { [programId: number]: boolean } = {};
    selectedProgramIds: number[] = [];
    selectedProgramId: number = 0;
    selectedStudent: { [studentId: number]: boolean } = {};
    selectedStudentIds: number[] = [];
    selectedCourse: { [courseId: number]: boolean } = {};
    selectedCourseIds: number[] = [];
    selectedCourseId: number = 0;
    selectedTeacherId: number = 0;
    selectedTeacherIds: number[] = [];
    selectedTeacher: { [teacherId: number]: boolean } = {};
   
    programId: number = 0;
    programName: string = '';
    programToggleStatus: boolean = false;
    studentId: number = 0;
    studentName: string = '';
    studentToggleStatus: boolean = false;
    courseId: number = 0;
    courseName: string = '';
    courseToggleStatus: boolean = false;
    teacherId: number = 0;
    teacherName: string = '';
    teacherToggleStatus: boolean = false;
 
 
    showBatchData: boolean = false; // Add this variable to control visibility
    indexNumber: number | undefined;
    batchId: number | undefined;
    programBatchId: any;
 
    ngOnInit(): void {
        this.getAllProgramList();
        this.getAllStudentList();
        this.getAllBatchList();
        // this.getAllCourseList();
    }
 
    addBatch() {
        this.batches.push({ name: '', startDate: '', endDate: '', nestedBatches: [] });
    }
 
    addNestedBatch(batchIndex: number) {
        this.batches[batchIndex].nestedBatches.push({ name: '', startDate: '', endDate: '', childNestedBatches: [] });
    }
 
    addNestedBatch2(batchIndex: number, nestedIndex: number) {
        this.batches[batchIndex].nestedBatches[nestedIndex].childNestedBatches.push({ field1: '', field2: '', field3: '' });
    }
 
    editBatch(batchIndex: number) {
        console.log('Edit batch', batchIndex);
    }
 
    deleteBatch(batchIndex: number) {
        this.batches.splice(batchIndex, 1);
    }
 
    editNestedBatch(batchIndex: number, nestedIndex: number) {
        console.log('Edit nested batch', batchIndex, nestedIndex);
    }
 
    deleteNestedBatch(batchIndex: number, nestedIndex: number) {
        this.batches[batchIndex].nestedBatches.splice(nestedIndex, 1);
    }
 
    editChildNestedBatch(batchIndex: number, nestedIndex: number, childNestedIndex: number) {
        console.log('Edit child nested batch', batchIndex, nestedIndex, childNestedIndex);
    }
 
    deleteChildNestedBatch(batchIndex: number, nestedIndex: number, childNestedIndex: number) {
        this.batches[batchIndex].nestedBatches[nestedIndex].childNestedBatches.splice(childNestedIndex, 1);
    }
    // saveBatch(){
    //     console.log("helo", this.batchCode);
    //     let bacthDate=moment(this.batchDate).format("YYYY-MM-DD");
    //     const postData = {
    //         batchCode: this.batchCode,
    //         batchName: this.batchName,
    //         batchStartdate: bacthDate,
    //         createdDate: "",
    //         createdBy: "",
    //         updatedDate:"",
    //         updatedBy:""
    //       };
    //       axios
    //         .post(
    //           `${environment.apiURL}/batch/add`,
    //           postData
    //         )
    //         .then((response) => {
    //           console.log('POST request successful');
    //           console.log('Response data:', response.data);
 
    //             // Capture the batch_id from the response
    //         const batchId = response.data.batchId
    //         ;
 
    //         // Store the batch_id in a variable
    //         this.batchId = batchId;
    //         console.log("BatchId:-",batchId);
 
    //              // Show the batch data
    //                 this.showBatchData = true;
 
    //         })
    //         .catch((error) => {
    //           console.error('Error making POST request:', error);
    //         });
    // }
 
   
 
    // updateBatch() {
    //     // Check if batchId is available
    //     if (this.batchId) {
    //       // Create the request payload
    //       const updateData = {
    //         batchCode: this.batchCode,
    //         batchName: this.batchName,
    //         batchStartdate: moment(this.batchDate).format("YYYY-MM-DD"),
    //       };
     
    //       axios
    //         .post(`${environment.apiURL}/batch/update/${this.batchId}`, updateData)
    //         .then((response) => {
    //           console.log('Update request successful');
    //           console.log('Response data:', response.data);
     
    //           // Optionally, you can update the UI or take any other actions after a successful update
 
    //               // After a successful update, toggle back to span view
    //               this.showBatchData = !this.showBatchData;
    //         })
    //         .catch((error) => {
    //           console.error('Error making update request:', error);
    //         });
    //     } else {
    //       console.error('No batchId available for update.');
    //     }
    //   }
 
    onEditClick() {
        // Set showBatchData to false
        this.showBatchData = false;
    }
   
 
    saveOrUpdateBatch() {
        // Check if batchId is available
        if (this.batchId) {
            // Update the batch
            const updateData = {
                batchCode: this.batchCode,
                batchName: this.batchName,
                batchStartdate: moment(this.batchDate).format("YYYY-MM-DD"),
            };
            const token = localStorage.getItem('jwtToken');
            axios
                .post(`${environment.apiURL}/batch/update/${this.batchId}`, updateData,{
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                  },
                })
                .then((response) => {
                    console.log('Update request successful for batch');
                    console.log('Response data:', response.data);
   
                    // Optionally, you can update the UI or take any other actions after a successful update
   
                    // Show the batch data
                    this.showBatchData = true;
                })
                .catch((error) => {
                    console.error('Error making update request:', error);
                });
        } else {
            // Add a new batch
            console.log("helo", this.batchCode);
            let batchDate = moment(this.batchDate).format("YYYY-MM-DD");
            const postData = {
                batchCode: this.batchCode,
                batchName: this.batchName,
                batchStartdate: batchDate,
                createdDate: "",
                createdBy: "",
                updatedDate: "",
                updatedBy: ""
            };
            const token = localStorage.getItem('jwtToken');
            axios
                .post(
                    `${environment.apiURL}/batch/add`,
                    postData,
                    {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              'Access-Control-Allow-Origin': '*',
                              'Access-Control-Allow-Headers': '*',
                            },
                          }
                )
                .then((response) => {
                    console.log('POST request successful for batch');
                    console.log('Response data:', response.data);
   
                    // Capture the batch_id from the response
                    const batchId = response.data.batchId;
   
                    // Store the batch_id in a variable
                    this.batchId = batchId;
                    console.log("BatchId:-", batchId);
   
                    // Show the batch data
                    this.showBatchData = true;
                })
                .catch((error) => {
                    console.error('Error making POST request:', error);
                });
        }
    }
   
     
     
 
   
 
 
   
    getAllBatchList() {
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
            this.batchdata = response.data;
            console.log('this.batchdata', this.batchdata);
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }
 
 
      GetDataById(id:number){
        const token = localStorage.getItem('jwtToken');
        console.log()
        axios.get(`${environment.apiURL}/batch/show/${id}`,{
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
      this.batchCode = this.ApiDataById.batchCode;
      this.batchName = this.ApiDataById.batchName;
      this.batchDate = this.ApiDataById.batchStartdate;
     
      console.log("this.field1Value", this.batchCode)
        })
        .catch(error => {
          // Handle any errors here
          console.error('Error:', error);
        });
      }
 
      editItem(index: number, batchId: number) {
        this.GetDataById(index);
        this.indexNumber = index;
        this.batchId = batchId; // Store the batchId here
        console.log('this.batchId', this.batchId);
      }
 
 
  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer)
    {
      iconRegistry.addSvgIconLiteral('Check-up', sanitizer.bypassSecurityTrustHtml(check_Icon));
      iconRegistry.addSvgIconLiteral('Wrong-up', sanitizer.bypassSecurityTrustHtml(wrong_Icon));
      iconRegistry.addSvgIconLiteral('Del-up', sanitizer.bypassSecurityTrustHtml(Del_Icon));
      iconRegistry.addSvgIconLiteral('Add-up', sanitizer.bypassSecurityTrustHtml(Plus_Icon));
      iconRegistry.addSvgIconLiteral('Edit-up', sanitizer.bypassSecurityTrustHtml(Edit_Icon));
      iconRegistry.addSvgIconLiteral('Dwn-up', sanitizer.bypassSecurityTrustHtml(Down_Icon));
 
 
    }
 
    // program work
 
    getAllProgramList() {
      const token = localStorage.getItem('jwtToken');
        axios
          .get(`${environment.apiURL}/program/show/all`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((response) => {
            // Handle the successful response here
            this.programData = response.data;
            console.log('this.programData', this.programData);
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }
 
      eachProgramName(id: number, name: string) {
        this.programId = id;
        this.programName = name;
        console.log('id', id);
        this.programToggleStatus = false;
      }
 
      updateSelectedProgram(programId: number, programName: string) {
        if (this.selectedProgram[programId]) {
          // Course is selected
          this.selectedProgramIds.push(programId);
        } else {
          // Course is deselected
          const index = this.selectedProgramIds.indexOf(programId);
          if (index !== -1) {
            this.selectedProgramIds.splice(index, 1);
          }
        }
        console.log('Selected Program IDs:', this.selectedProgramIds);
      }
 
      programToggle() {
        this.programToggleStatus = !this.programToggleStatus;
      }
 
 
      ///  Student work  
 
 
      getAllStudentList() {
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
 
      eachStudentName(id: number, name: string) {
        this.studentId= id;
        this.studentName = name;
        console.log('id', id);
        this.studentToggleStatus = false;
      }
 
      updateSelectedStudent(studentId: number, studentName: string) {
        if (this.selectedStudent[studentId]) {
          // Course is selected
          this.selectedStudentIds.push(studentId);
        } else {
          // Course is deselected
          const index = this.selectedStudentIds.indexOf(studentId);
          if (index !== -1) {
            this.selectedStudentIds.splice(index, 1);
          }
        }
        console.log('Selected Student IDs:', this.selectedStudentIds);
      }
 
      studentToggle() {
        this.studentToggleStatus = !this.studentToggleStatus;
      }
 
 
      saveBatch2() {
        console.log("Form 2");
        if (this.selectedProgramIds.length === 1) {
          this.selectedProgramId = this.selectedProgramIds[0]; // Store the selected program_id
          const postData2 = {
            program_id: this.selectedProgramId,
            student_ids: this.selectedStudentIds
          };
          const token = localStorage.getItem('jwtToken');
          axios
            .post(
              `${environment.apiURL}/batch/assignProgramAndBatch`,
              postData2,{
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                },
              }
            )
            .then((response) => {
              console.log('POST request successful for student table');
              console.log('Response data:', response.data);
             
              // Call getAllCourseList with the selected program_id
              this.getAllCourseList(this.selectedProgramId);
            })
            .catch((error) => {
              console.error('Error making POST request:', error);
            });
        } else {
          console.error('Please select exactly one program.');
        }
      }
 
      updateProgramBatch()
      {
        if (this.selectedProgramIds.length === 1) {
            this.selectedProgramId = this.selectedProgramIds[0]; // Store the selected program_id
            const postData3 = {
                programId: this.selectedProgramId,
                batchId:this.batchId
            };
            const token = localStorage.getItem('jwtToken');
            axios
              .post(
                `${environment.apiURL}/batch/updateProgramForStudentsInBatch`,
                postData3,{
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
               
                // Call getAllCourseList with the selected program_id
                this.getAllCourseList(this.selectedProgramId);
              })
              .catch((error) => {
                console.error('Error making POST request:', error);
              });
          } else {
            console.error('Please select exactly one program.');
          }
 
      }
 
    //   saveBatch2() {
    //     if (this.selectedProgramIds.length === 1) {
    //       this.selectedProgramId = this.selectedProgramIds[0];
    //       const postData = {
    //         program_id: this.selectedProgramId,
    //         student_ids: this.selectedStudentIds
    //       };
     
    //       // Check if selectedProgramId exists
    //       if (this.selectedProgramId) {
    //         // Update the program batch
    //         axios
    //           .post(`${environment.apiURL}/batch/updateStudentProgram`, postData)
    //           .then((response) => {
    //             console.log('POST request successful (Update)');
    //             console.log('Response data:', response.data);
    //             // Call getAllCourseList with the selected program_id
    //             this.getAllCourseList(this.selectedProgramId);
    //           })
    //           .catch((error) => {
    //             console.error('Error making POST request (Update):', error);
    //           });
    //       } else {
    //         // Add a new program batch
    //         axios
    //           .post(`${environment.apiURL}/batch/assignProgramAndBatch`, postData)
    //           .then((response) => {
    //             console.log('POST request successful (Add)');
    //             console.log('Response data:', response.data);
    //             // Call getAllCourseList with the selected program_id
    //             this.getAllCourseList(this.selectedProgramId);
    //           })
    //           .catch((error) => {
    //             console.error('Error making POST request (Add):', error);
    //           });
    //       }
    //     } else {
    //       console.error('Please select exactly one program.');
    //     }
    //   }
     
 
 
   
     
     
     
      /// Course Input
 
      getAllCourseList(programId: number) {
        if (programId === 0) {
            console.log(programId);
          console.error('No program selected.');
          return;
        }
        const token = localStorage.getItem('jwtToken');
        axios
          .get(`${environment.apiURL}/course/courseDetailsByProgramId/${programId}`,{
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
        this.courseId= id;
        this.courseName = name;
        console.log('id', id);
        this.courseToggleStatus = false;
      }
 
      updateSelectedCourse(courseId: number, courseName: string) {
        if (this.selectedCourse[courseId]) {
          // Course is selected
          // Check if selectedCourseIds is empty, then store the first selected course ID
          if (this.selectedCourseIds.length === 0) {
            this.selectedCourseId = courseId;
          }
          this.selectedCourseIds.push(courseId);
        } else {
          // Course is deselected
          const index = this.selectedCourseIds.indexOf(courseId);
          if (index !== -1) {
            this.selectedCourseIds.splice(index, 1);
     
            // Check if the deselected course was the 0 index, and update selectedCourseId accordingly
            if (index === 0) {
              this.selectedCourseId = this.selectedCourseIds.length > 0 ? this.selectedCourseIds[0] : 0;
            }
          }
        }
        console.log('Selected Course IDs:', this.selectedCourseIds);
       
        // Call getAllTeacherList with selectedCourseId
        this.getAllTeacherList(this.selectedCourseId);
      }
     
      // Your courseToggle method remains the same
      courseToggle() {
        this.courseToggleStatus = !this.courseToggleStatus;
      }
 
 
      //Teacher Input
 
      getAllTeacherList(courseId: number) {
        if (courseId === 0) {
          console.error('No course selected.');
          return;
        }
        const token = localStorage.getItem('jwtToken');
        axios
          .get(`${environment.apiURL}/teacher/teachersByCourseId/${courseId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': '*',
            },
          })
          .then((response) => {
            // Handle the successful response here
            this.teacherData = response.data;
            console.log('this.teacherData', this.teacherData);
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error:', error);
          });
      }
 
 
      eachTeacherName(id: number, name: string) {
        this.teacherId= id;
        this.teacherName = name;
        console.log('id', id);
        this.teacherToggleStatus = false;
      }
 
 
 
 
      updateSelectedTeacher(teacherId: number, teacherName: string) {
        if (this.selectedTeacher[teacherId]) {
          // Teacher is selected
          this.selectedTeacherIds.push(teacherId);
        } else {
          // Teacher is deselected
          const index = this.selectedTeacherIds.indexOf(teacherId);
          if (index !== -1) {
            this.selectedTeacherIds.splice(index, 1);
          }
        }
     
        // Always update selectedTeacherId with the 0 index teacherId
        this.selectedTeacherId = this.selectedTeacherIds.length > 0 ? this.selectedTeacherIds[0] : 0;
     
        console.log('Selected Teacher IDs:', this.selectedTeacherIds);
     
        // Call your next API with the selectedTeacherId (e.g., call your getAllCoursesByTeacher method)
        // this.getAllCoursesByTeacher(this.selectedTeacherId);
      }
 
      teacherToggle() {
        this.teacherToggleStatus = !this.teacherToggleStatus;
      }
 
      saveBatch3() {
        if (this.selectedCourseId !== 0 && this.selectedTeacherId !== 0) {
          const postData3 = {
            course_id: this.selectedCourseId,
            teacher_id: this.selectedTeacherId
          };
          const token = localStorage.getItem('jwtToken');
          axios
            .post(
              `${environment.apiURL}/batch/storeTeacherCourse`,
              postData3,{
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
     
              // Add any additional logic you need here
            })
            .catch((error) => {
              console.error('Error making POST request:', error);
            });
        } else {
          console.error('Please select both a course and a teacher.');
        }
      }
     
 
 
}
