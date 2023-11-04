import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AssignTableComponent } from '../assign-table/assign-table.component';

 

 

@Component({

  selector: 'app-assigment',

  templateUrl: './assigment.component.html',

  styleUrls: ['./assigment.component.css']

})

export class AssigmentComponent implements OnInit {

 

  constructor() { }

 

  ngOnInit(): void {

  }

  form1 = true; form2 = false; form3 = false; form4 = false; form5 = false;

  clicked = '';

  Click(value: string): void {

    this.clicked = value;

    this.form2 = true;

  }

  Click1(value: string): void {

    this.clicked = value;

    this.form2 = true;

    this.form3 = true;

  }

  Click2(value: string): void {

    this.clicked = value;

    this.form2 = true;

    this.form3 = true;

    this.form4 = true;

  }

  Click3(value: string): void {

    this.clicked = value;

    this.form2 = true;

    this.form3 = true;

    this.form4 = true;

    this.form5 = true;

  }

 

  @ViewChild('container4',{read:ViewContainerRef,static:true})

  container4!:ViewContainerRef;

 

  AddTopic(){

    this.container4.clear();

    this.container4.createComponent(AssignTableComponent)

 }

 

}
