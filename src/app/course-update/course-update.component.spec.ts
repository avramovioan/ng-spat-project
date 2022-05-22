import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { MockCourse } from 'src/models/MockCourse';
import { CourseService } from 'src/services/course.service';
import { MainComponent } from '../main/main.component';

import { CourseUpdateComponent } from './course-update.component';

describe('CourseUpdateComponent', () => {
    let component : CourseUpdateComponent;
    let courseService : CourseService;
    let router: Router;
    let formBulider: FormBuilder;
    let fixture: ComponentFixture<CourseUpdateComponent>;
    let spy: jasmine.Spy;

    const course : MockCourse =  { id: 1, title: 'MyCourseTitle1', description: 'MyCourseDescription1' };
    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'home', component: MainComponent},
                ]),
                HttpClientModule,
                ReactiveFormsModule,
            ],
            declarations: [
                CourseUpdateComponent
            ],
            providers: [
                CourseService, 
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        courseService = TestBed.inject(CourseService);
        spy = spyOnProperty(courseService, 'getCourseForUpdate').and.returnValue(course);
        formBulider = TestBed.inject(FormBuilder);
        fixture = TestBed.createComponent(CourseUpdateComponent);
        component = fixture.componentInstance;
        router.initialNavigation();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('Form should be built upon component init', ()=> {
        expect(component.updateForm).toBeTruthy();
    });

    // it('Should redirect to home if no course to update is present', () => {
    //     spy.and.returnValue(undefined);
    //     spyOn(router, 'navigate');
    //     component.ngOnInit();
    //     expect(router.navigate).toHaveBeenCalledOnceWith(['home']);
    // });

    it('On calling navigateToHome, it should redirect to home', () => {
        spyOn(router, 'navigate');
        component.navigateToHome();
        expect(router.navigate).toHaveBeenCalledWith(['home']);
        
    });
    
    it('On Back button click, should call navigateToHome()', () => {
        spyOn(component, 'navigateToHome');
        const button = fixture.debugElement.nativeElement.querySelector('#backHome');
        button.click();
        expect(component.navigateToHome).toHaveBeenCalled(); 
    });

    it('When clicking Submit button, should call onSubmit()', () => {
        spyOn(component, 'onSubmit');
        const button = fixture.debugElement.nativeElement.querySelector('#submitForm');
        button.click();
        expect(component.onSubmit).toHaveBeenCalled(); 
    });

    it('get f() must return a form controls', () =>{
        const mockForm = formBulider.group({
            test: ['', Validators.required]
        });
        component.updateForm = mockForm;
        expect(component.f).toBe(mockForm.controls);
        expect(component.f.test).toEqual(mockForm.controls.test);
    });

    it('Form title and description should be displayed', () => {
        expect(component.updateForm.controls.title.value).toEqual(course.title);
        expect(component.updateForm.controls.description.value).toEqual(course.description);
    });

    it('Form title and description should be preloaded', () => {
        const title = fixture.debugElement.nativeElement.querySelector('#title');
        const description = fixture.debugElement.nativeElement.querySelector('#description');
        expect(title).toBeTruthy();
        expect(description).toBeTruthy();
    });


    it('Should mark title as invalid if the field are empty', ()=>{
        const title = component.updateForm.controls.title;
        title.setValue('');
        expect(title.valid).toBeFalsy();
        expect(title.hasError('required')).toBeTruthy();
    });

    it('Should mark description as invalid if the field are empty', ()=>{
        const description = component.updateForm.controls.description;
        description.setValue('');
        expect(description.valid).toBeFalsy();
        expect(description.hasError('required')).toBeTruthy();
    });

    it('Title and description should be valid if field is populated', ()=> {
        const title = component.updateForm.controls.title;
        const description = component.updateForm.controls.description;
        title.setValue('test title');
        description.setValue('test description');
        expect(description.valid).toEqual(true);
        expect(title.valid).toEqual(true);
    });

    it('On submit exits when form is invalid', ()=>{
        const title = component.updateForm.controls.title;
        const description = component.updateForm.controls.description;
        title.setValue('');
        description.setValue('');
        spyOn(courseService, 'createCourse' );
        component.onSubmit();
        expect(courseService.createCourse).not.toHaveBeenCalled();
    });

    it('On valid submit courseService.createCourse should be called with the filled title and description', () => {
        course.description = course.description+'_test';
        course.title = course.title + '_test';
        const mockCourse = new BehaviorSubject<MockCourse>(course);
        const title = component.updateForm.controls.title;
        const description = component.updateForm.controls.description;
        title.setValue(mockCourse.value.title);
        description.setValue(mockCourse.value.description);
        spyOn(courseService, 'updateCourse').and.returnValue(mockCourse.asObservable());
        const button = fixture.debugElement.nativeElement.querySelector('#submitForm');
        button.click();
        fixture.detectChanges();
        expect(courseService.updateCourse).toHaveBeenCalledOnceWith(mockCourse.value); 
    });

    it('On valid create should redirect to home page', fakeAsync(()=>{
        spyOn(router, 'navigate');
        course.description = course.description+'_test';
        course.title = course.title + '_test';
        const mockCourse = new BehaviorSubject<MockCourse>(course);
        spyOn(courseService, 'updateCourse').and.returnValue(mockCourse.asObservable());
        const title = component.updateForm.controls.title;
        const description = component.updateForm.controls.description;
        title.setValue(course.title);
        description.setValue(course.description);
        component.onSubmit();
        expect(router.navigate).toHaveBeenCalledWith(['home']);
    }));

});
