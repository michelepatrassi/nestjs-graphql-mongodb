import { CreateLessonInput } from './lesson.input';
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService
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
}