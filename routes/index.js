var express = require('express');
var router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');


router.get('/', function(req, res, next) {
  res.render('index');
});


router.get('/about-us', function(req, res, next) {
  res.render('about-us');
});

router.get('/admission', function(req, res, next) {
  res.render('admission');
});

router.get('/our-course', function(req, res, next) {
  res.render('our-course');
});

router.get('/facilities', function(req, res, next) {
  res.render('facilities');
});

router.get('/faculty', function(req, res, next) {
  res.render('faculty');
});

router.get('/contact-us', function(req, res, next) {
  res.render('contact-us',);
});

router.get('/chat-bot', function(req, res, next) {
  res.render('chat-bot');
});

router.get('/admission-form', function(req, res, next) {
  res.render('admission-form');
});

router.get('/online-grievance',function(req,res,next){
  res.render('online-grievance');
});

router.get('/anti-ragging-committe',function(req,res,next){
  res.render('anti-ragging-committe');
});


router.post('/send-mail', multer().fields([{ name: 'profileImage', maxCount: 1 }, { name: 'signImage', maxCount: 1 }]), async function(req, res, next) {

  const currentDate = new Date();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to get the current month
  const day = String(currentDate.getDate()).padStart(2, '0');
  const time = currentDate.toLocaleTimeString('en-US', { hour12: false }).replace(/:/g, '');
  
  const concatenatedInteger = parseInt(month + day + time);

  const recipientEmail = req.body.recipientEmail;
  const name = req.body.name;
  const age = req.body.age;
  const dob = req.body.dob;
  const religion = req.body.religion;
  const caste = req.body.caste;
  const sc_st_oec = req.body.sc_st_oec;
  const father_name = req.body.father_name;
  const address = req.body.address;
  const phone_no = req.body.phone_no;
  const graduation = req.body.graduation;
  const educational_qualification = req.body.educational_qualification;
  const sslc_i_name = req.body.sslc_i_name;
  const sslc_u_name = req.body.sslc_u_name;
  const sslc_mark = req.body.sslc_mark;
  const plus_two_i_name = req.body.plus_two_i_name;
  const plus_two_u_name = req.body.plus_two_u_name;
  const plus_two_mark = req.body.plus_two_mark;
  const degree_i_name = req.body.degree_i_name;
  const degree_u_name = req.body.degree_u_name;
  const degree_mark = req.body.degree_mark;
  const kmat_score = req.body.kmat_score;
  const kmat_date = req.body.kmat_date;
  const admission_date = req.body.admission_date;

  const profileImage = req.files['profileImage'][0];
  const signImage = req.files['signImage'][0];

  const base64profileImage = profileImage.buffer.toString('base64');
  const base64signImage = signImage.buffer.toString('base64');

  const imageSrc1 = `data:${profileImage.mimetype};base64,${base64profileImage}`;
  const imageSrc2 = `data:${signImage.mimetype};base64,${base64signImage}`;
  const imagePath = 'public/images/imtpunnapra-logo.png';
  // Create a PDF document
  const doc = new PDFDocument({size:'A4'});

  const logoWidth = 200; // Width of the logo image
  const logoHeight = 100; // Height of the logo image
  
  const pageWidth = doc.page.width; // Width of the page
  
  // Calculate the starting X position for centering the logo
  const startX = (pageWidth - logoWidth) / 2;
  
  // Place the logo image at the top center of the page
  doc.image(imagePath, startX, 20, { width: logoWidth, height: logoHeight });
  
  // Write the image to the 
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.image(imageSrc1, { width: 100,height:100 });
  doc.moveDown();

// Define a fixed-width font for alignment
doc.font('Courier');

doc.fontSize(16)
   .text('Application ID             : ' + 'IMT'+concatenatedInteger)
   .moveDown()
   .text('Name                       : ' + name)
   .moveDown()
   .text('Age                        : ' + age)
   .moveDown()
   .text('Date of Birth              : ' + dob)
   .moveDown()
   .text('Religion                   : ' + religion)
   .moveDown()
   .text('Caste                      : ' + caste)
   .moveDown()
   .text('SC/ST/OEC                  : ' + sc_st_oec)
   .moveDown()
   .text('Father\'s Name             : ' + father_name)
   .moveDown()
   .text('Address                    : ' + address)
   .moveDown()
   .text('Phone Number               : ' + phone_no)
   .moveDown()
   .text('Email                      : ' + recipientEmail)
   .moveDown()
   .text('Graduation                 : ' + graduation)
   .moveDown()
   .text('Educational Qualification  : ' + educational_qualification)
   .moveDown()
   .text('SSLC Institution Name      : ' + sslc_i_name)
   .moveDown()
   .text('SSLC University Name       : ' + sslc_u_name)
   .moveDown()
   .text('SSLC Mark                  : ' + sslc_mark)
   .moveDown()
   .text('Plus Two Institution Name  : ' + plus_two_i_name)
   .moveDown()
   .text('Plus Two University Name   : ' + plus_two_u_name)
   .moveDown()
   .text('Plus Two Mark              : ' + plus_two_mark)
   .moveDown()
   .text('Degree Institution Name    : ' + degree_i_name)
   .moveDown()
   .text('Degree University Name     : ' + degree_u_name)
   .moveDown()
   .text('Degree Mark                : ' + degree_mark)
   .moveDown()
   .text('KMAT Score                 : ' + kmat_score)
   .moveDown()
   .text('KMAT Date                  : ' + kmat_date)
   .moveDown()
   .text('Admission Date             : ' + admission_date)
   .moveDown()
   .text('Consented : I here by declared that all the information submitted by me in the application form is correct, true and valid')
  doc.moveDown();
  doc.image(imageSrc2, { width: 100, height:50 });

  // Generate the PDF buffer
  const pdfBuffer = [];
  doc.on('data', (chunk) => {
    pdfBuffer.push(chunk);
  });
  doc.on('end', () => {
    const pdfData = Buffer.concat(pdfBuffer);

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail, Outlook, etc.
      auth: {
        user: 'ajithd78564@gmail.com',
        pass: 'nheredjgynxgiblk'
      }
    });

    // Define email options
    const mailOptions = {
      from: recipientEmail,
      to: [recipientEmail,'imtdirector@gmail.com'],
      subject: 'IMT Punnapra Application',
      attachments: [
        {
          filename: 'document.pdf',
          content: pdfData
        }
      ]
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log(error);
        res.send(`
          <script>
            alert('Something Wrong!');
            window.history.back();
          </script>`
        );
        res.redirect('/admission-form');
      } else {
        // console.log('Email sent: ' + info.response);
        res.send(`
          <script>
            alert('Successfully Submitted');
            window.history.back();
          </script>`
        );
        res.redirect('/admission-form');
      }
    });
  });

  // Stream the PDF to a file (optional)
  doc.end();
});

