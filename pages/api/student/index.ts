// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { writeUserData, getUserData } from "@utils";

export default async function handler(req: any, res: any) {
  const { body, method } = req;

  switch (method) {
    case "POST":
      if (await getUserData(body.name)) {
        res.status(409).end(`Already exists`);
        return;
      } else {
        console.log("alo");
        writeUserData(body);
      }

      res.status(200).json(body);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
