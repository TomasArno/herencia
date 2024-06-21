import DB from "../database/database.json";
import jsonfile from "jsonfile";
import { randomUUID } from "node:crypto";
import { findUser } from "./utils";

import { FullUserData, TeacherData, StudentData } from "./types";

class SuperClass {
  username;
  password;
  id;
  role;
  numSubjects; //opcional
  birthyear; //opcional

  constructor(userData: FullUserData) {
    const { username, password, role, numSubjects, birthyear } = userData;

    this.username = username;
    this.password = password;
    this.role = role;
    this.id = randomUUID();
    this.birthyear = birthyear;
    this.numSubjects = numSubjects;
  }

  login(username: string, password: string) {
    if (password !== this.password) return "Wrong credentials";
    // logica del login...
    return "User logged";
  }

  logout() {
    return "User logged out";
  }

  changePassword(currentPassword: string, newPassword: string) {
    if (currentPassword !== this.password) return "Wrong credentials";
    this.password = newPassword;
    return "Password changed";
  }
}

class Admin extends SuperClass {
  constructor(userData: FullUserData) {
    const { username, password } = userData;
    super({ username: username, password: password, role: "admin" });
  }

  createSubjets(subjet: string): string {
    return `The subjet ${subjet} was created succesfully`;
  }

  registratedStudents(userData: StudentData): string {
    return `The students ${userData.username} was created succesfully`;
  }

  registratedTeachers(userData: TeacherData): string {
    return `The teacher ${userData.username} was created succesfully`;
  }

  chageNameUser(userId: string, newName: string): string {
    return `The new name for user ${userId} is ${newName}`;
  }
}

class Teacher extends SuperClass {
  constructor(teacherData: TeacherData) {
    const { username, password, birthyear, numSubjects } = teacherData;
    super({
      username: username,
      password: password,
      numSubjects: numSubjects,
      birthyear: birthyear,
      role: "teacher",
    });
  }

  classifyStudents(studentId: string, score: number): string {
    return `the student ${studentId} has a grade of ${score}/10`;
  }
}

class Student extends SuperClass {
  constructor(studentData: StudentData) {
    const { username, password, birthyear, numSubjects } = studentData;
    super({
      username: username,
      password: password,
      numSubjects: numSubjects,
      birthyear: birthyear,
      role: "student",
    });
  }

  enrollSubjet(studentId: string, subjet: string): string {
    return `The student ${studentId} correctly registered for the subject: ${subjet}`;
  }
}

//ejemplo

const admintrator: FullUserData = {
  username: "Pablo",
  password: "qwer",
  numSubjects: 10,
  birthyear: 2010,
  role: "admin",
};

const admin1 = new Admin(admintrator);

admin1.chageNameUser("", "Flor");

const teacher: TeacherData = {
  username: "Pablo",
  password: "qwer",
  numSubjects: 10,
  birthyear: 2010,
};

const teacher1 = new Teacher(teacher);

teacher1.changePassword("", "");
