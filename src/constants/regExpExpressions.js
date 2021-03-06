export const regExpExpressions = {
  NAME: '^[a-zA-Z\\s]+$',
  PASSWORD: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$',
  EMAIL: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
  TEL: '^\\(?[\\d]{3}\\)?[\\s-]?[\\d]{3}[\\s-]?[\\d]{4}$',
  TIME: '^([0-9]{2})\\:([0-9]{2})$'
};
