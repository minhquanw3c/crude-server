import prisma from "../lib/prisma";
import chains from "../constants/chains";
import tokens from "../constants/tokens";

async function main() {
	try {
		await prisma.chain.createMany({
			data: chains,
		});

		console.log("Chains inserted");

		for (const token of tokens) {
			await prisma.token.upsert({
				where: {
					tokenId: token.tokenId,
				},
				update: {},
				create: {
					tokenId: token.tokenId,
					currency: token.currency,
					date: token.date,
					price: token.price,
					imageUrl: token.imageUrl,
					chains: {
						connect: token.chainIds.map((c) => {
							return {
								chainId: c,
							};
						}),
					},
				},
			});
		}

		console.log("Seeding completed");
	} catch (err) {
		console.error(err);
	}
}

main().finally(async () => await prisma.$disconnect());
