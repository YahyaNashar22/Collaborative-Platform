import chalk from "chalk";
import transporter from "./nodemailerTransporter.js";

export const otpTemplate = (receiverEmail, otp) => {

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Collaborative Platform</title>
  </head>
  <body style="background-color: black; color: white">
    <table
      style="
        width: 100%;
        border-collapse: collapse;
        color: white;
        font-size: 1.4rem;
        background-color: black;
        padding: 10px 20px;
      "
    >
      <tr>
        <td style="text-align: start; padding: 10px 20px">
          <p>Hello ${receiverEmail},</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: start; padding: 10px 20px">
          <p>
            Your one-time verification code is:
            <span style="letter-spacing: 6px; font-weight: bold">${otp}</span>
          </p>
        </td>
      </tr>
       <tr>
        <td style="text-align: start; padding: 10px 20px">
          <p>
            This code will expire in 5 minutes
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 20px">
          <p>Best wishes,</p>
          <p style="font-weight: bold">Collaborative Platform CCC</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

    transporter.sendMail(
        {
            from: process.env.SENDER_EMAIL,
            to: receiverEmail, // Recipient's email address
            subject: "Collaborative Platform OTP", // Subject line
            html: htmlBody, // HTML body
        }
        , (error, info) => {
            if (error) {
                console.log(chalk.bold.red("Error sending email:"));
                console.error(error);
            } else {
                console.log(chalk.bold.green("Email sent successfully:"));
                console.log(chalk.bold.yellow(info.response));
            }
        });
}


// TODO: Add files requested template
// TODO: Add files uploaded template
// TODO: Add reminder template
// TODO: Add Ticket template
