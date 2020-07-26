const baseServerURL = 'http://localhost:3001';

export const activateAccountTemplate = token => (
  `<p style="
                      background-color: #008CBA;
                      border: none;
                      padding: 15px 32px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      font-size: 16px;
                      border-radius: 4px;">
      <a 
      style="color: white" 
      href=${baseServerURL}/api/auth/activate/${token}>Follow this link to activate your account</a>
   </p>`);

export const forgotPasswordTemplate = token => (
  `<p style="
                      background-color: #008CBA;
                      border: none;
                      padding: 15px 32px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      font-size: 16px;
                      border-radius: 4px;">
      <a 
      style="color: white" 
      href=${baseServerURL}/api/auth/password/change/${token}>Follow this link to change your password</a>
   </p>`);
