import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { MockCourse } from 'src/models/MockCourse';
import { CourseService } from 'src/services/course.service';
import { CourseUpdateComponent } from '../course-update/course-update.component';

import { CourseCardComponent } from './course-card.component';

describe('CourseCardComponent', () => {
    let component : CourseCardComponent;
    let courseService : CourseService;
    let router: Router;
    let fixture: ComponentFixture<CourseCardComponent>;

    const course = new BehaviorSubject<MockCourse>({ id: 1, title: 'MyCourseTitle1', description: 'MyCourseDescription1' });
    ;
    beforeEach(()=> {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'update', component: CourseUpdateComponent},
                ]),
                HttpClientModule 
            ],
            declarations: [
                CourseCardComponent
            ],
            providers: [
                CourseService, 
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        courseService = TestBed.inject(CourseService);
        fixture = TestBed.createComponent(CourseCardComponent);
        component = fixture.componentInstance;
        component.course = course.value;
        router.initialNavigation();
        fixture.detectChanges();
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });

    it('Card title and description should display course properties', ()=>{
        const title = fixture.debugElement.nativeElement.querySelector('#cardTitle');
        const description = fixture.debugElement.nativeElement.querySelector('#cardDescription');
        expect(title.innerText).toEqual(course.value.title);
        expect(description.innerText).toEqual(course.value.description);
    });

    it('On Delete button click deleteCourse method should be called', ()=>{
        spyOn(component, 'deleteCourse');
        const button = fixture.debugElement.nativeElement.querySelector('#deleteButton');
        button.click();
        expect(component.deleteCourse).toHaveBeenCalled();
    });

    it('On Update button click onUpdate method should be called', ()=>{
        spyOn(component, 'onUpdate');
        const button = fixture.debugElement.nativeElement.querySelector('#updateButton');
        button.click();
        expect(component.onUpdate).toHaveBeenCalled();
    });

    it('deleteEvent must be emitted on deleteCourse', fakeAsync(() => {
        spyOn(component.deleteEvent, 'emit');
        spyOn(courseService, 'deleteCourse').and.returnValue(course.asObservable());
        component.deleteCourse();
        tick();
        fixture.detectChanges();
        expect(component.deleteEvent.emit).toHaveBeenCalledOnceWith(course.value);
    }));

    it('onUpdate should set course to be updated', ()=> {
        spyOn(courseService, 'setCourseForUpdate');
        component.onUpdate();
        expect(courseService.setCourseForUpdate).toHaveBeenCalledOnceWith(course.value);
    });
    
    it('onUpdate should redirect to update route', ()=> {
        spyOn(router, 'navigate');
        component.onUpdate();
        expect(router.navigate).toHaveBeenCalledOnceWith(['update']);
    });
});
