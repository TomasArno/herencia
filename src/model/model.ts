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