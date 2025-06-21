import prisma from "../lib/prisma";

export async function getChains() {
	try {
		const chains = await prisma.chain.findMany({
			select: {
				id: true,
				name: true,
				chainId: true,
				imageUrl: true,
				tokens: true,
			},
		});
		return Promise.resolve(chains);
	} catch (err) {
		console.error(err);
		return Promise.reject(err);
	}
}
