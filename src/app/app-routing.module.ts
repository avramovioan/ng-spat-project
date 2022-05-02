import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseUpdateComponent } from './course-update/course-update.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'create', component: CourseCreateComponent},
  { path: 'update', component: CourseUpdateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
