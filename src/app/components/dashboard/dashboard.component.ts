import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupaService } from 'src/app/services/supa.service';
import { CouponService } from 'src/app/services/coupon.service';
import { Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

interface Environment {
  production: boolean;
  supabase: {
    url: string;
    key: string;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  userName: string | null = null;
  userId: string | null = null;
  showCouponDetailsFlag = false;
  private supabase: SupabaseClient;

  constructor(
    private router: Router,
    private _supaService: SupaService
  ) {
    const env = environment as Environment;
    this.supabase = createClient(env.supabase.url, env.supabase.key);
  }

  ngOnInit() {
    this.loadUserDetails();
  }

  async loadUserDetails() {
    const userDetails = await this._supaService.getUserDetails();
    if (userDetails) {
      this.userId = this._supaService.extractUserId(userDetails);
    }
  }

  showCouponDetails() {
    this.showCouponDetailsFlag = true;
    this.isSidebarOpen = false;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.supabase.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
