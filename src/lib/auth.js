
module.exports = {
    
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/profile');
},
    ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.rol =='admin') {
      return next(); // Si el usuario está autenticado y es un administrador, permite el acceso a la siguiente ruta
    }
    return res.redirect('/profile'); // Si el usuario no es un administrador, redirige o muestra un mensaje de error
  }

};