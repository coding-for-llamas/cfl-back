import sgMail from '@sendgrid/mail';
import Debug from 'debug';

const debug = Debug('cfl-back:InquiryController');

class InquiryController {
  sgMail: any;

  constructor() {
    this.sgMail = sgMail;
  }

  sendGridEmail(bodyhtml: any, toemail: any, subjectline: any, res: any): void {
    this.sgMail.setApiKey(process.env.SENDGRID_API_KEY || /* istanbul ignore next */'');
    const msg = {
      to: toemail,
      from: 'user-service@codingforllamas.com',
      subject: subjectline,
      text: bodyhtml,
      html: bodyhtml,
    };
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'test') sgMail.send(msg);
    return res.status(200).json({ message: 'email sent' });
  }

  handleInquiry(req: any, res: any): void { // eslint-disable-line class-methods-use-this
    debug(req.body);
    return this.sendGridEmail(JSON.stringify(req.body), 'codingforllamas@gmail.com', 'inquiry', res);
  }
}
export default InquiryController;