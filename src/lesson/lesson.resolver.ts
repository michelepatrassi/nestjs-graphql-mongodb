import { CreateLessonInput, AddStudentsToLessonInput } from './lesson.input';
import { Resolver, Query, Mutation, Args, Parent, ResolveField } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService
    ) {

    }
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ) {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getAll();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput
    ) {
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns => LessonType) 
    addStudentsToLesson(@Args('addStudentsToLessonInput') addStudentsToLessonInput: AddStudentsToLessonInput) {
        return this.lessonService.addStudentsToLesson(addStudentsToLessonInput)
    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentService.getManyStudents(lesson.students)
    }
}