import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { SupaService } from 'src/app/services/supa.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  couponForm: FormGroup;
  loading: boolean = false;

  // Constructor to initialize the component
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private serve: CouponService,
    private _supaService: SupaService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.couponForm = this.fb.group({
      // Initializing the form with default values and validation rules
      id: [0],
      couponCode: ['string'],
      couponName: ['', [Validators.required]],
      description: [''],
      discount: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      discountType: ['', [Validators.required]],
      supabaseUserId: ['', [Validators.required]]
    });
  }


  async ngOnInit() {
    // Fetch user details when the dashboard component initializes
    const userDetails = await this._supaService.getUserDetails();
    if (userDetails) {
      const userId = this._supaService.extractUserId(userDetails);
      this.couponForm.patchValue({
        supabaseUserId: userId,
      });
    }
  }

  async onSaveClick() {
    
    //loader
    this.loading = true;
    const dialogRef = this.dialog.open(LoaderComponent, {
      disableClose: true,
      panelClass: 'transparent',
    });

    try {
      // Get form data and add the coupon using the CouponService
      const formData = this.couponForm.value;
      await this.serve.addCoupon(formData);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error adding coupon:', error);
    } finally {
      dialogRef.close();
      this.loading = false;
    }
  }

  // Method called when the "Cancel" button is clicked
  onCancelClick() {
    this.dialogRef.close(true);
  }

}
