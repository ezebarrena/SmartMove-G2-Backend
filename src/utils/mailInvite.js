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


  const sendVisitInvitationEmail = async (contactEmail) => {

    const event = {
      start: [2024, 9, 30, 6, 30],
      duration: { hours: 6, minutes: 30 },
      title: 'Visita Guiada',
      method:'REQUEST',

      description: 'Annual 10-kilometer run in Boulder, Colorado',
      location: 'Folsom Field, University of Colorado (finish line)',
      geo: { lat: 40.0095, lon: 105.2669 },
      categories: ['10k races', 'Memorial Day Weekend', 'Boulder CO'],
      
      organizer: { name: 'Admin', email: 'smartmovelogistic2@gmail.com' },
      attendees: [
        { email: 'ezebarrena@gmail.com', rsvp: true, role: 'REQ-PARTICIPANT' },
       
      ]
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
        subject: `Prueba envio evento visita`,
        text: "Prueba",
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