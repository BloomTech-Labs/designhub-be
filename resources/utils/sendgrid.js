require('dotenv').config();
const moment = require('moment');
const sgMail = require('@sendgrid/mail');
const go = require('./crud');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.comment = async (
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
    from: 'notifications@DesignHubX.com',
    subject: `${activeUsername} left a comment for you on DesignHubX.com`,
    text: `${activeUsername}: ${commentText} \n ${moment(timeStamp)}`,
    html: `<section style="display:flex; align-items:center; justify-content:center; text-align:center; justify-items:center; vertical-align:center;">
			<img alt="${activeUsername} avatar" src="${activeUserAvatar}" style="display:block; border-radius:50%; width:65px; height:65px;"/>
			<div><strong style="color:#5557FE;"> ${activeUsername} Commented: </strong>${commentText}</div>
			<img alt="project image" src="${mainImgUrl}" style="display:block; width:161px; height:105px;  object-fit:cover;"/>
		</section>`
  };
  sgMail.send(msg);
};

exports.follow = async (activeUserAvatar, activeUsername, invitedUserId) => {
  const [contactInfo] = await go.getById('users', invitedUserId);
  const msg = {
    to: contactInfo.email,
    from: 'notifications@DesignHubX.com',
    subject: `${activeUsername} started following you on DesignHubX.com`,
    text: `${activeUsername} started following you on DesignHubX.com`,
    html: `<section style="display:flex; align-items:center; justify-content:center; text-align:center; justify-items:center; vertical-align:center;">
			<img alt="${activeUsername} avatar" src="${activeUserAvatar}" style="display:block; border-radius:50%; width:65px; height:65px;"/>
				<strong style="color:#5557FE;"> ${activeUsername} </strong> started following you on DesignHubX.com
		</section>`
  };
  sgMail.send(msg);
};

exports.invite = async (
  activeUserAvatar,
  activeUsername,
  email,
  projectTitle
) => {
  const msg = {
    to: email,
    from: 'notifications@DesignHubX.com',
    subject: `${activeUsername} has invited you to their project on DesignhubX.com`,
    text: `${activeUsername} has invited you to their project on DesignhubX.com`,
    html: `<section style="display:flex; align-items:center; justify-content:center; text-align:center; justify-items:center; vertical-align:center;">
			<img alt="${activeUsername} avatar" src="${activeUserAvatar}" style="display:block; border-radius:50%; width:65px; height:65px;"/>
        <strong style="color:#5557FE;"> ${activeUsername} </strong> has invited you to work on ${projectTitle} on <a href='https://www.designhubx.com/'>DesignhubX.com</a>
		</section>`
  };
  sgMail.send(msg);
};
