import { Request, Response } from "express";
import * as UserService from "./../services/user.service";
import { INTERNAL_ERROR } from "../constants/messages";
import bcrypt from "bcryptjs";

export async function getUsers(req: Request, res: Response) {
	try {
		const users = await UserService.getUsers();

		res.status(200).json({ users });
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}

export async function createUser(req: Request, res: Response) {
	try {
		const { name, email, password } = req.body;
		const currentUser = await UserService.findUserByEmail(email);

		if (currentUser) {
			res.status(409).json({ message: "Email is already in use" });
			return;
		}

		const createdUser = await UserService.createUser(name, email, password);

		res.status(201).json({
			message: "User created",
			user: createdUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const userToFind = await UserService.findUserById(Number(id));

		if (!userToFind) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const { name, password } = req.body;
		const passwordToCompare = await bcrypt.compare(
			password,
			userToFind.password
		);

		if (name === userToFind.name && passwordToCompare) {
			res.status(204).json();
			return;
		}

		const updatedUser = await UserService.updateUser(
			Number(id),
			name,
			password
		);

		res.status(200).json({
			message: "User updated",
			user: updatedUser,
		});
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}

export async function deleteUser(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const userToFind = await UserService.findUserById(Number(id));

		if (!userToFind) {
			res.status(204).json();
			return;
		}

		await UserService.deleteUser(Number(id));

		res.status(200).json({
			message: "User deleted",
		});
	} catch (err) {
		res.status(500).json({
			message: err instanceof Error ? err.message : INTERNAL_ERROR,
		});
	}
}
