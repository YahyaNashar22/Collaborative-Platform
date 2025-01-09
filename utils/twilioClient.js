import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// TODO: Add the correct twilio credentials

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);


export const sendPhoneOtp = async (phone, phoneOtp) => {

    await client.messages.create({
        body: `Your OTP code is ${phoneOtp}`,
        to: phone,
        messagingServiceSid: messagingServiceSid,
        // from: '+96176153425'
    })
        .then((message) => console.log(`Message sent with SID: ${message.sid}\nMessage: ${{ message }}`))
        .catch((error) => { console.error(`Error sending message: ${error}`); });
}
