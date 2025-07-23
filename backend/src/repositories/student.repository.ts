import { FilterQuery, SortOrder, Types } from "mongoose";

import { StudentStatusEnum } from "../enums/student.enum";
import { StudentListOrderEnum } from "../enums/student-list-order.enum";
import { ApiError } from "../errors/api-error";
import {
  IStudent,
  IStudentListQuery,
  IStudentStatistics,
  IStudentUpdateDto,
} from "../interfaces/student.interface";
import { Student } from "../model/student.model";

type StatusAggregationResult = {
  _id: string;
  count: number;
};
class StudentRepository {
  private buildFilter(query: IStudentListQuery): FilterQuery<IStudent> {
    const filter: FilterQuery<IStudent> = {};

    if (query.course) filter.course = query.course;
    if (query.course_type) filter.course_type = query.course_type;
    if (query.course_format) filter.course_format = query.course_format;
    if (query.status) filter.status = query.status;
    if (query.manager) filter.manager = query.manager;
    if (query.group) filter.group = query.group;
    if (query.age) filter.age = query.age;
    if (query.name) filter.name = { $regex: query.name, $options: "i" };
    if (query.surname)
      filter.surname = { $regex: query.surname, $options: "i" };
    if (query.email) filter.email = { $regex: query.email, $options: "i" };
    if (query.phone) filter.phone = { $regex: query.phone, $options: "i" };
    if (query.currentManagerId) filter._managerId = query.currentManagerId;

    if (query.startDate || query.endDate) {
      filter.createdAt = {};
      if (query.startDate) filter.createdAt.$gte = new Date(query.startDate);
      if (query.endDate) filter.createdAt.$lte = new Date(query.endDate);
    }

    return filter;
  }
  private buildSort(query: IStudentListQuery): { [key: string]: SortOrder } {
    const allowedFields = Object.values(StudentListOrderEnum);
    if (!allowedFields.includes(query.orderBy)) {
      throw new ApiError("Invalid order by", 400);
    }

    return {
      [query.orderBy]: query.order,
    };
  }
  // public async createStudent(dto: IStudentCreateDto): Promise<IStudent> {
  //   return await Student.create(dto);
  // }
  public async getStudentList(
    query: IStudentListQuery,
  ): Promise<{ entities: IStudent[]; total: number }> {
    const filterObj = this.buildFilter(query);
    const sortObj = this.buildSort(query);
    const limit = query.limit || 25;
    const skip = limit === 0 ? 0 : limit * (query.page - 1);
    const [entities, total] = await Promise.all([
      Student.find(filterObj).sort(sortObj).limit(limit).skip(skip),
      Student.countDocuments(filterObj),
    ]);

    return { entities, total };
  }
  public async getStudentListWithoutPagination(
    query: IStudentListQuery,
  ): Promise<{ entities: IStudent[] }> {
    const filterObj = this.buildFilter(query);
    const sortObj = this.buildSort(query);

    const entities = await Student.find(filterObj).sort(sortObj);
    return { entities };
  }
  public async getStudentStatistics(
    managerObjectId?: Types.ObjectId,
  ): Promise<IStudentStatistics> {
    const matchStage: FilterQuery<IStudent> = {};

    if (managerObjectId) {
      matchStage._managerId = managerObjectId;
    }

    const statistics = await Student.aggregate<StatusAggregationResult>([
      { $match: matchStage },
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

  // public async delete(studentId: string): Promise<void> {
  //   await Student.deleteOne({ id: studentId });
  // }
}
export const studentRepository = new StudentRepository();
