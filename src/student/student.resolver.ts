import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { StudentService } from './student.service';
import { StudentType } from './student.type';
import { CreateStudentInput } from './student.input';

@Resolver()
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query(returns => [StudentType]) 
    students() {
        return this.studentService.getAll();
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentInput') input: CreateStudentInput) {
        return this.studentService.createStudent(input);
    }
}