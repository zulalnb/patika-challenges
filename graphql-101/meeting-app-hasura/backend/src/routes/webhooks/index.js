import express from "express";
import nodemailer from "nodemailer";
import Hasura from "../../clients/hasura";
import { GET_MEETING_PARTICIPANTS } from "./queries";
import moment from "moment";
import axios from "axios";

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

  const schedule_event = {
    type: "create_scheduled_event",
    args: {
      webhook: "{{ACTION_BASE_URL}}/webhooks/meeting_reminder",
      schedule_at: moment(meetings_by_pk.meeting_date).subtract(2, "minutes"),
      payload: {
        meetingId: meeting.id,
      },
    },
  };

  const add_event = await axios("http://localhost:8080/v1/query", {
    method: "POST",
    data: JSON.stringify(schedule_event),
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  });

  const event_data = add_event.data;

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

router.post("/meeting_reminder", async (req, res, next) => {
  console.log("Meeting reminder");
});

export default router;
