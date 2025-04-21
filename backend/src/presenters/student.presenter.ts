import {
  IStudent,
  IStudentListQuery,
  IStudentListResponse,
} from "../interfaces/student.interface";

class StudentPresenter {
  public toResponse(entity: IStudent) {
    return {
      _id: entity._id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: entity.age,
      course: entity.course,
      course_format: entity.course_format,
      course_type: entity.course_type,
      status: entity.status,
      sum: entity.sum,
      alreadyPaid: entity.alreadyPaid,
      _managerId: entity._managerId,
      group: entity.group,
      message: entity.message,
      utm: entity.utm,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  public toShortResponse(entity: IStudent) {
    return {
      _id: entity._id,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
      phone: entity.phone,
      age: entity.age,
      course: entity.course,
      course_format: entity.course_format,
      course_type: entity.course_type,
      status: entity.status,
      sum: entity.sum,
      alreadyPaid: entity.alreadyPaid,
      createdAt: entity.createdAt,
    };
  }
  public toResponseList(
    entities: IStudent[],
    total: number,
    query: IStudentListQuery,
  ): IStudentListResponse {
    return {
      total,
      data: entities.map(this.toResponse),
      ...query,
    };
  }
}
export const studentPresenter = new StudentPresenter();
