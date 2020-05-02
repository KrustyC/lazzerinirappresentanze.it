// const nodemailer = require("nodemailer")
const mailjet = require("node-mailjet").connect(
  "c969391dbdc877ab18ed2e3ccaab9aa8",
  "217106b7700cbc115e2a65e9c8b9a92c"
)

function createCompanyEmailHtml({ name, email, content }) {
  return `
    <div>
      <h1>Nuova richiesta di contatto da parte di ${name}</h1>

      <br />

      <div>
        <div>
          <b>Nome:</b> ${name}
        </div>
        <div>
          <b>Email:</b> ${email}
        </div>

        <div>
          <b>Contenuto:</b>
          <p>
            ${content}
          </p>
        </div>
      </div>
    </div>
  `
}

function createCustomerEmailHtml({ name, email, content }) {
  return `
    <div>
      <h1>La tua richiesta e' stata inviata in </h1>
      <p>Di seguito e' riportato il contenuto della richiesta:</p>
      <br />
      <div>
        ${createCompanyEmailHtml({ name, email, content })}
      </div>
    </div>
  `
}

exports.handler = function (event, context, callback) {
  const { payload } = JSON.parse(event.body)
  const { name, email, message: content } = payload.data

  const companyMessage = {
    From: {
      Email: "noreply@lazzerinirappresentanze.com",
      Name: "No Reply",
    },
    To: [
      {
        Email: "davide.crestini94@gmail.com",
        Name: "Lazzerini Rappresentanze",
      },
    ],
    Subject: `Nuova richiesta di contatto (${name})`,
    TextPart: content,
    HTMLPart: createCompanyEmailHtml({ name, email, content }),
    CustomID: "emailCompany",
  }

  const customerMessage = {
    From: {
      Email: "noreply@lazzerinirappresentanze.com",
      Name: "No Reply",
    },
    To: [
      {
        Email: "davide.crestini94@gmail.com",
        Name: "Davide",
      },
    ],
    Subject: "La tua richiesta di contatto",
    TextPart: content,
    HTMLPart: createCustomerEmailHtml({ name, email, content }),
    CustomID: "emailCustomer",
  }

  mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [companyMessage, customerMessage],
    })
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: "Emails sent!",
      })
    })
    .catch(error => {
      callback(error, {
        statusCode: 500,
      })
    })
}
