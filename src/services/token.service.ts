import prisma from "../lib/prisma";

export async function getTokens() {
	try {
		const tokens = await prisma.token.findMany({
			select: {
				id: true,
				currency: true,
				date: true,
				price: true,
				imageUrl: true,
				chains: true,
			},
		});
		return Promise.resolve(tokens);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}
