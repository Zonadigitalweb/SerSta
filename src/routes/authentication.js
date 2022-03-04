const express = require("express")
const router = express.Router()
const passport = require("passport")
const pool = require("../database")
const {isLoggedIn} = require("../lib/auth")
/*
router.get("/servistar/registro",  (req,res) =>{
    res.render("auth/registro",{layout:"mainpdf"})
})

router.post("/registro",  passport.authenticate("local.signup",{
        successRedirect: "/servistar/servicios_pendientes",
        failureRedirect: "/servistar/registro"
    
}))
*/


router.get("/servistar/iniciar_sesion", (req,res) =>{
    res.render("auth/inicio",{layout:"mainpdf"})
})


router.post("/iniciar_sesion", passport.authenticate("local.signin",{
    successRedirect: "/",
    failureRedirect: "/servistar/iniciar_sesion"

}))


router.get("/servistar/salir", isLoggedIn, async (req,res) =>{
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `Fecha`) VALUES (?, '1',current_timestamp())",[id])
    req.logOut()
    res.redirect("/servistar/iniciar_sesion")
})

module.exports= router