import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { MockCourse } from 'src/models/MockCourse';
import { CourseService } from 'src/services/course.service';
import { MainComponent } from '../main/main.component';

import { CourseCreateComponent } from './course-create.component';

describe('CourseCreateComponent', () => {
    let component : CourseCreateComponent;
    let courseService : CourseService;
    let router: Router;
    let formBulider: FormBuilder;
    let fixture: ComponentFixture<CourseCreateComponent>;

    const courses : MockCourse[] = [
        { id: 1, title: 'MyCourseTitle1', description: 'MyCourseDescription1' },
        { id: 2, title: 'MyCourseTitle2', description: 'MyCourseDescription2' },
        { id: 3, title: 'MyCourseTitle3', description: 'MyCourseDescription3' }
    ];
    let mockCourses = new BehaviorSubject<MockCourse[]>(courses);
    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: MainComponent},
                ]),
                HttpClientModule,
                ReactiveFormsModule,
                BrowserModule 
            ],
            declarations: [
                CourseCreateComponent
            ],
            providers: [
                CourseService, 
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        courseService = TestBed.inject(CourseService);
        formBulider = TestBed.inject(FormBuilder);
        fixture = TestBed.createComponent(CourseCreateComponent);
        component = fixture.componentInstance;
        router.initialNavigation();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('Form should be built upon component init', fakeAsync(()=> {
        fixture.whenRenderingDone().then(()=> {
            expect(component.createForm).toBeTruthy();
        });
    }));

    it('On calling navigateToHome, it should redirect to home', () => {
        spyOn(router, 'navigate');
        component.navigateToHome();
        expect(router.navigate).toHaveBeenCalledWith(['home']);
    });
    
    it('On Back button click, should call navigateToHome()', () => {
        spyOn(component, 'navigateToHome');
        let button = fixture.debugElement.nativeElement.querySelector('#backHome');
        button.click();
        expect(component.navigateToHome).toHaveBeenCalled(); 
    });

    // it('When clicking Submit button, should call onSubmit()', () => {
    //     spyOn(component, 'onSubmit');
    //     console.log(component.createForm);
    //     let button = fixture.debugElement.nativeElement.querySelector('#submitForm');
    //     button.click();
    //     expect(component.onSubmit).toHaveBeenCalled(); 
    // });

});
