export default (err, req, res, next) => {
  const { status = 500, message = '', parent = undefined, controller = '' } = err;
  if (parent) res.status(status).json({ error: true, status, message: parent.sqlMessage, controller });
  else res.status(status).json({ error: true, status, message, controller });
  next(err);
};
