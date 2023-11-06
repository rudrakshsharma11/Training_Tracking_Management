import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
 
import { environment } from 'src/environments/environment';
 
import axios from 'axios';
 
const User_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License -
https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>`;
 
const Visible_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"/></svg>`
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
 
  constructor(private loginService: LoginService, private router: Router, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,) {
      iconRegistry.addSvgIconLiteral('User-up', sanitizer.bypassSecurityTrustHtml(User_Icon));
      iconRegistry.addSvgIconLiteral('Pass-up', sanitizer.bypassSecurityTrustHtml(Visible_Icon));
 
    }
 
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }


 
   
   
  logValues() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
 
 
 
  login(): void {
    console.log("Attempting login for", this.username);
   
    // const isAuthenticated = this.loginService.authenticate(this.username, this.password);
    // console.log("isAuthenticated:", isAuthenticated);
 
    // const isAuthenticatedteacher = this.loginService.authenticateteacher(this.username, this.password);
    // console.log("isAuthenticatedteacher:", isAuthenticatedteacher);
   
    // if (isAuthenticated) {
    //   // Rest of your code
    //   this.loginService.storeLoginData(this.username, this.password);
     
    //   Swal.fire({
    //     icon: 'success',
    //     title: `Login successful`,
    //     text: `Username: ${this.username}`,
    //     timer: 2000, // Automatically close after 2 seconds
    //     showConfirmButton: false
    //   }).then(() => {
    //     this.router.navigate(['/admin']);
    //   });
    // }
    // else if (isAuthenticatedteacher) {
    //   // Rest of your code
 
    //   this.loginService.storeLoginData(this.username, this.password);
     
    //   Swal.fire({
    //     icon: 'success',
    //     title: `Login successful`,
    //     text: `Username: ${this.username}`,
    //     timer: 2000, // Automatically close after 2 seconds
    //     showConfirmButton: false
    //   }).then(() => {
    //     this.router.navigate(['/home']);
    //   });
    // }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Invalid credentials',
    //     text: 'Please try again.'
    //   });
    // }
    // New code will be written here
      axios
      .post(`${environment.apiURL}/authenticate`,{
        username: this.username,
        password: this.password,
      })
      .then((response) => {
        console.log("response",response)
        // Assuming your backend returns a JWT token upon successful login
        const token = response.data.token;
        const role = response.data.role;
        if (token) {
          // Store the JWT token in localStorage
          localStorage.setItem('jwtToken', token);
          // this.tokenAPI(token)
        }
        if(role){
          if(role=="ROLE_TEACHER"){
            this.router.navigate(['/home']);
          }
          if(role=="ROLE_ADMIN"){
            this.router.navigate(['/admin']);
          }
          localStorage.setItem('User_Role', role);
        }
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login errors, show error messages, etc.
      });
 
  }
  // tokenAPI(token){
  //   axios.get(`${environment.loginURL}/user`,{
  //     headers:{
  //       "Authorization":`Bearer ${token}`
  //     }
  //   })
  //   .then((response) => {
  //     // Handle the response data here
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // Handle errors
  //     console.error('GET request failed:', error);
  //   });
  // }
 
 
  // username: string = '';
  // password: string = '';
  // showPassword: boolean = false;
 
  // constructor(private loginService: LoginService, private router: Router, iconRegistry: MatIconRegistry,
  //   sanitizer: DomSanitizer,) {
  //     iconRegistry.addSvgIconLiteral('User-up', sanitizer.bypassSecurityTrustHtml(User_Icon));
  //     iconRegistry.addSvgIconLiteral('Pass-up', sanitizer.bypassSecurityTrustHtml(Visible_Icon));
 
  //   }
 
  //   togglePasswordVisibility() {
  //     this.showPassword = !this.showPassword;
  //   }
   
 
  // login(): void {
  //   const isAuthenticated = this.loginService.authenticate(this.username, this.password);
  //   const isAuthenticatedteacher = this.loginService.authenticateteacher(this.username, this.password);
  //   if (isAuthenticated) {
  //     this.loginService.storeLoginData(this.username, this.password);
     
  //     Swal.fire({
  //       icon: 'success',
  //       title: `Login successful`,
  //       text: `Username: ${this.username}`,
  //       timer: 10,
  //       showConfirmButton: false
  //     }).then(() => {
  //       this.router.navigate(['/admin']);
  //     });
  //   }
  //   else if (isAuthenticatedteacher) {
  //     this.loginService.storeLoginData(this.username, this.password);
     
  //     Swal.fire({
  //       icon: 'success',
  //       title: `Login successful`,
  //       text: `Username: ${this.username}`,
  //       timer: 10,
  //       showConfirmButton: false
  //     }).then(() => {
  //       this.router.navigate(['/home']);
  //     });
  //   }
   
  //   else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Invalid credentials',
  //       text: 'Please try again.'
  //     });
  //   }
  // }
}
