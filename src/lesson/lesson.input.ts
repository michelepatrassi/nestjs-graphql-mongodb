import { InputType, Field, ID } from '@nestjs/graphql';
import {MinLength, IsDateString, IsUUID} from 'class-validator'

@InputType()
export class CreateLessonInput {
    @Field()
    @MinLength(1)
    name: string;

    @Field()
    @IsDateString()
    startDate: string;

    @Field()
    @IsDateString()
    endDate: string;

    @IsUUID("4")
    @Field(returns => [ID], {defaultValue: []})
    students: string[]
}

@InputType()
export class AddStudentsToLessonInput {
    @IsUUID("4")
    @Field(returns => ID)
    lessonId: string;

    @IsUUID("4", {each: true})
    @Field(returns => [ID])
    studentIds: string[]
}