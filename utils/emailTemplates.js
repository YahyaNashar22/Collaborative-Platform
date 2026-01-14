import chalk from "chalk";
import transporter from "./nodemailerTransporter.js";

export const otpTemplate = (receiverEmail, otp) => {
  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Takatuf Platform</title>
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
          <p style="font-weight: bold">Takatuf Platform</p>
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
      subject: "Takatuf Platform OTP", // Subject line
      html: htmlBody, // HTML body
    },
    (error, info) => {
      if (error) {
        console.log(chalk.bold.red("Error sending email:"));
        console.error(error);
      } else {
        console.log(chalk.bold.green("Email sent successfully:"));
        console.log(chalk.bold.yellow(info.response));
      }
    }
  );
};

export const filesRequestedTemplate = ({
  client,
  provider,
  projectName,
  title,
  description,
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Files Requested</title>
  </head>
  <body style="background-color: black; color: white; font-family: sans-serif;">
    <table style="width: 100%; border-collapse: collapse; color: white; font-size: 1rem; padding: 10px 20px;">
      <tr>
        <td style="padding: 10px 20px;">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Project Information</h3>
          <p><strong>Project ID:</strong> ${projectName}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Client</h3>
          <p><strong>Name:</strong> ${client.name}</p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Provider</h3>
          <p><strong>Name:</strong> ${provider.name}</p>
          <p><strong>Email:</strong> ${provider.email}</p>
          <p><strong>Phone:</strong> ${provider.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <p>Best wishes,</p>
          <p style="font-weight: bold;">Takatuf Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const sendFilesRequestedEmail = async ({
  receiverEmail,
  client,
  provider,
  projectId,
  title,
  description,
}) => {
  const html = filesRequestedTemplate({
    client,
    provider,
    projectId,
    title,
    description,
  });

  transporter.sendMail(
    {
      from: process.env.SENDER_EMAIL,
      to: receiverEmail,
      subject: "File Request – Takatuf Platform",
      html,
    },
    (error, info) => {
      if (error) {
        console.log(chalk.red("❌ Error sending file request email:"));
        console.error(error);
      } else {
        console.log(chalk.green("📧 File request email sent:"));
        console.log(chalk.yellow(info.response));
      }
    }
  );
};

export const sendTicketTemplate = ({
  client,
  provider,
  projectName,
  title,
  description
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ticket Request</title>
  </head>
  <body style="background-color: black; color: white; font-family: sans-serif;">
    <table style="width: 100%; border-collapse: collapse; font-size: 1rem; padding: 10px 20px;">
      <tr>
        <td style="padding: 10px 20px;">
          <h2>📂 Ticket Request</h2>
          <p>You have a new ticket request regarding project <strong>${projectName}</strong>.</p>

          <!-- New fields -->
          <p><strong>Ticket Title:</strong> ${title}</p>
          <p><strong>Description:</strong> ${description}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Client Info</h3>
          <p><strong>Name:</strong> ${client.firstName} ${client.lastName} </p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Provider Info</h3>
          <p><strong>Name:</strong> ${provider.firstName} ${provider.lastName}</p>
          <p><strong>Email:</strong> ${provider.email}</p>
          <p><strong>Phone:</strong> ${provider.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <p>Looking forward to your presence!</p>
          <p style="font-weight: bold;">Takatuf Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const requestMeetingTemplate = ({
  client,
  provider,
  projectName,
  meetingTime,
  meetingLink,
  meetingTitle,
  meetingDescription
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meeting Request</title>
  </head>
  <body style="background-color: black; color: white; font-family: sans-serif;">
    <table style="width: 100%; border-collapse: collapse; font-size: 1rem; padding: 10px 20px;">
      <tr>
        <td style="padding: 10px 20px;">
          <h2>📅 Meeting Request</h2>
          <p>You have a new meeting request regarding project <strong>${projectName}</strong>.</p>

          <!-- New fields -->
          <p><strong>Meeting Title:</strong> ${meetingTitle}</p>
          <p><strong>Description:</strong> ${meetingDescription}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <p><strong>Meeting Time:</strong> ${new Date(meetingTime).toLocaleString()}</p>
          <p><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #4FC3F7;">${meetingLink}</a></p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Client Info</h3>
          <p><strong>Name:</strong> ${client.firstName} ${client.lastName} </p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Provider Info</h3>
          <p><strong>Name:</strong> ${provider.firstName} ${provider.lastName}</p>
          <p><strong>Email:</strong> ${provider.email}</p>
          <p><strong>Phone:</strong> ${provider.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <p>Looking forward to your presence!</p>
          <p style="font-weight: bold;">Takatuf Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const markStageCompletedTemplate = ({
  currentUser,
  client,
  provider,
  projectName,
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meeting Request</title>
  </head>
  <body style="background-color: black; color: white; font-family: sans-serif;">
    <table style="width: 100%; border-collapse: collapse; font-size: 1rem; padding: 10px 20px;">
      <tr>
        <td style="padding: 10px 20px;">
          <h2>🟢 Project Update</h2>
          <p>You have a new update regarding project <strong>${projectName}</strong>.</p>

          <!-- New fields -->
          <p>${currentUser.firstName} ${currentUser.lastName} marked a stage as completed</p>
          <p>Please review the action on the project page and confirm it</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Client Info</h3>
          <p><strong>Name:</strong> ${client.firstName} ${client.lastName} </p>
          <p><strong>Email:</strong> ${client.email}</p>
          <p><strong>Phone:</strong> ${client.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Provider Info</h3>
          <p><strong>Name:</strong> ${provider.firstName} ${provider.lastName}</p>
          <p><strong>Email:</strong> ${provider.email}</p>
          <p><strong>Phone:</strong> ${provider.phone}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <p>Looking forward to your presence!</p>
          <p style="font-weight: bold;">Takatuf Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;


export const getInTouchTemplate = ({
  firstName, lastName, email, phoneNumber, title, description
}) => {

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Get In Touch Request</title>
  </head>
  <body style="background-color: black; color: white; font-family: sans-serif;">
    <table style="width: 100%; border-collapse: collapse; font-size: 1rem; padding: 10px 20px;">
      <tr>
        <td style="padding: 10px 20px;">
          <h2>${title}</h2>

          <p>${description}</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 10px 20px;">
          <h3>Sender Info</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName} </p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phoneNumber}</p>
        </td>
      </tr>
      
      <tr>
        <td style="padding: 10px 20px;">
          <p>Looking forward to your presence!</p>
          <p style="font-weight: bold;">Takatuf Platform</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  transporter.sendMail(
    {
      from: process.env.SENDER_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "📞 Get In Touch Request",
      html: htmlBody,
    },
    (error, info) => {
      if (error) {
        throw new Error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    }
  );
}


export const emailTemplate = (receiverEmail, title, description) => {
  const htmlBody = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>
    <body style="background-color: #f8f8f8; color: #333; font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <table style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <tr>
          <td style="text-align: center; padding-bottom: 20px; font-size: 24px; font-weight: bold; color: #6b21a8;">
            ${title}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-size: 16px; line-height: 1.5;">
            Hello ${receiverEmail},
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-size: 16px; line-height: 1.5;">
            ${description}
          </td>
        </tr>
        
     
        <tr>
          <td style="padding-top: 20px; font-size: 14px; color: #888888; border-top: 1px solid #eee; text-align: center;">
            &copy; ${new Date().getFullYear()} Takatuf
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  transporter.sendMail(
    {
      from: process.env.SENDER_EMAIL,
      to: receiverEmail,
      subject: title,
      html: htmlBody,
    },
    (error, info) => {
      if (error) {
        throw new Error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    }
  );
};

// TODO: Add reminder template -- should have project id or request id, reminder message.
