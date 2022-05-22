import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/models/Course';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

  updateForm!: FormGroup;
  submitted: boolean = false;
  courseToUpdate: Course | undefined;
    createForm: any;
  constructor(private router: Router,
              private courseService: CourseService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.courseToUpdate = this.courseService.getCourseForUpdate;
    if(this.courseToUpdate == null || this.courseToUpdate == undefined) {
      this.router.navigate(['home']);
    }
    this.updateForm = this.formBuilder.group({
      title: [this.courseToUpdate!.title, Validators.required],
      description: [this.courseToUpdate!.description, Validators.required]
    });
  }
  navigateToHome(){
    this.router.navigate(['home']);
  }

  get f() { return this.updateForm.controls; }

  onSubmit(): void{
    this.submitted = true;
    if(this.updateForm.invalid) return;
    let course : Course = { title: this.f.title.value , description: this.f.description.value, id:this.courseToUpdate!.id }
    this.courseService.updateCourse(course).subscribe(
      res => {
        this.router.navigate(['home']);
      }
    );
  }
}
