require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const go = require('./crud');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: 'teamdesignhub16@gmail.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and eaZZZy to do anywhere, even with Node.js</strong>'
// };
// sgMail.send(msg);

// const {
// 	activeUsername,
// 	commentText,
// 	projectId,
// 	invitedUserId,
// 	activeUserId,
// 	mainImgUrl,
// 	commentsId,
// 	activeUserAvatar
// } = req.body;

exports.comment = (
	activeUserAvatar, 
	activeUsername, 
	commentText, 
	mainImgUrl, 
	invitedUserId,
	timeStamp
	) => {
	const [contactInfo] = await go.getById('users', invitedUserId);
	const msg = {
		to: contactInfo.email,
		from: 'no-reply@DesignHubX.com',
		subject: `${activeUsername} left a comment for you on DesignHubX.com`,
		text: `${activeUsername}: ${commentText} \n ${moment(timeStamp)}`,
		html: `
		<div>
			<p>
				<img src="${activeUserAvatar}"/>
				<strong>${activeUsername}:</strong>${commentText}</p>
				<p>${moment(timeStamp)}</p>
				<img src="${mainImgUrl}"/>
		</div>
		`
	};
  console.log('goSend.comment() msg', msg);
  // sgMail.send(msg);
};
