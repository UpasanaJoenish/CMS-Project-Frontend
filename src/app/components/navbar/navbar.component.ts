import { Component, OnInit } from '@angular/core';
import { SupaService } from 'src/app/services/supa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  email: string | null = null;

  constructor(private _supaService: SupaService) { }

  async ngOnInit() {
    const userDetails = await this._supaService.getUserDetails();
    if (userDetails) {
      this.email = this._supaService.extractemail(userDetails);
      
    }
  }
}
