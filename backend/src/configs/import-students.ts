// import { Student } from "../model/student.model";
//
// export const importStudents = async (studentsArray: any[]) => {
//   for (const student of studentsArray) {
//     const { id, already_paid, status, created_at, ...rest } = student;
//
//     const preparedStudent = new Student({
//       ...rest,
//       alreadyPaid: already_paid || 0,
//       status: status || null,
//       createdAt: created_at ? new Date(created_at) : new Date(),
//       updatedAt: new Date(),
//     });
//
//     try {
//       await preparedStudent.save();
//     } catch (e) {
//       console.error("Error saving student:", e);
//     }
//   }
// };
