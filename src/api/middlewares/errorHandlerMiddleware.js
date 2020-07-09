export default (err, req, res, next) => {
  const { status = 500, message = '', parent = undefined } = err;
  if (parent) res.status(status).json({ error: true, status, message: parent.sqlMessage });
  else res.status(status).json({ error: true, status, message });
  next(err);
};
