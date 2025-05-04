import path from "node:path";

import fs from "fs";

import { Student } from "../model/student.model";

export const importStudents = async (): Promise<void> => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, "students.json"),
      "utf-8",
    );
    const students = JSON.parse(data);
    for (const studentData of students) {
      const existingStudent = await Student.findOne({
        name: studentData.name,
        surname: studentData.surname,
        email: studentData.email,
        phone: studentData.phone,
        course: studentData.course,
      });

      if (!existingStudent) {
        await Student.create(studentData);
        console.log(
          `Student ${studentData.name} ${studentData.surname} added.`,
        );
      } else {
        console.log(
          `Student ${studentData.name} ${studentData.surname} with course ${studentData.course} already exists.`,
        );
      }
    }
  } catch (error) {
    console.error("Error adding students:", error);
  }
};
