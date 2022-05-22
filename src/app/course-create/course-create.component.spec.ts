import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable } from 'rxjs';
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

    it('Form should be built upon component init', ()=> {
        expect(component.createForm).toBeTruthy();
    });

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

    it('When clicking Submit button, should call onSubmit()', () => {
        spyOn(component, 'onSubmit');
        let button = fixture.debugElement.nativeElement.querySelector('#submitForm');
        button.click();
        expect(component.onSubmit).toHaveBeenCalled(); 
    });

    it('get f() must return a form controls', () =>{
        const mockForm = formBulider.group({
            test: ['', Validators.required]
        });
        component.createForm = mockForm;
        expect(component.f).toBe(mockForm.controls);
        expect(component.f.test).toEqual(mockForm.controls.test);
    });

    it('Form title and description should be displayed', () => {
        const title = fixture.debugElement.nativeElement.querySelector('#title');
        const description = fixture.debugElement.nativeElement.querySelector('#description');
        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
    });

    it('Should mark title as invalid if the field are empty', ()=>{
        const title = component.createForm.controls.title;
        expect(title.valid).toBeFalsy();
    
        title.setValue('');
        expect(title.hasError('required')).toBeTruthy();
    });

    it('Should mark description as invalid if the field are empty', ()=>{
        const description = component.createForm.controls.description;
        expect(description.valid).toBeFalsy();
    
        description.setValue('');
        expect(description.hasError('required')).toBeTruthy();
    });

    it('Title and description should be valid if field is populated', ()=> {
        const title = component.createForm.controls.title;
        const description = component.createForm.controls.description;
        title.setValue('test title');
        description.setValue('test description');
        expect(description.valid).toEqual(true);
        expect(title.valid).toEqual(true);
    });

    it('On submit exits when form is invalid', ()=>{
        const title = component.createForm.controls.title;
        const description = component.createForm.controls.description;
        title.setValue('');
        description.setValue('');
        spyOn(courseService, 'createCourse' );
        component.onSubmit();
        expect(courseService.createCourse).not.toHaveBeenCalled();
    });

    it('On valid submit courseServoce should be called with the filled title and description', () => {
        const mockCourse = new BehaviorSubject<MockCourse>(courses[0]);
        const title = component.createForm.controls.title;
        const description = component.createForm.controls.description;
        title.setValue(mockCourse.value.title);
        description.setValue(mockCourse.value.description);
        spyOn(courseService, 'createCourse').and.returnValue(mockCourse.asObservable());
        let button = fixture.debugElement.nativeElement.querySelector('#submitForm');
        button.click();
        fixture.detectChanges();
        expect(courseService.createCourse).toHaveBeenCalledOnceWith({title: mockCourse.value.title, description: mockCourse.value.description}); 
    });

    it('On valid create should redirect to home page', ()=>{
        spyOn(router, 'navigate');
        const title = component.createForm.controls.title;
        const description = component.createForm.controls.description;
        title.setValue('test title');
        description.setValue('test description');
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['home']);
    });

});
