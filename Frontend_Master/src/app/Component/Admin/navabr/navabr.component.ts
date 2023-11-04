import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
// import { LoginService } from 'src/app/Service/login.service';
 
const Down_Icon = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
  <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
</svg>`;
 
 
const logout_Icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M18 2H6a1 1 0 0 0-1 1v9l5-4v3h6v2h-6v3l-5-4v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path></svg>`
 
@Component({
  selector: 'app-navabr',
  templateUrl: './navabr.component.html',
  styleUrls: ['./navabr.component.css']
})
export class NavabrComponent {
  isDropdownOpen: boolean = false;
  isDropdown1Open: boolean = false; // New flag for the second dropdown
 
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    // private loginService: LoginService,
    private router: Router
  ) {
    iconRegistry.addSvgIconLiteral('Down-up', sanitizer.bypassSecurityTrustHtml(Down_Icon));
    iconRegistry.addSvgIconLiteral('LogDwn-up', sanitizer.bypassSecurityTrustHtml(logout_Icon));
  }
 
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.isDropdown1Open = false; // Close the second dropdown when opening the first one
  }
 
  toggleDropdown1(): void {
    this.isDropdown1Open = !this.isDropdown1Open;
    this.isDropdownOpen = false; // Close the first dropdown when opening the second one
  }
 
  logout(): void {
    // Remove jwtToken and User_Role from local storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('User_Role');
    
    // Optionally, you can also clear any other data or perform additional logout actions
  
    // Navigate to the home page
    this.router.navigate(['']);
  }
  
}
