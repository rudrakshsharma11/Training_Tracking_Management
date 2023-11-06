import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { MatIconRegistry } from '@angular/material/icon';

import Swal from 'sweetalert2';

import { CloseScrollStrategy } from '@angular/cdk/overlay';

import { NgIfContext } from '@angular/common';

import axios from 'axios';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const check_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`;

const wrong_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License)

 Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;

const Del_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>`;

const Edit_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;

@Component({
  selector: 'app-assign-table',

  templateUrl: './assign-table.component.html',

  styleUrls: ['./assign-table.component.css'],
})
export class AssignTableComponent implements OnInit {
  // Dropdown options

  // dropdownOptions: { label: string, value: string }[] = [

  //   { label: 'Option 1', value: 'option1' },

  //   { label: 'Option 2', value: 'option2' },

  //   { label: 'Option 3', value: 'option3' }

  // ];

  // selectedDropdownValue: string = '';

  isFormVisible: boolean = true;

  isPopupVisible: boolean = false;

  isSecondPopupVisible: boolean = false;

  popupInput: string = '';

  // secondPopupInput: string = '';

  // selectedDate: string;

  isUploadModalVisible: boolean = false;

  // displayedData: string = '';

  // inputFieldsVisible: boolean = true;

  // tableData: TableRow[] = [];

  currentRowIndex: number = -1;

  selectedFile: File | null = null;

  //   uploadedFiles: {

  //     push(selectedFile: File): unknown; [id: number]: File[]

  // } = {

  //   push: function (selectedFile: File): unknown {

  //     throw new Error('Function not implemented.');

  //   }

  // };

  uploadedFiles: { [id: number]: File[] } = {};

  // Input field values

  field1Value: string = '';

  field2Value: string = '';

  field3Value: string = '';

  field4Value: string = '';

  index: number = 0;

  isdata_deleted: boolean = false;

  file_name: string = '';

  // Array to store table data

  tableData: any[] = [];

  inputData: any = {
    input1: '',

    input2: '',

    input3: '',

    input4: '',

    file: '',

    // firstpopupInput: "",

    // dropdwon: "",

    // secodepopupInput: ""
  };

  people: any[] = JSON.parse(
    localStorage.getItem('add_assign_details') || '[]'
  );

  data_length: string = localStorage.getItem('add_assign_details')
    ? JSON.parse(localStorage.getItem('add_assign_details') || '[]').length
    : 0;

  selectedFileName: string | undefined;
  assigmentData: any;
  httpClient: any;

  constructor(
    private http:HttpClient,private router:Router,

    iconRegistry: MatIconRegistry,

    sanitizer: DomSanitizer
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
  }

  ngOnInit(): void {
    // Check if response data is available, and if so, pass it to getTopicByCourse
    // if (this.topicdata) {
    //   this.getTopicByCourse(this.topicdata);
    // }
    // this.getTopicNotNull();
    this.getAssigmentlist();
  }

