import nodemailer from "nodemailer"


export const emailService = {
   async sendEmail (email: string, subject: string, text: string){
       let transport = nodemailer.createTransport({
           service: "gmail",
           auth: {
               user: "apitestblogger@gmail.com", // generated ethereal user
               pass: "lfommghhiouvpevu", // generated ethereal password
           },
       });

       await transport.sendMail({
           from: '"Artur" <apitestblogger@gmail.com>', // sender address
           to: email, // list of receivers
           subject: subject, // Subject line
           text: text,
       });
       return
   },

}