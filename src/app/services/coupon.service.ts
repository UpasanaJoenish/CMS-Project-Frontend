import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupaService } from './supa.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private _http: HttpClient, private supaService: SupaService) { }

  async addCoupon(data: any): Promise<Observable<any>> {
    try {
      const userDetails = await this.supaService.getUserDetails();
      const supabaseUserId = userDetails?.id;

      if (supabaseUserId) {
        data.SupabaseUserId = supabaseUserId;
        const response = await this._http.post('https://localhost:44334/api/Coupon/Create', data).toPromise();
        return new Observable(observer => {
          observer.next(response);
          observer.complete();
        });
      } else {
        throw new Error('Error adding coupon: User details not available');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
      throw error; 
    }
  }

  updateCoupon(data: any): Observable<any> {
    return this._http.put(`https://localhost:44334/api/Coupon/Update`, data);
  }

  async getCouponsListForUser(): Promise<Observable<any>> {
    try {
      const userDetails = await this.supaService.getUserDetails();
      const supabaseUserId = userDetails?.id;

      if (supabaseUserId) {
        const url = `https://localhost:44334/api/Coupon/${supabaseUserId}`;
        return this._http.get(url);
      } else {
        throw new Error('Error getting coupons: User details not available');
      }
    } catch (error) {
      console.error('Error getting coupons:', error);
      throw error;
    }
  }

  GetCouponById(id: number): Observable<any> {
    return this._http.get(`https://localhost:44334/api/Coupon/GetBy/${id}`);
  }

  deleteCoupons(id: number): Observable<any> {
    return this._http.delete(`https://localhost:44334/api/Coupon/Delete/${id}`);
  }
}
