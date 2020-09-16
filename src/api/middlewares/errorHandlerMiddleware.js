// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  console.log(err);
  const { status = 500, message = '', parent = undefined, controller = '' } = err;
  if (parent) res.status(status).json({ error: true, status, message: parent.sqlMessage, controller });
  else res.status(status).json({ error: true, status, message, controller });
};
