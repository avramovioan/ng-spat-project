import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/models/Course';
import { CourseService } from 'src/services/course.service';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Output() public deleteEvent = new EventEmitter<Course>();

  constructor(private courseService: CourseService, 
              private router: Router) { }

  ngOnInit(): void {
  }

  deleteCourse(): void{
    this.courseService.deleteCourse(this.course.id!).subscribe(
      res => {
          this.deleteEvent.emit(this.course);
      }
    );
  }
  onUpdate(): void{
    this.courseService.setCourseForUpdate(this.course);
    this.router.navigate(['update']);
  }

}
