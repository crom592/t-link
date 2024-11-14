// pages/api/auth/session.js
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  res.send({ session });
};
