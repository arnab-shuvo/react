// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = {
	id: string;
	name: string;
};

type Error = {
	message: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[] | Error>) {
	if (req.method !== "POST") {
		return res.status(405).json({
			message: `Method ${req.method} Not Allowed`,
		});
	}

	const schema = z.object({
		id: z.string(),
		name: z.string(),
	});
	const response = schema.safeParse(req.body);

	if (!response.success) {
		const { errors } = response.error;

		return res.status(400).json({ message: errors });
	}

	return res.status(200).json({ message: "Success" });
}
