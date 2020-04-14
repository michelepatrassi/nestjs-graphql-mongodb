import { CreateLessonInput, AddStudentsToLessonInput } from './lesson.input';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from 'uuid';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson) private repository: Repository<Lesson>
    ) {}

    async getLesson(id: string): Promise<Lesson> {
        return this.repository.findOne({id});
    }

    async getAll(): Promise<Lesson[]> {
        return this.repository.find();
    }

    async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
        const {name, startDate, endDate, students} = createLessonInput;
        const lesson: Lesson = this.repository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        })

        return this.repository.save(lesson)
    }
    
    async addStudentsToLesson(addStudentsToLessonInput: AddStudentsToLessonInput): Promise<Lesson> {
        const {lessonId, studentIds} = addStudentsToLessonInput
        const lesson = await this.getLesson(lessonId);
        lesson.students = [...lesson.students, ...studentIds]

        return this.repository.save(lesson);
    }
}
