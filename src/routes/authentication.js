const express = require("express")
const router = express.Router()
const passport = require("passport")
const {isLoggedIn} = require("../lib/auth")

router.get("/registro",  (req,res) =>{
    res.render("auth/registro",{layout:"mainpdf"})
})

router.post("/registro",  passport.authenticate("local.signup",{
        successRedirect: "/servicios_pendientes",
        failureRedirect: "/registro"
    
}))

router.get("/iniciar_sesion", (req,res) =>{
    res.render("auth/inicio",{layout:"mainpdf"})
})


router.post("/iniciar_sesion", passport.authenticate("local.signin",{
    successRedirect: "/servicios_pendientes",
    failureRedirect: "/iniciar_sesion"

}))


router.get("/salir", (req,res) =>{
    req.logOut()
    res.redirect("iniciar_sesion")
})

module.exports= router