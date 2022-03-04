const passport = require("passport")
const LocalStrategy= require("passport-local").Strategy
const pool = require("../database")
const helpers = require("../lib/helpers")
const moment = require('moment');

passport.use("local.signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async(req, username,password, done)=>{
    const user = await pool.query("SELECT * FROM tblusuarios WHERE Email = ? AND Activa = 'SI' ",[username])
    if (user.length > 0) {
        const pass = await helpers.login(password, user[0].Contrasena)
        if (pass) {
            await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `Fecha`) VALUES (?, '0', current_timestamp())",[user[0].IdUsuario])
            let fecha=new Date()
            let mes=fecha.getMonth()+1
            let dia=fecha.getDate()
            if (mes < 10) {
                mes="0"+mes
            }
            if (dia < 10) {
                dia="0"+dia
            }
            fecha=fecha.getFullYear()+"-"+mes+"-"+dia
            async function   agregar(fecha) {
                await pool.query("INSERT INTO `tblcalenayu1` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu2` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu3` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu4` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu5` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu6` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu7` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu8` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu9` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalenayu10` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
               
                await pool.query("INSERT INTO `tblcalentec1` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec2` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec3` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec4` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec5` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec6` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec7` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec8` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec9` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                await pool.query("INSERT INTO `tblcalentec10` (`FechaDia`, `Hora1`, `Hora2`, `Hora3`, `Hora4`, `Hora5`, `Hora6`, `Hora7`, `Hora8`, `Hora9`, `Hora10`, `Hora11`, `Hora12`, `Hora13`, `Hora14`, `Hora15`, `Hora16`, `Hora17`, `Hora18`, `Hora19`, `Hora20`, `Hora21`, `Hora22`, `Hora23`) VALUES (?, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0')",[fecha])
                
            }
            let dia1 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia1.length<1) {
               
              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia2 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia2.length<1) {

              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia3 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia3.length<1) {

              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia4 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia4.length<1) {

              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia5 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia5.length<1) {

              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia6 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia6.length<1) {

              agregar(fecha)
            }
            fecha = moment(fecha).add(1,'d')
            fecha= moment(fecha).format("yyyy-MM-DD");
            let dia7 = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia ='"+fecha+"'")
            if (dia7.length<1) {

              agregar(fecha)
            }
            done(null, user[0])
        }else{
            done(null, false)
        }
    } else{
        done(null, false )
    }
}))





passport.use("local.signup", new LocalStrategy({
    usernameField: "nombre",
    passwordField: "password",
    passReqToCallback: true

}, async(req, username, password, done)=>{
    const {email} = req.body
     const user = {
        Nombre:username,
        Contrasena:password,
        Email: email
    }
    
    user.Contrasena = await helpers.regi(password)
    const result = await pool.query("INSERT INTO tblusuarios SET ?", [user])
    user.IdUsuario= result.insertId
    return done(null, user)

}))



passport.serializeUser((user,done)=>{

    done(null, user.IdUsuario)
})

passport.deserializeUser(async (id, done) =>{
    const rows = await pool.query("SELECT * FROM tblusuarios WHERE IdUsuario = ?", [id])
    done(null,rows[0])
})