import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
@Component({
  standalone: true,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  loggedIn: boolean = true;
  roles = ['admin','faculty','student','lecturer','academic-coordinator'];
  user = {roles:['admin']};

  onClick(){
    if(this.user.roles.includes('admin')){
      this.user.roles = ['faculty'];
      console.log(this.user.roles);
    }
    else if(this.user.roles.includes('faculty')){
      this.user.roles = ['academic-coordinator'];
      console.log(this.user.roles);
    }
    else if(this.user.roles.includes('academic-coordinator')){
      this.user.roles = ['lecturer'];
      console.log(this.user.roles);
    }
    else if(this.user.roles.includes('lecturer')){
      this.user.roles = ['student'];
      console.log(this.user.roles);
    }
    else if(this.user.roles.includes('student')){
      this.user.roles = ['admin'];
      console.log(this.user.roles);
    }
  }
}
