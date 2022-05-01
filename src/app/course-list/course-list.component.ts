import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Course } from 'src/models/Course';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  
  _cour!: Course[];

  constructor(private courseService: CourseService, 
              private router: Router) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      res => {
        this._cour = res;

      }
    )
  }
  navigateToCreate(): void{
    this.router.navigate(['create']);
  }
  onDelete(course: Course): void{
    const index2 =this._cour.findIndex(c=> c.id == course.id);
    this._cour.splice(index2, 1);
  }
}
