import express from "express";
import nodemailer from "nodemailer";
import Hasura from "../../clients/hasura";
import {
  GET_MEETING_PARTICIPANTS,
  GET_MEETING_PARTICIPANTS_REMINDER_QUERY,
} from "./queries";
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
        meeting_id: meeting.id,
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
  console.log(event_data);

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
  const { meeting_id } = req.body.payload;

  console.log("Meeting reminder: meeting_id: ", meeting_id);

  const { meetings_by_pk } = await Hasura.request(
    GET_MEETING_PARTICIPANTS_REMINDER_QUERY,
    {
      id: meeting_id,
    }
  );

  const title = meetings_by_pk.title;
  const { email } = meetings_by_pk.user;
  const participants = meetings_by_pk.participants.map(
    ({ user }) => user.email
  );
  participants.push(email);

  const mailOptions = {
    from: "myhasurabackend@gmail.com",
    to: participants.toString(),
    subject: `meeting named '${title}' starting soon`,
    text: `meeting named '${title}' is going to start two minutes later. Click to the link below to join`,
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
