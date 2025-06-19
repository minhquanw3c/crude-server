import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function getUsers() {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
		return Promise.resolve(users);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

export async function createUser(
	name: string,
	email: string,
	password: string
) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return Promise.resolve(createdUser);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

export async function updateUser(
	userId: number,
	name: string,
	password: string
) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const updatedUser = await prisma.user.update({
			data: {
				name,
				password: hashedPassword,
			},
			where: {
				id: userId,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return Promise.resolve(updatedUser);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

export async function deleteUser(userId: number) {
	try {
		const deletedUser = await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		return Promise.resolve(deletedUser);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}

export async function findUserById(userId: number) {
	try {
		const userToFind = await prisma.user.findFirstOrThrow({
			where: {
				id: userId,
			},
		});

		return Promise.resolve(userToFind);
	} catch (err) {
		console.error(err);
		return Promise.resolve(null);
	}
}

export async function findUserByEmail(userEmail: string) {
	try {
		const userToFind = await prisma.user.findFirstOrThrow({
			where: {
				email: userEmail,
			},
		});

		return Promise.resolve(userToFind);
	} catch (err) {
		console.error(err);
		return Promise.resolve(null);
	}
}
