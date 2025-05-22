import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { CourseEditComponent } from './pages/course/course-edit/course-edit.component';

export const routes: Routes = [
    {
        path: 'pages/course',
        component: CourseComponent, children: [
            { path: 'new', component: CourseEditComponent },
            { path: 'edit/:id', component: CourseEditComponent },
        ],
    },
    { path: 'pages/teacher', component: TeacherComponent },
];
