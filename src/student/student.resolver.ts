import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';
import { NotFoundException } from "@nestjs/common";

@Resolver()
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query(returns => [StudentType]) 
    async students() {
        return this.studentService.getAll();
    }

    @Query(returns => StudentType) 
    async student(@Args('id') id: string) {
        const student = await this.studentService.getStudent(id);
        if (!student) {
            throw new NotFoundException()
        }

        return student;
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentInput') input: CreateStudentInput) {
        return this.studentService.createStudent(input);
    }
}