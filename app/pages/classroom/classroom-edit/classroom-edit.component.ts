import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClassroomService } from '../../../services/classroom.service';
import { CourseService } from '../../../services/course.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-classroom-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './classroom-edit.component.html',
  styleUrl: './classroom-edit.component.css'
})
export class ClassroomEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isEdit: boolean;
  courses: any[] = [];
  teachers: any[] = [];
  careers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      idClassroom: [null],
      code: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      course: ['', Validators.required],
      teacher: ['', Validators.required],
      career: ['', Validators.required]
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.loadRelatedData();
      this.initForm();
    });
  }

  loadRelatedData() {
    this.courseService.findAll().subscribe(data => this.courses = data);
    // Add similar calls for teachers and careers services
  }

  initForm() {
    if (this.isEdit) {
      this.classroomService.findById(this.id).subscribe(data => {
        this.form.patchValue({
          idClassroom: data.idClassroom,
          code: data.code,
          capacity: data.capacity,
          course: data.course.idCourse,
          teacher: data.teacher.idTeacher,
          career: data.career.idCareer
        });
      });
    }
  }

  operate() {
    if (this.form.invalid) { return; }

    const classroom = this.form.value;

    if (this.isEdit) {
      this.classroomService.update(this.id, classroom)
        .pipe(switchMap(() => this.classroomService.findAll()))
        .subscribe(data => {
          this.classroomService.setClassroomChange(data);
          this.classroomService.setMessageChange('UPDATED!');
          this.router.navigate(['/pages/classroom']);
        });
    } else {
      this.classroomService.save(classroom)
        .pipe(switchMap(() => this.classroomService.findAll()))
        .subscribe(data => {
          this.classroomService.setClassroomChange(data);
          this.classroomService.setMessageChange('CREATED!');
          this.router.navigate(['/pages/classroom']);
        });
    }
  }

  get f() {
    return this.form.controls;
  }
}