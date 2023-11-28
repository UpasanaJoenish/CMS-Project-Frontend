import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CouponService } from 'src/app/services/coupon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from 'src/app/core/core.service';
import { CouponsModel } from '../../models/Models';
import { UpdateComponent } from '../update/update.component';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  showDeleteConfirmation = false;
  couponIdToDelete!: number;

  displayedColumns: string[] = ['id', 'couponCode', 'couponName', 'description', 'discount', 'startDate', 'endDate', 'discountType', 'actions'];
  dataSource!: MatTableDataSource<CouponsModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _couponService: CouponService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getCouponsList();
  }

  deleteCoupons(id: number) {
    this.couponIdToDelete = id;
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    this._couponService.deleteCoupons(this.couponIdToDelete).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Deletetion', 'Done');
        this.getCouponsList();
        this.showDeleteConfirmation = false;
      },
      error: console.log,
    });
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
  }

  openAddForm() {
    const DialogRef = this._dialog.open(AddComponent);
    DialogRef.afterClosed().subscribe({
      next: (val: CouponsModel) => {
        if (val) {
          this.getCouponsList();
        }
      }
    });
  }

  async getCouponsList() {
    try {
      const response = await this._couponService.getCouponsListForUser();
      response.subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res as CouponsModel[]);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.log('Error getting coupons:', error);
        },
      });
    } catch (error) {
      console.error('Error getting coupons:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(project: any): void {
    const dialogRef = this._dialog.open(UpdateComponent, {
      width: '600px',
      data: {
        data: project,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getCouponsList();
    });
  }
}
