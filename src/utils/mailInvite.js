const nodemailer = require('nodemailer');
require('dotenv').config();
const { writeFileSync } = require('fs')
const ics = require('ics')

const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    service:process.env.SERVICE,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });


  const sendVisitInvitationEmail = async (contactEmail, visitDate, assetData) => {

    //DATOS DEL INMUEBLE
    const address = assetData.address
    const location = assetData.district

    //DATOS DE LA VISITA
    const year = visitDate.getFullYear();
    const month = visitDate.getMonth() + 1; // Los meses empiezan desde 0, por eso sumamos 1
    const day = visitDate.getDate()
    const hour = visitDate.getHours()

    const event = {
      start: [year, month, day, hour],
      duration: { hours: 1},
      title: 'Visita Guiada',
      method:'REQUEST',

      description: `Visita al inmbuebe ubicado en ${address}`,
      location: `${address}, ${location}`,
      
      
      
      organizer: { name: 'SmartMove', email: 'smartmovelogistic2@gmail.com' },
      attendees: { email: contactEmail, rsvp: true, role: 'REQ-PARTICIPANT' },
      
    }

    ics.createEvent(event, (error, value) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(value)
      writeFileSync(`${__dirname}/event.ics`, value)
    })

    try{  
    await transporter.sendMail({
        
        from: process.env.USER,
        to: contactEmail, 
        subject: `Invitacion a la visita `,
        text: `Se le envia la invitacion para la visita a ${ address }`,
        attachments: {
          filename:'event.ics',
          path: `${__dirname}/event.ics`
        }

      })
    } catch (error) {
      console.log(error);
    }
  }
  
  module.exports = sendVisitInvitationEmail;