import { Routes } from '@angular/router';
import { CourseComponent } from './pages/course/course.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { CourseEditComponent } from './pages/course/course-edit/course-edit.component';
import { ClassroomComponent } from './pages/classroom/classroom.component';
import { ClassroomEditComponent } from './pages/classroom/classroom-edit/classroom-edit.component';

export const routes: Routes = [
    {
        path: 'pages/course',
        component: CourseComponent,
        children: [
            { path: 'new', component: CourseEditComponent },
            { path: 'edit/:id', component: CourseEditComponent },
        ],
    },
    { path: 'pages/teacher', component: TeacherComponent },
    {
        path: 'pages/classroom',
        component: ClassroomComponent,
        children: [
            { path: 'new', component: ClassroomEditComponent },
            { path: 'edit/:id', component: ClassroomEditComponent },
        ],
    },
];