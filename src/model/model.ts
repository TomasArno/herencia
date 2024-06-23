import DB from '../database/database.json';
import jsonfile from 'jsonfile';
import { randomUUID } from 'node:crypto';
import { findUser } from './utils';

import { FullUserData, UserData, TeacherData, StudentData } from './types';

const PATH = './src/database/database.json';

class SuperClass {
	username;
	password;
	id;
	role;

	constructor(userData: UserData) {
		const { username, password, role } = userData;

		this.username = username;
		this.password = password;
		this.role = role;
		this.id = randomUUID();
	}

	login(username: string, password: string) {
		if (password !== this.password) return 'Wrong credentials';
		// logica del login...
		return 'User logged';
	}

	logout() {
		return 'User logged out';
	}

	changePassword(currentPassword: string, newPassword: string) {
		if (currentPassword !== this.password) return 'Wrong credentials';

		this.password = newPassword;

		return 'Password changed';
	}
}
class Teacher extends SuperClass {
	numSubjects: number;
	birthyear: number;
  
	constructor(dataTeacher: TeacherData) {
	  //username: string; password: string;numSubjects: string[]; birthyear: number;
	  const { username, password, numSubjects, birthyear } = dataTeacher;
	  super({ username: username, password: password, role: "teacher" }); //aca mandamos esto x parametro al constructor de la superclass: UserDAta
	  this.numSubjects = numSubjects;
	  this.birthyear = birthyear;
	}
	//Calificar a los alumnos, login, logout, cambiar contraseña de su perfil.
	rateStudent(studentId: string, score: number): string {
	  return `the student ${studentId} got ${score}`;
	}
  }
  
  // const tomas = new Teacher ({username: "tomas", password: "contraseña", numSubjects: 5, birthyear: 1955})
  // tomas.rateStudent("xxx2", 8)
  
  class Student extends SuperClass {
	numSubjects: number;
	birthyear: number;
  
	constructor(dataStudent: StudentData) {
	  //username: string; password: string;numSubjects: string[]; birthyear: number;
	  const { username, password, numSubjects, birthyear } = dataStudent; //const username = dataStudent.username
	  super({ username: username, password: password, role: "student" }); //aca mandamos esto x parametro al constructor de la superclass: UserDAta
	  this.numSubjects = numSubjects;
	  this.birthyear = birthyear;
	}
	//Inscribirse a materias, login, sign out, cambiar contraseña de su perfil
	enrollSubject(subjectId: string) {
	  return `the student ${this.username} enrolled in ${subjectId}`; //console.log(this.id)
	}
  }
  // const cami = new Student({ username: "cami", password: "abc", numSubjects: 2, birthyear: 2000 })
  // cami.enrollSubject("")
  // const sofi = new Student({ username: "sofi", password: "abc", numSubjects: 2, birthyear: 2000 })
  // sofi.enrollSubject("")
  
  class Admin extends SuperClass {
	//Nombre de usuario, contraseña, tipo de usuario y UUID
	constructor(username: string, password: string) {
	  super({ username: username, password: password, role: "admin" });
	}
  
	createNewSubject(subjectName: string) {
	  return "Subject: " + subjectName + " created";
	}
  
	createNewUser(userData: TeacherData | StudentData) {
	  return `${userData.username} created`;
	}
  
	changeUserPassword(userId: string, newPassword: string) {
	  return "Password changed";
	}
  
	changeUserName(userId: string, newName: string) {
	  return "Name changed";
	}
  }
  
  //Crear nuevas materias, dar de alta alumnos y profesores, cambiar nombres y contraseñas de cualquier usuario.