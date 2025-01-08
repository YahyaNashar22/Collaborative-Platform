import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);


export const sendSMSTwilio = () => {

    console.log(process.env.TWILIO_ACCOUNT_SID);
    client.messages.create({
        body: 'Your OTP code is 123456',
        to: '+96176187092',
        from: '+96176153425'
    })
        .then((message) => console.log(`Message sent with SID: ${message.sid}`))
        .catch((error) => { console.error(`Error sending message: ${error}`); throw new Error(error); });
}