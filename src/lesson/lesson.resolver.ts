import { Resolver, Query } from "@nestjs/graphql";
import { LessonType } from './lesson.type';

@Resolver(of => LessonType)
export class LessonResolver {
    @Query(returns => LessonType)
    lesson() {
        const lesson: LessonType = {
            id: '1',
            name: 'Math',
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
        }
        return lesson;
    }
}