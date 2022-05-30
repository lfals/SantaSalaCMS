// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeUserData } from "@utils";

export default function handler(req: any, res: any) {
  const { body, method } = req;

  switch (method) {
    case "POST":
      writeUserData(body);
      res.status(200).json(body);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
