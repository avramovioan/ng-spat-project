import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CourseService } from './course.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { MockCourse } from 'src/models/MockCourse';



describe('CourseService', () => {
  let couserService: CourseService;
  const mockCourses : MockCourse[] = [
    { id: 1, title: 'MyCourseTitle1', description: 'MyCourseDescription1' },
    { id: 2, title: 'MyCourseTitle2', description: 'MyCourseDescription2' },
    { id: 3, title: 'MyCourseTitle3', description: 'MyCourseDescription3' }
  ];
  let url = "http://localhost:3000/courses"
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    couserService = TestBed.inject(CourseService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(couserService).toBeTruthy();
  });

  it('Should get all courses with GET request', () => {
    couserService.getAllCourses().subscribe( 
      response => {
        expect(response).toEqual(mockCourses);
      }
    );
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}`,
    });
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCourses);
    httpTestingController.verify();
  });

  it('Should get resourse by its Id with GET request', () => {
    let mockCourse = mockCourses.find(mc => mc.id === 1) as MockCourse;
    couserService.getCourseById(1).subscribe( 
      response => {
        expect(response).toEqual(mockCourse);
      }
    );
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}/1`,
    });
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCourse);
    httpTestingController.verify();
  });

  it('Should update resourse with PUT request', () => {
    let mockCourse = mockCourses[0];
    mockCourse.title = "Test Title";
    couserService.updateCourse(mockCourse).subscribe( 
      response => {
        expect(response.title).toEqual(mockCourse.title);
      }
    );
    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${url}/${mockCourse.id}`
    });
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCourse);
    httpTestingController.verify();
  });

  it('Should delete course by Id with DELETE request', () => {
    let mockCourse = mockCourses[0];
    mockCourse.title = "Test Title";
    couserService.deleteCourse(mockCourse.id!).subscribe( 
      response => {
        expect(response).toEqual(mockCourse);
      }
    );
    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${url}/${mockCourse.id}`
    });
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCourse);
    httpTestingController.verify();
  });
  it('Should create course with a POST request', () => {
    let mockCourse = {
      id: 4,
      title: "Title to create",
      description: "Description to create"
    } as MockCourse;
    couserService.createCourse(mockCourse).subscribe( 
      response => {
        expect(response).toEqual(mockCourse);
      }
    );
    const req = httpTestingController.expectOne({
      method: 'POST',
      url: `${url}`
    });
    expect(req.cancelled).toBeFalsy();
    req.flush(mockCourse);
    httpTestingController.verify();
  });
});
