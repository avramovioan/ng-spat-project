import { Component, OnInit } from '@angular/core';
import { Course } from 'src/models/Course';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      res => {
        this.courses = res;
      }
    )
  }

}
