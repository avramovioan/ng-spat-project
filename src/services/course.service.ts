import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/models/Course';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url: string = "http://localhost:3000/courses"

  courseUpdate: Course | undefined;

  constructor(private http: HttpClient) { }
  
  get getCourseForUpdate() : Course | undefined { return this.courseUpdate }
  setCourseForUpdate(course: Course) { this.courseUpdate = course; }

  getCourseById(id: number): Observable<Course>{
    return this.http.get<Course>(`${this.url}/${id}`);
  }
  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(this.url);
  }
  createCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${this.url}`, course);
  }
  updateCourse(course: Course): Observable<Course>{
    return this.http.put<Course>(`${this.url}/${course.id}`, course);
  }
  deleteCourse(id: number): Observable<Course>{
    return this.http.delete<Course>(`${this.url}/${id}`);
  }

}
