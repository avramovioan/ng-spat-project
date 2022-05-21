import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { RouterTestingModule } from '@angular/router/testing'
import { CourseCreateComponent } from '../course-create/course-create.component';

import { CourseService } from 'src/services/course.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MockCourse } from 'src/models/MockCourse';
import { BehaviorSubject } from 'rxjs';
import { BrowserModule, By } from '@angular/platform-browser';
import { CourseCardComponent } from '../course-card/course-card.component';
import { CommonModule } from '@angular/common';

describe('CourseListComponent', () => {
    let component : CourseListComponent;
    let courseService : CourseService;
    let router: Router;
    let fixture: ComponentFixture<CourseListComponent>;

    const courses : MockCourse[] = [
        { id: 1, title: 'MyCourseTitle1', description: 'MyCourseDescription1' },
        { id: 2, title: 'MyCourseTitle2', description: 'MyCourseDescription2' },
        { id: 3, title: 'MyCourseTitle3', description: 'MyCourseDescription3' }
    ];
   
    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'create', component: CourseCreateComponent},
                ]),
                HttpClientModule,
                BrowserModule 
            ],
            declarations: [
                CourseListComponent,
                CourseCardComponent,
            ],
            providers: [
                CourseService, 
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        courseService = TestBed.inject(CourseService);
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        router.initialNavigation();
    });

    it('should be created', ()=> {
        expect(component).toBeTruthy();
    });

    it('On Add Course button click it should navigate to "create" ', fakeAsync(() => {
        spyOn(component, 'navigateToCreate');
        let button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        tick();
        expect(component.navigateToCreate).toHaveBeenCalled();
    }));
    
    it('On calling navigateToCreate should redirect to create', () => {
        spyOn(router, 'navigate');
        component.navigateToCreate();
        expect(router.navigate).toHaveBeenCalledWith(['create']);
    });

    it('On init should get all courses from courseService', fakeAsync(() => {
        const mockCourses = new BehaviorSubject<MockCourse[]>(courses);
        spyOn(courseService, 'getAllCourses').and.returnValue(mockCourses);
        fixture.detectChanges(); //awaiting the subscribe function to compolete
        fixture.whenStable().then(() => {
            expect(component.courses).toEqual(mockCourses.value);
        });
    }));

    it('Component should render child component - app-course-card', fakeAsync(() => {
        const mockCourses = new BehaviorSubject<MockCourse[]>(courses);
        spyOn(courseService, 'getAllCourses').and.returnValue(mockCourses);
        fixture.detectChanges(); //awaiting the subscribe function to compolete
        fixture.whenRenderingDone().then(() => {
            const counter = fixture.debugElement.query(By.css('app-course-card'));
            expect(counter).toBeTruthy();
        });
    }));
    
});
