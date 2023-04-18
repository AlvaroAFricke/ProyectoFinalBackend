export const isAuthenticated = (req, res, next) => {
  // Passport añade el método isAuthenticated() a la solicitud (req) que verifica si el usuario está autenticado

  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }
  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión o mostrar un mensaje de error
  res.redirect('/login');
};
