import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.services";
import { DataService } from "../../shared/services/data.services";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: String;
  rol: string;
  naveFavorita: string;
  marcafavorita: string;
  personalDescription: string;
  org:String;
  showProfile: boolean = false
  userShips = [];

  constructor(
    public authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    let userMail = this.authService.getUserData();

    this.dataService.getUser(userMail.email)
      .subscribe((user)=> {
        if(user.length > 0){
          this.name = user[0].username;
          this.rol = user[0].rol;
          this.naveFavorita = user[0].favorite;
          this.org = user[0].org;
          this.personalDescription = user[0].descripcion;

          this.showProfile = true;
        }
      })
  }

}