router.post('/contact-mail',multer().single('image'),(req, res, next)=> {
    const recipientEmail = req.body.recipientEmail;
    const subject = req.body.subject;
    const name = req.body.name;
    const phone = req.body.phone;
    const contact_message = req.body.contact_message;

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail, Outlook, etc.
      auth: {
        user: 'ajithd78564@gmail.com',
        pass: 'nheredjgynxgiblk'
      }
    });

    // Define email options
    const mailOptions = {
      from: 'ajithd78564@gmail.com',
      to: ['ajithd78564@gmail.com'],
      subject: subject,
      html: `<h1>Name : ${name}</h1><br><p>Message: ${contact_message}</p><br>Email : ${recipientEmail}<br>Phone : ${phone}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // console.log(error);
        res.send(`
          <script>
            alert('Something Wrong!');
            window.history.back();
          </script>`
        );
        res.redirect('/contact-us');
      } else {
        // console.log('Email sent: ' + info.response);
        res.send(`
          <script>
            alert('Successfully Submitted');
            window.history.back();
          </script>`
        );
        res.redirect('/contact-us');
      }
  });
});

router.post('/grievance-mail', multer().single('image'),(req, res, next) => {
  const recipientEmail = req.body.recipientEmail;
  const category = req.body.category;
  const subject = req.body.subject;
  const name = req.body.name; // Updated key name
  const phone = req.body.phone; // Updated key name
  const grievance = req.body.grievance;

  console.log(recipientEmail, subject, name, phone, grievance, category);

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail, Outlook, etc.
    auth: {
      user: 'ajithd78564@gmail.com',
      pass: 'nheredjgynxgiblk'
    }
  });

  const mailOptions = {
    from: 'ajithd78564@gmail.com',
    to: 'ajithd78564@gmail.com',
    subject:'Grievance',
    html: `<h1>Name : ${name}</h1><br><p>Category : ${category}</p><br><p>Grievance : ${grievance}</p><br>Email:${recipientEmail}<br>Phone:${phone}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(`
        <script>
          alert('Something went wrong!');
          window.history.back();
        </script>`
      );
    } else {
      console.log('Email sent: ' + info.response);
      res.send(`
        <script>
          alert('Successfully submitted!');
          window.history.back();
        </script>`
      );
    }
  });
});


module.exports = router;