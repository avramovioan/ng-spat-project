import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/models/Course';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  createForm!: FormGroup;
  submitted: boolean = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  get f() { return this.createForm.controls; }


  navigateToHome(): void{
    this.router.navigate(['home']);
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.createForm.invalid) return;
    let course : Course = { title: this.f.title.value , description: this.f.description.value }
    this.courseService.createCourse(course).subscribe();
    this.router.navigate(['home']);
  }
}
