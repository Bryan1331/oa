import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Classroom } from '../../model/classroom';
import { ClassroomService } from '../../services/classroom.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  displayedColumns: string[] = ['idClassroom', 'code', 'capacity', 'course', 'teacher', 'career', 'actions'];
  dataSource: MatTableDataSource<Classroom>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private classroomService: ClassroomService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.classroomService.findAll().subscribe(data => {
      this.createTable(data);
    });

    this.classroomService.getClassroomChange().subscribe(data => {
      this.createTable(data);
    });

    this.classroomService.getMessageChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000 });
    });
  }

  createTable(data: Classroom[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this classroom?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classroomService.delete(id)
          .pipe(switchMap(() => this.classroomService.findAll()))
          .subscribe(data => {
            this.classroomService.setClassroomChange(data);
            this.classroomService.setMessageChange('DELETED!');
          });
      }
    });
  }
}