export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  res.redirect('/login');
};