  getAssigmentlist() {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`${environment.apiURL}/assignment/getAssignments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((response) => {
        // Handle the successful response here
        this.assigmentData = response.data;
        console.log('this.Assigment DATA:-', this.assigmentData);
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

  resetFields() {
    this.field1Value = '';

    this.field2Value = '';

    this.field3Value = '';

    this.field4Value = '';

    this.file_name = '';

    // this.popupInput = "";

    // this.secondPopupInput ="";

    // this.somya = "";

    // this.selectedDropdownValue = "";

    // this.rud="";
  }

  submitTableData() {
    if (this.isdata_deleted) {
      this.inputData.input1 = this.field1Value;

      this.inputData.input2 = this.field2Value;

      this.inputData.input3 = this.field3Value;

      this.inputData.input4 = this.field4Value;

      let details = JSON.parse(
        localStorage.getItem('add_assign_details') || '[]'
      );

      details[this.index] = this.inputData;

      console.log(
        'hello',
        this.inputData,
        this.index,
        details,
        this.isdata_deleted
      );

      localStorage.setItem('add_assign_details', JSON.stringify(details));

      this.data_length = JSON.parse(
        localStorage.getItem('add_assign_details') || '[]'
      ).length;

      this.showList();

      this.resetFields();

      this.isdata_deleted = false;

      // this.isFormVisible = false;
    } else {
      const postData = {
        submissionDate: this.field3Value,
        evaluationName: this.field1Value,
        totalMarks: this.field2Value,
        courseId: localStorage.getItem('courseId_exam'),
        batchId: localStorage.getItem('batchId'),
      };
      const token = localStorage.getItem('jwtToken');
      axios
        .post(`${environment.apiURL}/assignment/addAssignment`, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        })
        .then((response) => {
          console.log('POST request successful for percentage');
          console.log('Response data:', response.data);
        })
        .catch((error) => {
          console.error('Error making POST request:', error);
        });
    }
  }

  // write()

  // {

  //   this.displayedData = `${this.inputData.input1} - ${this.inputData.input2} - ${this.inputData.input3} - ${this.inputData.input4}`;

  // // Toggle visibility of input fields

  // this.inputFieldsVisible = false;

  // }

  showList() {
    this.people = JSON.parse(
      localStorage.getItem('add_assign_details') || '[]'
    );
  }

  deleteItem(index: number) {
    const selectedField1Value = this.people[index].input1;

    const selectedField2Value = this.people[index].input2;

    Swal.fire({
      title: 'Are you sure?',

      text: `Delete the item  with Program value: ${selectedField1Value} / ${selectedField2Value}. `,

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#d33',

      cancelButtonColor: '#3085d6',

      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.people.splice(index, 1);

        localStorage.setItem('add_assign_details', JSON.stringify(this.people));

        Swal.fire(
          'Deleted!',

          'Your item has been deleted.',

          'success'
        );
      }
    });
  }

  editItem(index: number) {
    this.isdata_deleted = true;

    this.index = index;

    this.people = JSON.parse(
      localStorage.getItem('add_assign_details') || '[]'
    );

    const selectedPerson = this.people[index];

    this.field1Value = selectedPerson.input1;

    this.field2Value = selectedPerson.input2;

    this.field3Value = selectedPerson.input3;

    this.field4Value = selectedPerson.input4;

    // this.popupInput = selectedPerson.firstpopupInput;

    // this.selectedDropdownValue = selectedPerson.dropdwon;

    console.log('this.field1Value', this.field1Value);

    this.showList();
  }

  openUploadModal() {
    console.log('Import button clicked for row index:');

    // this.currentRowIndex = rowIndex;

    this.selectedFile = null;

    this.isUploadModalVisible = true; // Set the flag to show the modal
  }

  closeUploadModal() {
    this.currentRowIndex = -1;

    this.selectedFile = null;

    this.isUploadModalVisible = false; // Set the flag to hide the modal
  }



  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }



  // Upload the selected file

  uploadFile() {
    if (this.selectedFile && this.currentRowIndex !== -1) {
      // Assuming you have an 'id' property in your tableData

      const id = this.tableData[this.currentRowIndex].id;

      // Create an object to store uploaded files, if it doesn't exist

      if (!this.uploadedFiles[id]) {
        this.uploadedFiles[id] = [];
      }

      // Add the selected file to the uploadedFiles array

      this.uploadedFiles[id].push(this.selectedFile);

      console.log('File uploaded for ID:', id);

      this.closeUploadModal();
    }
  }

  // Handle file upload input change

  handleFileUpload(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    const files = fileInput.files;

    if (files && files.length > 0) {
      // Get the first selected file

      const file = files[0];

      // Handle the selected file here

      console.log('Selected file:', file);

      // If you want to display the file name

      this.file_name = file.name;
    }
  }

  fileupload() {
    const fileInput: any = document.getElementById('input');

    fileInput.onchange = () => {
      const selectedFile = fileInput.files[0];

      console.log(selectedFile);
    };
  }

  // handleFileUpload(event: { target: { files: any[]; }; }){

  //   const file = event.target.files[0];

  //   console.log('file is',file);

  //   if(file){

  //     this.file_name=file.name;

  //   }

  // }

  isTableVisible: boolean = false;

  students: any[] = [
    { name: 'Student 1', marks: 95 },

    { name: 'Student 2', marks: 88 },

    { name: 'Student 3', marks: 75 },

    // Add more student data here
  ];

  toggleTableVisibility() {
    this.isTableVisible = !this.isTableVisible;
  }

  saveChanges() {
    // Implement the save functionality here

    console.log('Save clicked');
  }

  cancelEditing() {
    // Implement the cancel functionality here

    console.log('Cancel clicked');

    this.isTableVisible = false;
  }

  upload(formData: FormData) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // Specify the response type as text
    return this.http.post(`${environment.apiURL}/topic/uploadfile`, formData, {
      headers,
      responseType: 'text' // Set the response type to 'text'
    });
  }
  

  file: any[] = [];
  uploadedFileName: string = '';

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    this.file.push(event.target.files[0]);
  
    if (selectedFile) {
      this.uploadedFileName = selectedFile.name;
      console.log('Selected File: ', this.uploadedFileName);
    }
  
    const formData = new FormData();
    formData.append('file', this.file[this.file.length - 1]);
  
    this.upload(formData).subscribe(
      (res: any) => {
        console.log(res);
        // Handle the success message as text
        console.log('File uploaded successfully:', res);
  
        // Clear the file input
        this.fileInput.nativeElement.value = '';
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle the error
      }
    );
  }
  @ViewChild('fileInput') fileInput!: ElementRef;
  openFileSelector() {
    this.fileInput.nativeElement.click();
  }
 
}

