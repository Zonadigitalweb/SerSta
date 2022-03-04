const { calendarFormat } = require("moment")

module.exports = {

    isLoggedIn(req,res,next){
        if (req.isAuthenticated()) {
            return next()
        }
        return res.redirect("/servistar/iniciar_sesion")
    },

    isAdmin(req,res,next){
        if (req.user.IdUsuario==15 || req.user.IdUsuario==18) {
            return next()
        }
        return res.redirect("/servistar/servicios_pendientes")
    },

    isTec(req,res,next){
        if (req.user.IdUsuario==15 || req.user.IdUsuario==10) {
            return next()
        }
        return res.redirect("/servistar/servicios_pendientes")
    }

}