import { FilterQuery, SortOrder } from "mongoose";

import { StudentListOrderEnum } from "../enums/student-list-order.enum";
import { ApiError } from "../errors/api-error";
import {
  IStudent,
  IStudentListQuery,
  IStunentCreateDto,
} from "../interfaces/student.interface";
import { Student } from "../model/student.model";

class StudentRepository {
  public async createStudent(dto: IStunentCreateDto): Promise<IStudent> {
    return await Student.create(dto);
  }
  public async getStudentList(
    query: IStudentListQuery,
  ): Promise<{ entities: IStudent[]; total: number }> {
    const filterObj: FilterQuery<IStudent> = { isDeleted: false };
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const limit = 25;
    const skip = limit * (query.page - 1);
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case StudentListOrderEnum.NAME:
        sortObj.name = query.order;
        break;
      case StudentListOrderEnum.ID:
        sortObj._id = query.order;
        break;
      default:
        throw new ApiError("Invalid order by", 400);
    }
    const [entities, total] = await Promise.all([
      Student.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      Student.countDocuments(filterObj),
    ]);
    return { entities, total };
  }
  public async getStudentById(studentId: string): Promise<IStudent> {
    return await Student.findById(studentId);
  }
  public async updateStudent(
    studentId: string,
    dto: Partial<IStudent>,
  ): Promise<IStudent> {
    return await Student.findByIdAndUpdate(studentId, dto, { new: true });
  }

  public async delete(studentId: string): Promise<void> {
    await Student.deleteOne({ id: studentId });
  }
}
export const studentRepository = new StudentRepository();
