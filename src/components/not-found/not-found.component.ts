
import { Component } from '@angular/core';
import { getRoleFromToken, navigateTo } from '../../utils';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notfound',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router:Router) {

  }


  redirectByRole(): void {
    const token = sessionStorage.getItem('JwtToken');
    if(token){
      const role=getRoleFromToken(token)
      if(role=="Freelancer"){
        navigateTo(this.router,"/freelancer");
      }
      else if(role=="Client"){
        navigateTo(this.router,"/client");
      }
    }
  }
}
