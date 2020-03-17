import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  role;

  ngOnInit() {
    this.authService.loggedIn$.subscribe(user => {
      if(user) {
        console.log('sidebar', user)
        this.role = user.role
      }
      
    })
  }

}
