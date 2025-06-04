import { StudentStatusEnum } from "../enums/student.enum";
import { ApiError } from "../errors/api-error";
import {
  IStudent,
  IStudentListQuery,
  IStudentListResponse,
  IStudentStatistics,
  IStudentUpdateDto,
  IStunentCreateDto,
} from "../interfaces/student.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { studentPresenter } from "../presenters/student.presenter";
import { studentRepository } from "../repositories/student.repository";

class StudentService {
  public async createStudent(dto: IStunentCreateDto): Promise<IStudent> {
    return await studentRepository.createStudent(dto);
  }
  public async getStudentList(
    query: IStudentListQuery,
  ): Promise<IStudentListResponse> {
    const { entities, total } = await studentRepository.getStudentList(query);
    return studentPresenter.toResponseList(entities, total, query);
  }
  public async getStudentStatistics(): Promise<{ stats: IStudentStatistics }> {
    const stats = await studentRepository.getStudentStatistics();
    return { stats };
  }
  public async getStudentById(studentId: string): Promise<IStudent> {
    const student = await studentRepository.getStudentById(studentId);
    if (!student) {
      throw new ApiError("Student not found", 404);
    }
    return student;
  }
  public async updateStudent(
    tokenPayload: ITokenPayload,
    dto: IStudentUpdateDto,
    studentId: string,
  ): Promise<IStudent> {
    const managerId = tokenPayload.managerId;
    const student = await studentRepository.getStudentById(studentId);
    if (!student) {
      throw new ApiError("Student not found", 404);
    }
    if (student._managerId?.toString() === managerId.toString()) {
      return await studentRepository.updateStudent(studentId, dto);
    }
    if (!student._managerId) {
      const updatedDto: IStudentUpdateDto = {
        ...dto,
        _managerId: managerId,
        status: StudentStatusEnum.IN_WORK,
      };
      return await studentRepository.updateStudent(studentId, updatedDto);
    }
    throw new ApiError("You do not have permission to edit this student", 403);
  }
  public async deleteStudent(studentId: string): Promise<void> {
    const student = await studentRepository.getStudentById(studentId);
    if (!student) {
      throw new ApiError("Student not found", 404);
    }
    await studentRepository.delete(studentId);
  }
}
export const studentService = new StudentService();
