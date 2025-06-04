import { FilterQuery, SortOrder } from "mongoose";

import { StudentStatusEnum } from "../enums/student.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";
import { ApiError } from "../errors/api-error";
import {
  IStudent,
  IStudentListQuery,
  IStudentStatistics,
  IStudentUpdateDto,
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
    const filterObj: FilterQuery<IStudent> = {};
    if (query.course) filterObj.course = query.course;
    if (query.course_type) filterObj.course_type = query.course_type;
    if (query.course_format) filterObj.course_format = query.course_format;
    if (query.status) filterObj.status = query.status;
    if (query.manager) filterObj.manager = query.manager;
    if (query.group) filterObj.group = query.group;
    if (query.age) filterObj.age = query.age;
    if (query.name) filterObj.name = { $regex: query.name, $options: "i" };
    if (query.surname)
      filterObj.surname = { $regex: query.surname, $options: "i" };
    if (query.email) filterObj.email = { $regex: query.email, $options: "i" };
    if (query.phone) filterObj.phone = { $regex: query.phone, $options: "i" };
    if (query.managerOnly && query.currentManagerId) {
      filterObj.manager = query.currentManagerId;
    }
    const limit = query.limit || 25;
    const skip = limit * (query.page - 1);
    const allowedFields = Object.values(StudentListOrderEnum);
    if (!allowedFields.includes(query.orderBy)) {
      throw new ApiError("Invalid order by", 400);
    }
    const sortObj: { [key: string]: SortOrder } = {
      [query.orderBy]: query.order,
    };
    const [entities, total] = await Promise.all([
      Student.find(filterObj).sort(sortObj).limit(limit).skip(skip),
      Student.countDocuments(filterObj),
    ]);
    return { entities, total };
  }
  public async getStudentStatistics(): Promise<IStudentStatistics> {
    const statistics = await Student.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const stats: IStudentStatistics = {
      total: 0,
      [StudentStatusEnum.IN_WORK]: 0,
      [StudentStatusEnum.NEW]: 0,
      [StudentStatusEnum.AGGRE]: 0,
      [StudentStatusEnum.DISAGGRE]: 0,
      [StudentStatusEnum.DUBBING]: 0,
    };
    for (const item of statistics) {
      stats.total += item.count;

      const status =
        StudentStatusEnum[item._id as keyof typeof StudentStatusEnum] ||
        item._id;
      if (status in stats) {
        stats[status as keyof IStudentStatistics] = item.count;
      }
    }

    return stats;
  }
  public async getStudentById(studentId: string): Promise<IStudent> {
    return await Student.findById(studentId);
  }
  public async updateStudent(
    studentId: string,
    dto: IStudentUpdateDto,
  ): Promise<IStudent> {
    return await Student.findByIdAndUpdate(studentId, dto, { new: true });
  }

  public async delete(studentId: string): Promise<void> {
    await Student.deleteOne({ id: studentId });
  }
}
export const studentRepository = new StudentRepository();
