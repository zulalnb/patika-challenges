import express from "express";
import nodemailer from "nodemailer";
import Hasura from "../../clients/hasura";
import { GET_MEETING_PARTICIPANTS } from "./queries";

const router = express.Router();

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

router.post("/meeting_created", async (req, res, next) => {
  const meeting = req.body.event.data.new;

  const { meetings_by_pk } = await Hasura.request(GET_MEETING_PARTICIPANTS, {
    id: meeting.id,
  });

  const title = meeting.title;
  const { fullName } = meetings_by_pk.user;
  const participants = meetings_by_pk.participants.map(
    ({ user }) => user.email
  );

  const mailOptions = {
    from: "myhasurabackend@gmail.com",
    to: participants.toString(),
    subject: `${fullName} invited you to a meeting`,
    text: `${fullName} invited you to ${title} meeting`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error);
    }
    console.log("Email sent: ", info.response);
    res.json({ info });
  });
});

export default router;
