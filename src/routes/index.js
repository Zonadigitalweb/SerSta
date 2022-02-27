const express = require("express")
const router = express.Router()
const pool = require("../database")
const pdfc =require("../routes/pdf")
var moment = require('moment');
const {isLoggedIn, isAdmin} = require("../lib/auth");
const { ConsoleMessage } = require("puppeteer");


const log = console.log

//Principal
router.get("/", isLoggedIn,  (req, res) => { 
    res.redirect("/servistar/servicios_pendientes")  
})



//Agregar get

router.get("/servistar/agregar_registro", isLoggedIn, async (req, res)=>{
    let cliente= await pool.query("SELECT IdCliente, Nombre, DirColonia, DirCalle, DirNum from tblclientes WHERE Nombre <>' ' ORDER BY Nombre ASC")
    let num=await pool.query("SELECT max(IdCliente) as num FROM tblclientes;")
    num=num[0].num+1
    res.render("layouts/agregar_registro",{cliente, num})
})

router.get("/servistar/tecnicos_ayudantes:id", isLoggedIn, async (req, res)=>{
    let {id}=req.params
    let tec=await pool.query("SELECT * FROM `tbltecnicos` WHERE `Habilitado` = 1;")
    let ayu=await pool.query("SELECT * FROM `tblayudantes` WHERE `Habilitado` = 1;")
    res.render("layouts/tecnicos_ayudantes",{tec, ayu, id})
})

router.get("/servistar/calendario_tec", isLoggedIn, async (req, res)=>{
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

    function diaPlus(dias){
        for (let index = 0; index < dias.length; index++) {
            if (dias[index].Hora1==0) {
                dias[index].Hora1="Libre"
            }
            if (dias[index].Hora2==0) {
                dias[index].Hora2="Libre"
            }
            if (dias[index].Hora3==0) {
                dias[index].Hora3="Libre"
            }
            if (dias[index].Hora4==0) {
                dias[index].Hora4="Libre"
            }
            if (dias[index].Hora5==0) {
                dias[index].Hora5="Libre"
            }
            if (dias[index].Hora6==0) {
                dias[index].Hora6="Libre"
            }
            if (dias[index].Hora7==0) {
                dias[index].Hora7="Libre"
            }
            if (dias[index].Hora8==0) {
                dias[index].Hora8="Libre"
            }
            if (dias[index].Hora9==0) {
                dias[index].Hora9="Libre"
            }
            if (dias[index].Hora10==0) {
                dias[index].Hora10="Libre"
            }
            if (dias[index].Hora11==0) {
                dias[index].Hora11="Libre"
            }
            if (dias[index].Hora12==0) {
                dias[index].Hora12="Libre"
            }
            if (dias[index].Hora13==0) {
                dias[index].Hora13="Libre"
            }
            if (dias[index].Hora14==0) {
                dias[index].Hora14="Libre"
            }
            if (dias[index].Hora15==0) {
                dias[index].Hora15="Libre"
            }
            if (dias[index].Hora16==0) {
                dias[index].Hora16="Libre"
            }
            if (dias[index].Hora17==0) {
                dias[index].Hora17="Libre"
            }
            if (dias[index].Hora18==0) {
                dias[index].Hora18="Libre"
            }
            if (dias[index].Hora19==0) {
                dias[index].Hora19="Libre"
            }
            if (dias[index].Hora20==0) {
                dias[index].Hora20="Libre"
            }
            if (dias[index].Hora21==0) {
                dias[index].Hora21="Libre"
            }
            if (dias[index].Hora22==0) {
                dias[index].Hora22="Libre"
            }
            if (dias[index].Hora23==0) {
                dias[index].Hora23="Libre"
            }
             
             
         }
         return dias
    }

    let tecnicos = await pool.query("SELECT * FROM `tbltecnicos`")

    let di = await pool.query("SELECT * FROM `tblcalentec1` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di = diaPlus(di)

    let di2 = await pool.query("SELECT * FROM `tblcalentec2` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di2 = diaPlus(di2)

    let di3 = await pool.query("SELECT * FROM `tblcalentec3` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di3 = diaPlus(di3)
    
    let di4 = await pool.query("SELECT * FROM `tblcalentec4` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di4 = diaPlus(di4)
    
    let di5 = await pool.query("SELECT * FROM `tblcalentec5` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di5 = diaPlus(di5)

    let di6 = await pool.query("SELECT * FROM `tblcalentec6` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di6 = diaPlus(di6)

    let di7 = await pool.query("SELECT * FROM `tblcalentec7` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di7 = diaPlus(di7)

    let di8 = await pool.query("SELECT * FROM `tblcalentec8` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di8 = diaPlus(di8)

    let di9 = await pool.query("SELECT * FROM `tblcalentec9` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di9 = diaPlus(di9)

    let di10 = await pool.query("SELECT * FROM `tblcalentec10` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di10 = diaPlus(di10)

  
  
    if (tecnicos[0].Habilitado==0) {
        di=null
    }
    if (tecnicos[1].Habilitado==0) {
        di2=null
    }
    if (tecnicos[2].Habilitado==0) {
        di3=null
    }
    if (tecnicos[3].Habilitado==0) {
        di4=null
    }
    if (tecnicos[4].Habilitado==0) {
        di5=null
    }
    if (tecnicos[5].Habilitado==0) {
        di6=null
    }
    if (tecnicos[6].Habilitado==0) {
        di7=null
    }
    if (tecnicos[7].Habilitado==0) {
        di8=null
    }
    if (tecnicos[8].Habilitado==0) {
        di9=null
    }
    if (tecnicos[9].Habilitado==0) {
        di10=null
    }
    res.render("layouts/calendario_tec", {di,di2,di3,di4,di5,di6,di7,di8,di9,di10})
})
router.get("/servistar/calendario_ayu", isLoggedIn, async (req, res)=>{
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

    function diaPlus(dias){
        for (let index = 0; index < dias.length; index++) {
            if (dias[index].Hora1==0) {
                dias[index].Hora1="Libre"
            }
            if (dias[index].Hora2==0) {
                dias[index].Hora2="Libre"
            }
            if (dias[index].Hora3==0) {
                dias[index].Hora3="Libre"
            }
            if (dias[index].Hora4==0) {
                dias[index].Hora4="Libre"
            }
            if (dias[index].Hora5==0) {
                dias[index].Hora5="Libre"
            }
            if (dias[index].Hora6==0) {
                dias[index].Hora6="Libre"
            }
            if (dias[index].Hora7==0) {
                dias[index].Hora7="Libre"
            }
            if (dias[index].Hora8==0) {
                dias[index].Hora8="Libre"
            }
            if (dias[index].Hora9==0) {
                dias[index].Hora9="Libre"
            }
            if (dias[index].Hora10==0) {
                dias[index].Hora10="Libre"
            }
            if (dias[index].Hora11==0) {
                dias[index].Hora11="Libre"
            }
            if (dias[index].Hora12==0) {
                dias[index].Hora12="Libre"
            }
            if (dias[index].Hora13==0) {
                dias[index].Hora13="Libre"
            }
            if (dias[index].Hora14==0) {
                dias[index].Hora14="Libre"
            }
            if (dias[index].Hora15==0) {
                dias[index].Hora15="Libre"
            }
            if (dias[index].Hora16==0) {
                dias[index].Hora16="Libre"
            }
            if (dias[index].Hora17==0) {
                dias[index].Hora17="Libre"
            }
            if (dias[index].Hora18==0) {
                dias[index].Hora18="Libre"
            }
            if (dias[index].Hora19==0) {
                dias[index].Hora19="Libre"
            }
            if (dias[index].Hora20==0) {
                dias[index].Hora20="Libre"
            }
            if (dias[index].Hora21==0) {
                dias[index].Hora21="Libre"
            }
            if (dias[index].Hora22==0) {
                dias[index].Hora22="Libre"
            }
            if (dias[index].Hora23==0) {
                dias[index].Hora23="Libre"
            }
             
             
         }
         return dias
    }

    let ayudantes = await pool.query("SELECT * FROM `tblayudantes`")

    let di = await pool.query("SELECT * FROM `tblcalenayu1` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di = diaPlus(di)

    let di2 = await pool.query("SELECT * FROM `tblcalenayu2` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di2 = diaPlus(di2)

    let di3 = await pool.query("SELECT * FROM `tblcalenayu3` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di3 = diaPlus(di3)
    
    let di4 = await pool.query("SELECT * FROM `tblcalenayu4` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di4 = diaPlus(di4)
    
    let di5 = await pool.query("SELECT * FROM `tblcalenayu5` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di5 = diaPlus(di5)

    let di6 = await pool.query("SELECT * FROM `tblcalenayu6` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di6 = diaPlus(di6)

    let di7 = await pool.query("SELECT * FROM `tblcalenayu7` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di7 = diaPlus(di7)

    let di8 = await pool.query("SELECT * FROM `tblcalenayu8` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di8 = diaPlus(di8)

    let di9 = await pool.query("SELECT * FROM `tblcalenayu9` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di9 = diaPlus(di9)

    let di10 = await pool.query("SELECT * FROM `tblcalenayu10` WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])
    di10 = diaPlus(di10)

  
  
    if (ayudantes[0].Habilitado==0) {
        di=null
    }
    if (ayudantes[1].Habilitado==0) {
        di2=null
    }
    if (ayudantes[2].Habilitado==0) {
        di3=null
    }
    if (ayudantes[3].Habilitado==0) {
        di4=null
    }
    if (ayudantes[4].Habilitado==0) {
        di5=null
    }
    if (ayudantes[5].Habilitado==0) {
        di6=null
    }
    if (ayudantes[6].Habilitado==0) {
        di7=null
    }
    if (ayudantes[7].Habilitado==0) {
        di8=null
    }
    if (ayudantes[8].Habilitado==0) {
        di9=null
    }
    if (ayudantes[9].Habilitado==0) {
        di10=null
    }
    res.render("layouts/calendario_ayu", {di,di2,di3,di4,di5,di6,di7,di8,di9,di10})
})
router.post("/calendario_tec", isLoggedIn, async (req, res)=>{
    let abc={}

let {IdOrdenServicio,FechaDia,IdTecnico,Hora1,Hora2,Hora3,Hora4,Hora5,Hora6,Hora7,Hora8,Hora9,Hora10,Hora11,Hora12,Hora13,Hora14,Hora15,Hora16,Hora17,Hora18,Hora19,Hora20,Hora21,Hora22,Hora23} = req.body

    if (Hora1=="on") {
        Hora1=IdOrdenServicio
        abc.Hora1=Hora1
    }
    if (Hora2=="on") {
        Hora2=IdOrdenServicio
        abc.Hora2=Hora2
    }
    if (Hora3=="on") {
        Hora3=IdOrdenServicio
        abc.Hora3=Hora3
    }
    if (Hora4=="on") {
        Hora4=IdOrdenServicio
        abc.Hora4=Hora4
    }
    if (Hora5=="on") {
        Hora5=IdOrdenServicio
        abc.Hora5=Hora5
    }
    if (Hora6=="on") {
        Hora6=IdOrdenServicio
        abc.Hora6=Hora6
    }
    if (Hora7=="on") {
        Hora7=IdOrdenServicio
        abc.Hora7=Hora7
    }
    if (Hora8=="on") {
        Hora8=IdOrdenServicio
        abc.Hora8=Hora8
    }
    if (Hora9=="on") {
        Hora9=IdOrdenServicio
        abc.Hora9=Hora9
    }
    if (Hora10=="on") {
        Hora10=IdOrdenServicio
        abc.Hora10=Hora10
    }
    if (Hora11=="on") {
        Hora11=IdOrdenServicio
        abc.Hora11=Hora11
    }
    if (Hora12=="on") {
        Hora12=IdOrdenServicio
        abc.Hora12=Hora12
    }
    if (Hora13=="on") {
        Hora13=IdOrdenServicio
        abc.Hora13=Hora13
    }
    if (Hora14=="on") {
        Hora14=IdOrdenServicio
        abc.Hora14=Hora14
    }
    if (Hora15=="on") {
        Hora15=IdOrdenServicio
        abc.Hora15=Hora15
    }
    if (Hora16=="on") {
        Hora16=IdOrdenServicio
        abc.Hora16=Hora16
    }
    if (Hora17=="on") {
        Hora17=IdOrdenServicio
        abc.Hora17=Hora17
    }
    if (Hora18=="on") {
        Hora18=IdOrdenServicio
        abc.Hora18=Hora18
    }
    if (Hora19=="on") {
        Hora19=IdOrdenServicio
        abc.Hora19=Hora19
    }
    if (Hora20=="on") {
        Hora20=IdOrdenServicio
        abc.Hora20=Hora20
    }
    if (Hora21=="on") {
        Hora21=IdOrdenServicio
        abc.Hora21=Hora21
    }
    if (Hora22=="on") {
        Hora22=IdOrdenServicio
        abc.Hora22=Hora22
    }
    if (Hora23=="on") {
        Hora23=IdOrdenServicio
        abc.Hora23=Hora23
    }

    let tec= await pool.query("SELECT * FROM tbltecnicos WHERE IdTecnico = ?",[IdTecnico])
await pool.query("UPDATE "+tec[0].tbl+" SET ? WHERE FechaDia = ?",[abc,FechaDia])
let cliente = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = "+IdOrdenServicio)
    res.redirect("/servistar/ver_cliente"+cliente[0].IdCliente)
})
router.post("/calendario_ayu", isLoggedIn, async (req, res)=>{
    let abc={}

let {IdOrdenServicio,FechaDia,IdAyudante,Hora1,Hora2,Hora3,Hora4,Hora5,Hora6,Hora7,Hora8,Hora9,Hora10,Hora11,Hora12,Hora13,Hora14,Hora15,Hora16,Hora17,Hora18,Hora19,Hora20,Hora21,Hora22,Hora23} = req.body

    if (Hora1=="on") {
        Hora1=IdOrdenServicio
        abc.Hora1=Hora1
    }
    if (Hora2=="on") {
        Hora2=IdOrdenServicio
        abc.Hora2=Hora2
    }
    if (Hora3=="on") {
        Hora3=IdOrdenServicio
        abc.Hora3=Hora3
    }
    if (Hora4=="on") {
        Hora4=IdOrdenServicio
        abc.Hora4=Hora4
    }
    if (Hora5=="on") {
        Hora5=IdOrdenServicio
        abc.Hora5=Hora5
    }
    if (Hora6=="on") {
        Hora6=IdOrdenServicio
        abc.Hora6=Hora6
    }
    if (Hora7=="on") {
        Hora7=IdOrdenServicio
        abc.Hora7=Hora7
    }
    if (Hora8=="on") {
        Hora8=IdOrdenServicio
        abc.Hora8=Hora8
    }
    if (Hora9=="on") {
        Hora9=IdOrdenServicio
        abc.Hora9=Hora9
    }
    if (Hora10=="on") {
        Hora10=IdOrdenServicio
        abc.Hora10=Hora10
    }
    if (Hora11=="on") {
        Hora11=IdOrdenServicio
        abc.Hora11=Hora11
    }
    if (Hora12=="on") {
        Hora12=IdOrdenServicio
        abc.Hora12=Hora12
    }
    if (Hora13=="on") {
        Hora13=IdOrdenServicio
        abc.Hora13=Hora13
    }
    if (Hora14=="on") {
        Hora14=IdOrdenServicio
        abc.Hora14=Hora14
    }
    if (Hora15=="on") {
        Hora15=IdOrdenServicio
        abc.Hora15=Hora15
    }
    if (Hora16=="on") {
        Hora16=IdOrdenServicio
        abc.Hora16=Hora16
    }
    if (Hora17=="on") {
        Hora17=IdOrdenServicio
        abc.Hora17=Hora17
    }
    if (Hora18=="on") {
        Hora18=IdOrdenServicio
        abc.Hora18=Hora18
    }
    if (Hora19=="on") {
        Hora19=IdOrdenServicio
        abc.Hora19=Hora19
    }
    if (Hora20=="on") {
        Hora20=IdOrdenServicio
        abc.Hora20=Hora20
    }
    if (Hora21=="on") {
        Hora21=IdOrdenServicio
        abc.Hora21=Hora21
    }
    if (Hora22=="on") {
        Hora22=IdOrdenServicio
        abc.Hora22=Hora22
    }
    if (Hora23=="on") {
        Hora23=IdOrdenServicio
        abc.Hora23=Hora23
    }

    let tec= await pool.query("SELECT * FROM tblayudantes WHERE IdAyudante = ?",[IdAyudante])
await pool.query("UPDATE "+tec[0].tbl+" SET ? WHERE FechaDia = ?",[abc,FechaDia])
let cliente = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = "+IdOrdenServicio)
    res.redirect("/servistar/ver_cliente"+cliente[0].IdCliente)
})

router.get("/servistar/agregar_registro:id/", isLoggedIn, async (req, res) => {
    const { id } = req.params
    const idU = req.user
    const equipo = await pool.query("SELECT * FROM tblequipos WHERE IdCliente = ?", [id])
    let cliente= await pool.query("SELECT * from tblclientes WHERE IdCliente = ?",[id])
    let num=await pool.query("SELECT max(IdOrdenServicio) as num FROM tblordenservicio;")
    num=num[0].num+1
    let idcliente=cliente[0].IdCliente
    let nombre=cliente[0].Nombre
    let sucu=await pool.query("SELECT Sucursal FROM tblusuarios WHERE IdUsuario = ?", [idU.IdUsuario])
    sucu=sucu[0].Sucursal
    res.render("layouts/agregar_registro_completo", { equipo, cliente, nombre, num, idcliente, sucu })
})
router.get("/servistar/agregar_refaccion:id/", isLoggedIn, async (req, res) => {
    const { id } = req.params
    let ref = await pool.query("SELECT * FROM `tblrefacciones` WHERE Existencias > 0")
    let refac= await pool.query("SELECT * from tblrefacciones, tblrefaccionservicio WHERE tblrefaccionservicio.IdOrdenServicio = ? AND tblrefacciones.IdRefaccion=tblrefaccionservicio.IdRefaccion;",[id])

    
    res.render("layouts/agregar_refaccion_s", {id, ref, refac})
})
router.get("/servistar/agregar:ido/ref:idr/", isLoggedIn, async (req, res) => {
    let { ido,idr } = req.params
    let ref= await pool.query("SELECT * FROM tblrefacciones WHERE IdRefaccion ="+idr)
    let Cantidad=ref[0].Existencias-1
    await pool.query("UPDATE tblrefacciones SET Existencias = ? WHERE IdRefaccion ="+idr,[Cantidad])
    let orden = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio ="+ido)
    if(ref[0].CostoVenta==null){
        ref[0].CostoVenta=0
    }
    ref[0].CostoVenta=parseInt(ref[0].CostoVenta,10)
    if(orden[0].Presupuesto==null){
        orden[0].Presupuesto=0
    }
    orden[0].Presupuesto=parseInt(orden[0].Presupuesto,10)
    Cantidad=orden[0].Presupuesto+ref[0].CostoVenta
    Cantidad=parseInt(Cantidad,10)
    await pool.query("UPDATE tblordenservicio SET Presupuesto = ? WHERE IdOrdenServicio ="+ido,[Cantidad])
    await pool.query("INSERT INTO tblrefaccionservicio SET IdOrdenServicio = "+ido+", IdRefaccion ="+idr)
    res.redirect("/servistar/agregar_refaccion"+ido+"/")
})
router.get("/eliminar_reparacion:id/", isLoggedIn, async (req, res) => {
    let { id } = req.params
    let ref= await pool.query("SELECT * FROM `tblrefaccionservicio` WHERE IdReferencia ="+id)
    let refacc= await pool.query("SELECT * FROM `tblrefacciones` WHERE IdRefaccion ="+ref[0].IdRefaccion)
    let Cantidad=refacc[0].Existencias+1
    await pool.query("UPDATE tblrefacciones SET Existencias = ? WHERE IdRefaccion ="+ref[0].IdRefaccion,[Cantidad])
    let orden = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio ="+ref[0].IdOrdenServicio)
    if(refacc[0].CostoVenta==null){
        refacc[0].CostoVenta=0
    }
    refacc[0].CostoVenta=parseInt(refacc[0].CostoVenta,10)
    if(orden[0].Presupuesto==null){
        orden[0].Presupuesto=0
    }
    orden[0].Presupuesto=parseInt(orden[0].Presupuesto,10)
    Cantidad=orden[0].Presupuesto-refacc[0].CostoVenta
    Cantidad=parseInt(Cantidad,10)
    await pool.query("UPDATE tblordenservicio SET Presupuesto = ? WHERE IdOrdenServicio ="+ref[0].IdOrdenServicio,[Cantidad])
    await pool.query("DELETE FROM `tblrefaccionservicio` WHERE IdReferencia ="+id)
    res.redirect("/servistar/agregar_refaccion"+ref[0].IdOrdenServicio+"/")
})


router.get("/servistar/notas:id/", isLoggedIn, async (req, res) =>{

    const { id } = req.params
    let notass = await pool.query("SELECT * FROM tblnotas WHERE IdOrdenServicio = ?",[id])
    const orden = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = ?",[id])
    if (notass[0] == undefined) {

        res.render("layouts/agregar_nota",{id, orden})
        return
        
    } else{

        if (notass[0].NotaCerrada == 1) {
            
                let notas = await pool.query("SELECT * FROM tbldetallenota WHERE IdNotas = ? order by `Descripcion` asc",[notass[0].IdNotas])
                let aa =5050
                res.render("layouts/solo_notas",{notas, id, aa,orden})
                return
            
        } else{
            let IdCliente=notass[0].IdCliente
            let notas = await pool.query("SELECT * FROM tbldetallenota WHERE IdNotas = ? order by `Descripcion` asc",[notass[0].IdNotas])
            if (notas[0] == undefined) {
                let IdN= notass[0].IdNotas
                res.render("layouts/ver_notas",{notas, id, orden, IdN, IdCliente})
            } else{
                let IdN= notas[0].IdNotas
                res.render("layouts/ver_notas",{notas, id, orden, IdN, IdCliente})

            }
            return
        }
    }



}) 





//Agregar post
router.post("/agregar_nota_n", isLoggedIn, async (req, res) =>{
    let {IdOrdenServicio, FechaNota, Garantia, IdCliente,NotaCerrada,Cantidad,Descripcion,PrecioUnitario,Importe} = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`,`Fecha`) VALUES (?, '10', ?,current_timestamp())",[id,IdOrdenServicio])
    const aa = await pool.query("SELECT MAX(`IdNotas`) AS id FROM tblnotas")
    let IdNotas = aa[0].id + 1
    let Total = Importe
    const nota={IdNotas, IdOrdenServicio, FechaNota, Garantia, IdCliente,NotaCerrada, Total}
    await pool.query("INSERT INTO tblnotas SET ?", [nota])
    const concepto={IdNotas, Cantidad,Descripcion,PrecioUnitario,Importe}
    await pool.query("INSERT INTO tbldetallenota SET ?", [concepto])
    res.redirect("/servistar/notas"+IdOrdenServicio)
})

router.post("/cerrar_nota", isLoggedIn, async (req, res) =>{
    let {Id} = req.body
    let idu = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`,`Fecha`) VALUES (?, '11', ?,current_timestamp())",[idu,Id])
    await pool.query("UPDATE tblnotas SET NotaCerrada = 1 WHERE IdOrdenServicio=?", [Id])
    res.redirect("/servistar/notas"+Id)
})
router.post("/editar_calendario", isLoggedIn, async (req, res) =>{
    let {IdOrdenServicio,IdTecnico,dia} = req.body
    let tec = await pool.query("SELECT * FROM tbltecnicos WHERE IdTecnico = ?",[IdTecnico])
    let dias = await pool.query("SELECT * FROM "+tec[0].tbl+" WHERE FechaDia = ?",[dia])

    for (let index = 0; index < dias.length; index++) {
        if (dias[index].Hora1==0) {
            dias[index].Hora1="LIBRE"
        }
        if (dias[index].Hora2==0) {
            dias[index].Hora2="LIBRE"
        }
        if (dias[index].Hora3==0) {
            dias[index].Hora3="LIBRE"
        }
        if (dias[index].Hora4==0) {
            dias[index].Hora4="LIBRE"
        }
        if (dias[index].Hora5==0) {
            dias[index].Hora5="LIBRE"
        }
        if (dias[index].Hora6==0) {
            dias[index].Hora6="LIBRE"
        }
        if (dias[index].Hora7==0) {
            dias[index].Hora7="LIBRE"
        }
        if (dias[index].Hora8==0) {
            dias[index].Hora8="LIBRE"
        }
        if (dias[index].Hora9==0) {
            dias[index].Hora9="LIBRE"
        }
        if (dias[index].Hora10==0) {
            dias[index].Hora10="LIBRE"
        }
        if (dias[index].Hora11==0) {
            dias[index].Hora11="LIBRE"
        }
        if (dias[index].Hora12==0) {
            dias[index].Hora12="LIBRE"
        }
        if (dias[index].Hora13==0) {
            dias[index].Hora13="LIBRE"
        }
        if (dias[index].Hora14==0) {
            dias[index].Hora14="LIBRE"
        }
        if (dias[index].Hora15==0) {
            dias[index].Hora15="LIBRE"
        }
        if (dias[index].Hora16==0) {
            dias[index].Hora16="LIBRE"
        }
        if (dias[index].Hora17==0) {
            dias[index].Hora17="LIBRE"
        }
        if (dias[index].Hora18==0) {
            dias[index].Hora18="LIBRE"
        }
        if (dias[index].Hora19==0) {
            dias[index].Hora19="LIBRE"
        }
        if (dias[index].Hora20==0) {
            dias[index].Hora20="LIBRE"
        }
        if (dias[index].Hora21==0) {
            dias[index].Hora21="LIBRE"
        }
        if (dias[index].Hora22==0) {
            dias[index].Hora22="LIBRE"
        }
        if (dias[index].Hora23==0) {
            dias[index].Hora23="LIBRE"
        }
         
         
     }
    
    res.render("layouts/editar_calendario",{IdOrdenServicio,IdTecnico,dia,dias})
})
router.post("/editar_calendarioayu", isLoggedIn, async (req, res) =>{
    let {IdOrdenServicio,IdAyudante,dia} = req.body
    let tec = await pool.query("SELECT * FROM tblayudantes WHERE IdAyudante = ?",[IdAyudante])
    log(tec[0])
    let dias = await pool.query("SELECT * FROM "+tec[0].tbl+" WHERE FechaDia = ?",[dia])

    for (let index = 0; index < dias.length; index++) {
        if (dias[index].Hora1==0) {
            dias[index].Hora1="LIBRE"
        }
        if (dias[index].Hora2==0) {
            dias[index].Hora2="LIBRE"
        }
        if (dias[index].Hora3==0) {
            dias[index].Hora3="LIBRE"
        }
        if (dias[index].Hora4==0) {
            dias[index].Hora4="LIBRE"
        }
        if (dias[index].Hora5==0) {
            dias[index].Hora5="LIBRE"
        }
        if (dias[index].Hora6==0) {
            dias[index].Hora6="LIBRE"
        }
        if (dias[index].Hora7==0) {
            dias[index].Hora7="LIBRE"
        }
        if (dias[index].Hora8==0) {
            dias[index].Hora8="LIBRE"
        }
        if (dias[index].Hora9==0) {
            dias[index].Hora9="LIBRE"
        }
        if (dias[index].Hora10==0) {
            dias[index].Hora10="LIBRE"
        }
        if (dias[index].Hora11==0) {
            dias[index].Hora11="LIBRE"
        }
        if (dias[index].Hora12==0) {
            dias[index].Hora12="LIBRE"
        }
        if (dias[index].Hora13==0) {
            dias[index].Hora13="LIBRE"
        }
        if (dias[index].Hora14==0) {
            dias[index].Hora14="LIBRE"
        }
        if (dias[index].Hora15==0) {
            dias[index].Hora15="LIBRE"
        }
        if (dias[index].Hora16==0) {
            dias[index].Hora16="LIBRE"
        }
        if (dias[index].Hora17==0) {
            dias[index].Hora17="LIBRE"
        }
        if (dias[index].Hora18==0) {
            dias[index].Hora18="LIBRE"
        }
        if (dias[index].Hora19==0) {
            dias[index].Hora19="LIBRE"
        }
        if (dias[index].Hora20==0) {
            dias[index].Hora20="LIBRE"
        }
        if (dias[index].Hora21==0) {
            dias[index].Hora21="LIBRE"
        }
        if (dias[index].Hora22==0) {
            dias[index].Hora22="LIBRE"
        }
        if (dias[index].Hora23==0) {
            dias[index].Hora23="LIBRE"
        }
         
         
     }
    
    res.render("layouts/editar_calendario",{IdOrdenServicio,IdAyudante,dia,dias})
})
router.post("/agregar_tecnico_c", isLoggedIn, async (req, res) =>{
    let {IdTecnico, IdOrdenServicio} = req.body
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

let tec= await pool.query("SELECT * FROM `tbltecnicos` WHERE IdTecnico = ?",[IdTecnico])
    let dias = await pool.query("SELECT * FROM "+tec[0].tbl+" WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])

    for (let index = 0; index < dias.length; index++) {
        if (dias[index].Hora1==0) {
            dias[index].Hora1="Libre"
        }
        if (dias[index].Hora2==0) {
            dias[index].Hora2="Libre"
        }
        if (dias[index].Hora3==0) {
            dias[index].Hora3="Libre"
        }
        if (dias[index].Hora4==0) {
            dias[index].Hora4="Libre"
        }
        if (dias[index].Hora5==0) {
            dias[index].Hora5="Libre"
        }
        if (dias[index].Hora6==0) {
            dias[index].Hora6="Libre"
        }
        if (dias[index].Hora7==0) {
            dias[index].Hora7="Libre"
        }
        if (dias[index].Hora8==0) {
            dias[index].Hora8="Libre"
        }
        if (dias[index].Hora9==0) {
            dias[index].Hora9="Libre"
        }
        if (dias[index].Hora10==0) {
            dias[index].Hora10="Libre"
        }
        if (dias[index].Hora11==0) {
            dias[index].Hora11="Libre"
        }
        if (dias[index].Hora12==0) {
            dias[index].Hora12="Libre"
        }
        if (dias[index].Hora13==0) {
            dias[index].Hora13="Libre"
        }
        if (dias[index].Hora14==0) {
            dias[index].Hora14="Libre"
        }
        if (dias[index].Hora15==0) {
            dias[index].Hora15="Libre"
        }
        if (dias[index].Hora16==0) {
            dias[index].Hora16="Libre"
        }
        if (dias[index].Hora17==0) {
            dias[index].Hora17="Libre"
        }
        if (dias[index].Hora18==0) {
            dias[index].Hora18="Libre"
        }
        if (dias[index].Hora19==0) {
            dias[index].Hora19="Libre"
        }
        if (dias[index].Hora20==0) {
            dias[index].Hora20="Libre"
        }
        if (dias[index].Hora21==0) {
            dias[index].Hora21="Libre"
        }
        if (dias[index].Hora22==0) {
            dias[index].Hora22="Libre"
        }
        if (dias[index].Hora23==0) {
            dias[index].Hora23="Libre"
        }
         
         
     }
    res.render("layouts/tecnico_cale",{IdTecnico, IdOrdenServicio, dias})
})
router.post("/agregar_ayudante_c", isLoggedIn, async (req, res) =>{
    let {IdAyudante, IdOrdenServicio} = req.body
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

let tec= await pool.query("SELECT * FROM `tblayudantes` WHERE IdAyudante = ?",[IdAyudante])
    let dias = await pool.query("SELECT * FROM "+tec[0].tbl+" WHERE FechaDia >= ? ORDER BY `FechaDia` ASC LIMIT 7",[fecha])

    for (let index = 0; index < dias.length; index++) {
        if (dias[index].Hora1==0) {
            dias[index].Hora1="Libre"
        }
        if (dias[index].Hora2==0) {
            dias[index].Hora2="Libre"
        }
        if (dias[index].Hora3==0) {
            dias[index].Hora3="Libre"
        }
        if (dias[index].Hora4==0) {
            dias[index].Hora4="Libre"
        }
        if (dias[index].Hora5==0) {
            dias[index].Hora5="Libre"
        }
        if (dias[index].Hora6==0) {
            dias[index].Hora6="Libre"
        }
        if (dias[index].Hora7==0) {
            dias[index].Hora7="Libre"
        }
        if (dias[index].Hora8==0) {
            dias[index].Hora8="Libre"
        }
        if (dias[index].Hora9==0) {
            dias[index].Hora9="Libre"
        }
        if (dias[index].Hora10==0) {
            dias[index].Hora10="Libre"
        }
        if (dias[index].Hora11==0) {
            dias[index].Hora11="Libre"
        }
        if (dias[index].Hora12==0) {
            dias[index].Hora12="Libre"
        }
        if (dias[index].Hora13==0) {
            dias[index].Hora13="Libre"
        }
        if (dias[index].Hora14==0) {
            dias[index].Hora14="Libre"
        }
        if (dias[index].Hora15==0) {
            dias[index].Hora15="Libre"
        }
        if (dias[index].Hora16==0) {
            dias[index].Hora16="Libre"
        }
        if (dias[index].Hora17==0) {
            dias[index].Hora17="Libre"
        }
        if (dias[index].Hora18==0) {
            dias[index].Hora18="Libre"
        }
        if (dias[index].Hora19==0) {
            dias[index].Hora19="Libre"
        }
        if (dias[index].Hora20==0) {
            dias[index].Hora20="Libre"
        }
        if (dias[index].Hora21==0) {
            dias[index].Hora21="Libre"
        }
        if (dias[index].Hora22==0) {
            dias[index].Hora22="Libre"
        }
        if (dias[index].Hora23==0) {
            dias[index].Hora23="Libre"
        }
         
         
     }
    res.render("layouts/ayudante_cale",{IdAyudante, IdOrdenServicio, dias})
})


router.post("/agregar_nota", isLoggedIn, async (req, res) =>{
    let {IdNotas,Cantidad,Descripcion,PrecioUnitario,Importe, Id} = req.body
    const nota={IdNotas,Cantidad,Descripcion,PrecioUnitario,Importe}
    await pool.query("INSERT INTO tbldetallenota SET ?", [nota])

    const not = await pool.query("SELECT Total FROM tblnotas WHERE IdOrdenServicio = ?", [Id])
    let total=parseInt(not[0].Total,10)+parseInt(Importe,10)
    await pool.query("UPDATE tblnotas SET Total = ? WHERE IdOrdenServicio=?", [total,Id])
    res.redirect("/servistar/notas"+Id)
})

router.post("/agregar_registro", isLoggedIn, async (req, res) => {
    let { IdOrdenServicio,FechaSolicitud,HoraLLamda,MedioDeInformacion,IdCliente,IdEquipo,Falla,HoraVisita, FechaVisita, IdAyudante, IdTecnicoSegui, IdAyudanteSegui, VisitaRealizada,HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,Descripcion,Presupuesto,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento} = req.body
    let id = req.user.IdUsuario
    let IdSucursal = req.user.Sucursal
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`,`Fecha`) VALUES (?, '6', ?,current_timestamp())",[id,IdOrdenServicio])
    if (FechaSolicitud=="") {
        FechaSolicitud=null
    }
    if (FechaVisita=="") {
        FechaVisita=null
    }
    if (FechaTerminadoEstimado=="") {
        FechaTerminadoEstimado=null
    }
    if (FechaTerminado=="") {
        FechaTerminado=null
    }
    if (FechaEntrega=="") {
        FechaEntrega=null
    }
    if (FechaVencimiento=="") {
        FechaVencimiento=null
    }
    if (CostoServicio=="") {
        CostoServicio=null
    }
    if (DiasVencimiento=="") {
        DiasVencimiento=null
    }
    if (IdAyudante=="") {
        IdAyudante=null
    }
    if (IdTecnicoSegui=="") {
        IdTecnicoSegui=null
    }
    if (IdAyudanteSegui=="") {
        IdAyudanteSegui=null
    }
    if (IdTecnico=="") {
        IdTecnico=null
    }


    const newarticulo = {IdSucursal,FechaSolicitud,HoraLLamda,MedioDeInformacion,IdCliente,IdEquipo,Falla,HoraVisita, Descripcion, FechaVisita, IdAyudante, IdTecnicoSegui, IdAyudanteSegui,VisitaRealizada,HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,Presupuesto,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento }
    log(newarticulo)
    await pool.query("INSERT INTO tblordenservicio SET ?", [newarticulo])
    
    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})

router.post("/agregar_equipo", isLoggedIn, async (req, res) => {
    let { IdCliente, IdEquipo, Categoria, Tipo, Marca, Color, Modelo, Serie } = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdCliente`, `IdEquipo`,`Fecha`) VALUES (?, '4', ?, ?, current_timestamp())",[id,IdCliente,IdEquipo])
    const newequipo = { IdCliente, IdEquipo, Categoria, Tipo, Marca, Color, Modelo, Serie }
    await pool.query("INSERT INTO tblequipos SET ?", [newequipo])
    res.redirect("/servistar/agregar_registro"+IdCliente+"/")

})
router.post("/ver_tecnico", isLoggedIn, async (req, res) => {
    let { tecnico } = req.body
    const tec = await pool.query("SELECT * FROM `tbltecnicos` WHERE `Titulo` = ?", [tecnico])
    if (tec[0].Habilitado==1) {
        let habil=1
        res.render("layouts/tecnicos_modi",{tec,habil})
    }else{
        res.render("layouts/tecnicos_modi",{tec})
    }

})
router.post("/editar_tecnico", isLoggedIn, async (req, res) => {
    let { IdTecnico,Titulo,Nombre,Direccion,Telefono,Habilitado } = req.body
    if (Habilitado=="on") {
        Habilitado=1
    } else {
        Habilitado=0
    }
    const newtec = { IdTecnico,Titulo,Nombre,Direccion,Telefono,Habilitado }
    await pool.query("UPDATE `tbltecnicos` SET ? WHERE IdTecnico = ?", [newtec,IdTecnico])

    res.redirect("/servistar/tecnicos")

})
router.post("/editar_ayudante", isLoggedIn, async (req, res) => {
    let { IdAyudante,Titulo,Nombre,Direccion,Telefono,Habilitado } = req.body
    if (Habilitado=="on") {
        Habilitado=1
    } else {
        Habilitado=0
    }
    const newtec = { IdAyudante,Titulo,Nombre,Direccion,Telefono,Habilitado }
    await pool.query("UPDATE `tblayudantes` SET ? WHERE IdAyudante = ?", [newtec,IdAyudante])

    res.redirect("/servistar/tecnicos")

})
router.post("/ver_ayudante", isLoggedIn, async (req, res) => {
    let { ayudante } = req.body
    const ayu = await pool.query("SELECT * FROM `tblayudantes` WHERE `Titulo` = ?", [ayudante])
    if (ayu[0].Habilitado==1) {
        let habil=1
        res.render("layouts/ayudante_modi",{ayu,habil})
    }else{
        res.render("layouts/ayudante_modi",{ayu})
    }

})
router.post("/edit_refaccion", isLoggedIn, async (req, res) => {
    let { IdRefaccion, Descripcion, Existencias, CostoVenta, CostoCompra } = req.body
    const refa={ Descripcion, Existencias, CostoVenta, CostoCompra}
    await pool.query("UPDATE `tblrefacciones` SET ? WHERE IdRefaccion = ?", [refa,IdRefaccion ])

    res.redirect("/servistar/refacciones")

})
router.post("/edit_servicio", isLoggedIn, async (req, res) => {
    let { IdServicio, Descripcion, Horas, CostoServicio } = req.body
    const ser={ Descripcion, Horas, CostoServicio }
    await pool.query("UPDATE `tblservicios` SET ? WHERE IdServicio = ?", [ser,IdServicio ])
    
    res.redirect("/servistar/servicios")
    
})
router.post("/agregar_refaccion", isLoggedIn, async (req, res) => {
    let { Descripcion, Existencias, CostoVenta, CostoCompra } = req.body
    const newrefa ={Descripcion, Existencias, CostoVenta, CostoCompra}
    await pool.query("INSERT INTO tblrefacciones SET ? ", [newrefa])
    
    res.redirect("/servistar/refacciones")
    
})
router.post("/agregar_servicio", isLoggedIn, async (req, res) => {
    let { Descripcion, Horas, CostoServicio } = req.body
    const newrefa ={Descripcion, Horas, CostoServicio}
    await pool.query("INSERT INTO tblservicios SET ? ", [newrefa])
    
    res.redirect("/servistar/servicios")
    
})

router.get("/servistar/ver_refaccion:id/", isLoggedIn, async (req, res) => {
    let {id} = req.params
    const Refaccion = await pool.query("SELECT * FROM tblrefacciones WHERE IdRefaccion = ?",[id])
    res.render("layouts/refacciones_modi",{Refaccion})
    
})
router.get("/servistar/gastos_fijos", isLoggedIn, async (req, res) => {
    const gasto = await pool.query("SELECT * FROM tblgastosfijos")
    res.render("layouts/gastos_fijos",{gasto})
    
})

router.post("/edit_gasto", isLoggedIn, async (req, res) => {
    let { IdGastoFijo, Descripcion, CostoVenta } = req.body
    const gas={ Descripcion, CostoVenta}
    await pool.query("UPDATE `tblgastosfijos` SET ? WHERE IdGastoFijo = ?", [gas,IdGastoFijo ])

    res.redirect("/servistar/gastos_fijos")

})

router.post("/agregar_gasto", isLoggedIn, async (req, res) => {
    let { Descripcion, CostoVenta } = req.body
    const newgast ={Descripcion, CostoVenta}
    await pool.query("INSERT INTO tblgastosfijos SET ? ", [newgast])

    res.redirect("/servistar/gastos_fijos")

})
router.get("/servistar/ver_gasto:id/", isLoggedIn, async (req, res) => {
    let {id} = req.params
    const gasto = await pool.query("SELECT * FROM tblgastosfijos WHERE IdGastoFijo  = ?",[id])
    res.render("layouts/gastos_fijos_modi",{gasto})

})
router.get("/servistar/ver_servicio:id/", isLoggedIn, async (req, res) => {
    let {id} = req.params
    const Servicio = await pool.query("SELECT * FROM tblservicios WHERE IdServicio = ?",[id])
    res.render("layouts/servicio_modi",{Servicio})

})
router.get("/servistar/tecnicos", isLoggedIn, async (req, res) => {
    
    res.render("layouts/tecnicos")

})
router.get("/servistar/refacciones", isLoggedIn, async (req, res) => {
    let Refacciones = await pool.query("SELECT * FROM tblrefacciones")
    res.render("layouts/refacciones", {Refacciones})

})
router.get("/servistar/servicios", isLoggedIn, async (req, res) => {
    let Servicios = await pool.query("SELECT * FROM tblservicios")
    res.render("layouts/servicios",{Servicios})

})



router.post("/ver_cliente/agregare", isLoggedIn, async (req, res) => {
    let { IdCliente, IdEquipo, Categoria, Tipo, Marca, Serie, Color, Modelo } = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` ( `IdUsuario`, `TipoMovimiento`, `IdCliente`, `IdEquipo`, `Fecha`) VALUES (?, '4', ?, ?, current_timestamp())",[id,IdCliente,IdEquipo])
    const newequipo = { IdCliente, IdEquipo, Categoria, Tipo, Marca, Serie, Color, Modelo }
    await pool.query("INSERT INTO tblequipos SET ?", [newequipo])
    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})
router.post("/editar_cliente", isLoggedIn, async (req, res) => {
    let { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP} = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdCliente`, `Fecha`) VALUES (?, '3', ?, current_timestamp())",[id,IdCliente])
    const newcliente = { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP}
    await pool.query("UPDATE tblclientes SET ? WHERE IdCliente=?", [newcliente, IdCliente])
    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})

router.post("/editar_registro", isLoggedIn, async (req, res) => {
    let { IdOrdenServicio,FechaSolicitud,HoraLLamda,MedioDeInformacion,IdCliente,IdEquipo,Falla,HoraVisita, FechaVisita, VisitaRealizada, Descripcion,IdAyudanteSegui, IdTecnicoSegui, IdAyudante, HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento} = req.body
    let aaa={ IdOrdenServicio,FechaSolicitud,HoraLLamda,MedioDeInformacion,IdCliente,IdEquipo,Falla,HoraVisita,VisitaRealizada,HoraVisitaReal,Descripcion, IdAyudanteSegui, IdTecnicoSegui, IdAyudante,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento}
    log(aaa)
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`,`Fecha`) VALUES (?, '7', ?, current_timestamp())",[id,IdOrdenServicio])
    if (IdTecnico=="Tecnico 1") {
        IdTecnico=1
    }else if (IdTecnico=="Tecnico 2") {
        IdTecnico=2
    }else if (IdTecnico=="Tecnico 3") {
        IdTecnico=3
    }else if (IdTecnico=="Tecnico 4") {
        IdTecnico=4
    }

    if (FechaSolicitud=="") {
        FechaSolicitud=null
    }
    if (FechaVisita=="") {
        FechaVisita=null
    }
    if (FechaTerminadoEstimado=="") {
        FechaTerminadoEstimado=null
    }
    if (FechaTerminado=="") {
        FechaTerminado=null
    }
    if (FechaEntrega=="") {
        FechaEntrega=null
    }
    if (FechaVencimiento=="") {
        FechaVencimiento=null
    }
    if (CostoServicio=="") {
        CostoServicio=null
    }
    if (DiasVencimiento=="") {
        DiasVencimiento=null
    }
   
    const cerrado = await pool.query("SELECT * FROM `tblnotas` WHERE IdOrdenServicio = ?",[IdOrdenServicio])
    if (cerrado.length==0) {
        const neworden = { IdOrdenServicio,FechaSolicitud,HoraLLamda,MedioDeInformacion,Falla,HoraVisita, FechaVisita, Descripcion, IdAyudante, IdTecnicoSegui, IdAyudanteSegui, VisitaRealizada,HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento}
        await pool.query("UPDATE tblordenservicio SET ? WHERE IdOrdenServicio = ?", [neworden,IdOrdenServicio])
    }else {
        if (cerrado[0].NotaCerrada==1){
        const neworden =  {FechaSolicitud,HoraLLamda,MedioDeInformacion,Falla,HoraVisita,VisitaRealizada, FechaVisita,Descripcion,IdAyudante, IdTecnicoSegui, IdAyudanteSegui, HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento}
        await pool.query("UPDATE tblordenservicio SET ? WHERE IdOrdenServicio = ?", [neworden,IdOrdenServicio])
        }else if (cerrado[0].NotaCerrada==0) {
            const neworden = {FechaSolicitud,HoraLLamda,MedioDeInformacion,Falla,HoraVisita,VisitaRealizada, FechaVisita,Descripcion, IdAyudante, IdTecnicoSegui, IdAyudanteSegui, HoraVisitaReal,TipoTrabajo,Reparaciones,Refacciones,IdTecnico,Diagnostico,CostoServicio,Garantia,AceptarPresupuesto,FechaTerminadoEstimado,LugarReparacion,EstadoServicio,FechaTerminado,FechaEntrega,VigenciaGarantia,ArticuloGarantia,FechaVencimiento,DiasVencimiento}
        await pool.query("UPDATE tblordenservicio SET ? WHERE IdOrdenServicio = ?", [neworden,IdOrdenServicio])
        }
    } 

    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})

router.post("/editar_equipo", isLoggedIn, async (req, res) => {
    let { IdCliente, IdEquipo, Categoria, Tipo, Marca, Serie, Color, Modelo} = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdCliente`, `IdEquipo`, `Fecha`) VALUES (?, '5', ?, ?, current_timestamp())",[id,IdCliente,IdEquipo])
    const newequipo = { IdCliente,IdEquipo, Categoria, Tipo, Marca, Serie, Color, Modelo}
    await pool.query("UPDATE tblequipos SET ? WHERE IdCliente=? AND IdEquipo=?", [newequipo, IdCliente, IdEquipo])
    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})
router.post("/abrir_nota", isLoggedIn, async (req, res) => {
    let {folio} = req.body
    await pool.query("UPDATE tblnotas SET NotaCerrada = 0 WHERE IdOrdenServicio = ?", [folio])
    res.redirect("/servistar/reportes")

})

router.post("/agregar_cliente", isLoggedIn, async (req, res) => {
    let { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP} = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdCliente`,`Fecha`) VALUES (?, '2', ?, current_timestamp())",[id,IdCliente])
    const newcliente = { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP}
    await pool.query("INSERT INTO tblclientes SET ?", [newcliente])
    
    res.redirect("/servistar/agregar_registro")

})

router.post("/cliente_agregar", isLoggedIn, async (req, res) => {
    let { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP} = req.body
    let id = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdCliente`, `Fecha`) VALUES (?, '2', ?, current_timestamp())",[id,IdCliente])
    const newcliente = { IdCliente, Nombre, DirColonia, DirCalle, DirNum, DirEntre, Telefono, RFC, Municipio, CP}
    await pool.query("INSERT INTO tblclientes SET ?", [newcliente])
    res.redirect("/servistar/clientes")

})


router.post("/agregar_garantia", isLoggedIn, async (req, res) => {
    let { IdOrdenServicio, FechaGarantia, IdCliente} = req.body
    if (FechaGarantia=="") {
        FechaGarantia=null
    }
    await pool.query("UPDATE tblordenservicio SET FechaGarantia = ? WHERE IdOrdenServicio = ?", [FechaGarantia,IdOrdenServicio])
    res.redirect("/servistar/ver_cliente"+IdCliente+"/")

})


//Ver contenido
router.get("/servistar/clientes", isLoggedIn, async (req, res) => {
    const clientes = await pool.query("SELECT * FROM tblclientes")
    let num=await pool.query("SELECT max(IdCliente) as num FROM tblclientes;")
    num=num[0].num+1
    res.render("layouts/verclientes", { clientes, num })
})


router.get("/servistar/servicios_pendientes", isLoggedIn, async (req, res) => {

    const en_eje = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.EstadoServicio='En Ejecucion' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
    const pa_ent = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.EstadoServicio='Para Entregar' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
    const espe = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.EstadoServicio='Esperando' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
    const espe_refa = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.EstadoServicio='Esperando Refacciones' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
    const sin_nada = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.EstadoServicio='Sin Preparacion' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
    const gara = await pool.query("SELECT * FROM tblordenservicio, tblclientes WHERE tblordenservicio.FechaGarantia='2021-12-31' AND tblclientes.IdCliente=tblordenservicio.IdCliente ORDER BY `FechaVisita` DESC;")
   
    res.render("layouts/servicios_pendientes", {en_eje, pa_ent, espe, espe_refa, sin_nada, gara})
})


router.get("/servistar/ver_cliente:id/", isLoggedIn, async (req, res) => {
    const { id } = req.params
    const equipo = await pool.query("SELECT * FROM tblequipos WHERE IdCliente = ?", [id])
    let cliente= await pool.query("SELECT * from tblclientes WHERE IdCliente = ?",[id])
    const orden = await pool.query("SELECT * FROM tblordenservicio WHERE IdCliente = ? ORDER BY IdOrdenServicio DESC",[id])
    for (let index = 0; index < orden.length; index++) {
        if (orden[index].Realizado==0) {
            orden[index].Realizado="No"
        }else if (orden[index].Realizado==128) {
            orden[index].Realizado="Cotizacion"
        }else if (orden[index].Realizado==100) {
            orden[index].Realizado="En Proceso"
        }else{
            orden[index].Realizado="Si"
        }
        
    }
    for (let index = 0; index < orden.length; index++) {
        if (orden[index].IdTecnico==1) {
            orden[index].IdTecnico="Tecnico 1"
        }else if (orden[index].IdTecnico==2) {
            orden[index].IdTecnico="Tecnico 2"
        }else if (orden[index].IdTecnico==3) {
            orden[index].IdTecnico="Tecnico 3"
        }else if(orden[index].IdTecnico==4){
            orden[index].IdTecnico="Tecnico 4"
        }
    }
    res.render("layouts/cliente_completo", { equipo, cliente, orden ,id })
})



router.get("/servistar/reportes", isLoggedIn, isAdmin, async (req, res) => {
   /* let cuenta = await pool.query("SELECT Email, Nombre, IdUsuario, Activa FROM tblusuarios WHERE IdUsuario = 16 OR IdUsuario = 17")
        res.render("layouts/reporte",{cuenta})*/
        res.redirect("/servistar/agregar_registro")
    
})
router.get("/vetar_cliente:id", isLoggedIn, async (req, res) => {
    let {id} = req.params

    let vet = await pool.query("SELECT * FROM `tblclientes` WHERE `IdCliente`="+id)
    if (vet[0].Vetado==0) {
        vet=1
    }else{
        vet=0
    }
    await pool.query("UPDATE tblclientes SET Vetado = ? WHERE IdCliente ="+id,[vet])
        res.redirect("/servistar/ver_cliente"+id)
    
})
router.get("/servistar/eliminar_nota:id/", isLoggedIn, async (req, res) => {
    let {id} = req.params
    console.log(id)
    let Orden = await pool.query("SELECT * FROM `tbldetallenota` WHERE `ID` = ?",[id])
    log(Orden[0])
    await pool.query("DELETE FROM `tbldetallenota` WHERE `ID` = ?",[id])
    let IdOrden = await pool.query("SELECT * FROM `tblnotas` WHERE IdNotas = ?",[Orden[0].IdNotas])

    res.redirect("/servistar/notas"+IdOrden[0].IdOrdenServicio+"/")

    
})

router.post("/servistar/activar_desactivar", isLoggedIn, isAdmin, async (req, res) => {
        let {Activa}=req.body
        await pool.query("UPDATE tblusuarios SET Activa = ? WHERE IdUsuario = 13",[Activa])
        res.redirect("/servistar/reportes")
    
})

router.post("/editar_garantia", isLoggedIn, async (req, res) => {
    let {IdOrdenServicio, FechaGarantiaNew, HoraGarantia, Descripcion,TipoGarantia}=req.body
    let garantia ={IdOrdenServicio, FechaGarantiaNew, HoraGarantia, Descripcion,TipoGarantia}
    await pool.query("INSERT INTO `tblgarantias` SET ?",[garantia])
    if(TipoGarantia==0){
        await pool.query("UPDATE tblordenservicio SET FechaGarantia = '2021-12-31 00:00:00' WHERE IdOrdenServicio = ? ", [IdOrdenServicio])
    }else if (TipoGarantia==1) {
        await pool.query("UPDATE tblordenservicio SET FechaGarantia = '2021-12-30 00:00:00' WHERE IdOrdenServicio = ? ", [IdOrdenServicio])
    }else if (TipoGarantia==2) {
        await pool.query("UPDATE tblordenservicio SET FechaGarantia = '2021-12-29 00:00:00' WHERE IdOrdenServicio = ? ", [IdOrdenServicio])
    }
    res.redirect("/ver_garantia"+IdOrdenServicio+"/")
    
})

router.get("/editar_garantia_n:id", isLoggedIn, async (req, res) => {
    const { id } = req.params
    const orden = await pool.query("SELECT * FROM `tblgarantias` WHERE `IdGarantia` = ? ",[id])
    res.render("layouts/editar_garantia", {orden ,id })
    log(id, orden)
})

router.post("/editar_garantia_n", isLoggedIn, async (req, res) => {
    let {IdGarantia, IdOrdenServicio, FechaGarantiaNew, HoraGarantia, Descripcion}=req.body
    let garantia ={ FechaGarantiaNew, HoraGarantia, Descripcion}
    await pool.query("UPDATE tblgarantias SET ? WHERE IdGarantia = ? ", [garantia,IdGarantia])
    res.redirect("/ver_garantia"+IdOrdenServicio+"/")

})

router.post("/servistar/ver_movimientos", isLoggedIn, isAdmin, async (req, res) => {
    let {desde, hasta} =req.body
    desde=desde+" 00:00:00"
    hasta=hasta+" 23:59:59"
        let movimiento = await pool.query("SELECT * FROM `tblmovimientos` WHERE DATE(`Fecha`)>= ?  AND DATE(`Fecha`)<= ?  AND IdUsuario <> '15';", [desde,hasta])
        log(movimiento)
        for (let index = 0; index < movimiento.length; index++) {
            


            if (movimiento[index].IdUsuario==16) {
                movimiento[index].IdUsuario="CLAUDIA NATALY RODRIGUEZ GRACIANO"

            } else if (movimiento[index].IdUsuario==17) {
                movimiento[index].IdUsuario="LAURA KARINA ACUÑA MEJÍA"

            }else if (movimiento[index].IdUsuario==18) {
                movimiento[index].IdUsuario="ALEJO FAJARDO GÓMEZ"
            }

            if (movimiento[index].TipoMovimiento==0) {
                movimiento[index].TipoMovimiento="Inicio de sesion"
            } else if (movimiento[index].TipoMovimiento==1) {
                movimiento[index].TipoMovimiento="Cerro sesion"
            } else if (movimiento[index].TipoMovimiento==2) {
                movimiento[index].TipoMovimiento="Agrego usuario"
            } else if (movimiento[index].TipoMovimiento==3) {
                movimiento[index].TipoMovimiento="Edito usuario"
            } else if (movimiento[index].TipoMovimiento==4) {
                movimiento[index].TipoMovimiento="Agrego equipo"
            } else if (movimiento[index].TipoMovimiento==5) {
                movimiento[index].TipoMovimiento="Edito usuario"
            } else if (movimiento[index].TipoMovimiento==6) {
                movimiento[index].TipoMovimiento="Agrego orden"
            } else if (movimiento[index].TipoMovimiento==7) {
                movimiento[index].TipoMovimiento="Edito orden"
            } else if (movimiento[index].TipoMovimiento==8) {
                movimiento[index].TipoMovimiento="Creo PDF"
            } else if (movimiento[index].TipoMovimiento==9) {
                movimiento[index].TipoMovimiento="Creo IMG"
            } else if (movimiento[index].TipoMovimiento==10) {
                movimiento[index].TipoMovimiento="Agrego nota"
            } else if (movimiento[index].TipoMovimiento==11) {
                movimiento[index].TipoMovimiento="Cerro nota"
            } else if (movimiento[index].TipoMovimiento==12) {
                movimiento[index].TipoMovimiento="Modifico Garantia"
            } else if (movimiento[index].TipoMovimiento==13) {
                movimiento[index].TipoMovimiento="Cerro Garantia"
            }
        
            if (movimiento[index].IdOrdenServicio==0) {
                movimiento[index].IdOrdenServicio=""
            }
            if (movimiento[index].IdCliente==0) {
                movimiento[index].IdCliente=""
            }
            if (movimiento[index].IdEquipo==0) {
                movimiento[index].IdEquipo=""
            }

            
        }
        log(movimiento)
        res.render("layouts/reporte_movimiento",{movimiento})
    
})

router.post("/servistar/ver_reporte", isLoggedIn, isAdmin, async (req, res) => {
    let {desde, hasta} =req.body
     let ordenes = await pool.query("SELECT substring(FechaRealizacion,1,10)AS fecha, CostoServicio, IdTecnico FROM tblordenservicio WHERE Realizado = 255")
     let tec4=0,
     tec8=0,
     tec11=0,
     tec4n=0,
     tec8n=0,
     tec11n=0,
     a=0,
     total=0,
     format="yyyy-MM-DD"
     for (let index = 0; index < ordenes.length; index++) {


        var fecha = moment(ordenes[index].fecha,format),
        ATime = moment(desde, format),
        DTime = moment(hasta, format);

        if (fecha.isBetween(ATime, DTime)) {
        a=a+1
        total+=ordenes[index].CostoServicio
        if (ordenes[index].IdTecnico==4) {
            tec4n+=+1
            tec4+=ordenes[index].CostoServicio
        } else if (ordenes[index].IdTecnico==8) {
            tec8n+=+1
            tec8+=ordenes[index].CostoServicio
        }else if (ordenes[index].IdTecnico==11) {
            tec11n+=+1
            tec11+=ordenes[index].CostoServicio
        }

        }
        }
        total = Intl.NumberFormat('en-EU', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2}).format(total);
        tec4 = Intl.NumberFormat('en-EU', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2}).format(tec4);
        tec8 = Intl.NumberFormat('en-EU', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2}).format(tec8);
        tec11 = Intl.NumberFormat('en-EU', {style: 'currency',currency: 'MXN', minimumFractionDigits: 2}).format(tec11);
    res.render("layouts/reporte_tecnico",{total,tec4,tec8,tec11,tec4n,tec8n,tec11n})
})

router.get("/ver_garantia:id/", isLoggedIn, async (req,res) =>{
    const {id}=req.params
    const orden = await pool.query("SELECT * FROM tblgarantias WHERE IdOrdenServicio = ?",[id])
    let cliente = await pool.query("SELECT * FROM `tblordenservicio` WHERE `IdOrdenServicio`=?",[id])
    const garantia = await pool.query("SELECT * FROM `tblgarantias` WHERE `IdOrdenServicio` = ? ORDER BY `IdGarantia` DESC",[id])

    let Descripcion = cliente[0].Descripcion
    cliente=cliente[0].IdCliente

        res.render("layouts/garantia",{orden, id, cliente, garantia,Descripcion})
    })

router.post("/servistar/reporte_medio", isLoggedIn, isAdmin, async (req, res) => {
     let {desde, hasta} =req.body
     let ordenes = await pool.query("SELECT substring(FechaRealizacion,1,10)AS fecha, MedioDeInformacion FROM tblordenservicio WHERE Realizado = 255")
     let medios = {Revista:0,Cliente:0,Recomendacion:0,Tarjeta:0}
     format="yyyy-MM-DD"
     for (let index = 0; index < ordenes.length; index++) {


        var fecha = moment(ordenes[index].fecha,format),
        ATime = moment(desde, format),
        DTime = moment(hasta, format);

        if (fecha.isBetween(ATime, DTime)) {
            if (ordenes[index].MedioDeInformacion=="revista/anuncio") {
                medios.Revista++  
            }else if (ordenes[index].MedioDeInformacion=="cliente") {
                medios.Cliente++
            }else if (ordenes[index].MedioDeInformacion=="recomendacion") {
                medios.Recomendacion++
            }else if (ordenes[index].MedioDeInformacion=="tarjeta") {
                medios.Tarjeta++
            }
            

        }
        }
        let total = medios.Tarjeta+medios.Recomendacion+medios.Cliente+medios.Revista
    res.render("layouts/reporte_medio",{medios,total})
})


//PDF-Notas
router.get("/descargar",  pdfc.desimg)

router.get("/ver",  pdfc.img)





router.get("/pdf",  pdfc.despdf)

router.get("/verpdf",  pdfc.pdf)




router.get("/ver_nota/:id", isLoggedIn, async (req,res) =>{
const {id}=req.params
let idu = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`,`Fecha`) VALUES (?, '9', ?, current_timestamp())",[idu,id])
await pool.query("UPDATE tblidnotas SET IdOrden = ? WHERE IdNota = 1",[id])
res.redirect("/descargar")
})



router.get("/cerrar_garantia:id/", isLoggedIn, async (req,res) =>{
const {id}=req.params
let idu = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`, `Fecha`) VALUES (?, '13', ?, current_timestamp())",[idu,id])
await pool.query("UPDATE `tblordenservicio` SET `FechaGarantia` = null WHERE IdOrdenServicio = ?",[id])
const cliente = await pool.query("SELECT `IdCliente` FROM `tblordenservicio` WHERE `IdOrdenServicio` = ?",[id])
res.redirect("/servistar/ver_cliente"+cliente[0].IdCliente+"/")
})

router.get("/ver_pdf:id/", isLoggedIn, async (req,res) =>{
const {id}=req.params
let idu = req.user.IdUsuario
    await pool.query("INSERT INTO `tblmovimientos` (`IdUsuario`, `TipoMovimiento`, `IdOrdenServicio`, `Fecha`) VALUES (?, '8', ?, current_timestamp())",[idu,id])
await pool.query("UPDATE tblidnotas SET IdOrden = ? WHERE IdNota = 1",[id])
res.redirect("/pdf")
})














/*



router.get("/aa", isLoggedIn, async (req,res) =>{
    const fecha=await pool.query("SELECT * FROM tblordenservicio")
    for (let index = 0; index < fecha.length ; index++) {
        await pool.query("UPDATE tblordenservicio SET FechaVisita = ? WHERE IdOrdenServicio = ?",[fecha[index].FechaRealizacion,fecha[index].IdOrdenServicio])

    }
   
    res.send("Listoooo")
    })


    
router.get("/bb", isLoggedIn, async (req,res) =>{
        await pool.query("UPDATE tblordenservicio SET FechaGarantia = 'null' WHERE FechaGarantia <> 'null'")
    res.send("Listoooo")
    })




    router.get("/mayus", isLoggedIn, async (req,res) =>{
        const datos=await pool.query("SELECT * FROM tblordenservicio")

        for (let index = 0; index < datos.length ; index++) {
            datos[index].Falla=datos[index].Falla.toUpperCase()
            await pool.query("UPDATE tblordenservicio SET Falla = ? WHERE IdOrdenServicio = ?",[datos[index].Falla,datos[index].IdOrdenServicio])
            if (datos[index].Observaciones==null) {
                
            }else{
            datos[index].Observaciones=datos[index].Observaciones.toUpperCase()
            await pool.query("UPDATE tblordenservicio SET Observaciones = ? WHERE IdOrdenServicio = ?",[datos[index].Observaciones,datos[index].IdOrdenServicio])}

        }
   
    res.send("Listoooo")
    })


    router.get("/mayust", isLoggedIn, async (req,res) =>{
        const datos=await pool.query("SELECT * FROM tbltecnicos")

        for (let index = 0; index < datos.length ; index++) {
            if (datos[index].Direccion==null) {
                
            }else{
            datos[index].Direccion=datos[index].Direccion.toUpperCase()
            await pool.query("UPDATE tbltecnicos SET Direccion = ? WHERE IdTecnico = ?",[datos[index].Direccion,datos[index].IdTecnico])}
            

        }
   
    res.send("Listoooo")
    })

    router.get("/mayuse", isLoggedIn, async (req,res) =>{
        const datos=await pool.query("SELECT * FROM tblequipos")
        for (let index = 0; index < datos.length ; index++) {
            if (datos[index].Marca==null) {
                
            }else{
            datos[index].Marca=datos[index].Marca.toUpperCase()
            await pool.query("UPDATE tblequipos SET Marca = ? WHERE IdCliente = ? AND IdEquipo = ?",[datos[index].Marca,datos[index].IdCliente,datos[index].IdEquipo])}
            

            if (datos[index].Color==null) {
                
            }else{
            datos[index].Color=datos[index].Color.toUpperCase()
            await pool.query("UPDATE tblequipos SET Color = ? WHERE IdCliente = ? AND IdEquipo = ?",[datos[index].Color,datos[index].IdCliente,datos[index].IdEquipo])}


            if (datos[index].Modelo==null) {
                
            }else{
            datos[index].Modelo=datos[index].Modelo.toUpperCase()
            await pool.query("UPDATE tblequipos SET Modelo = ? WHERE IdCliente = ? AND IdEquipo = ?",[datos[index].Modelo,datos[index].IdCliente,datos[index].IdEquipo])}

        }
   
    res.send("Listoooo")
    })



    router.get("/mayusc", isLoggedIn, async (req,res) =>{
        const datos=await pool.query("SELECT * FROM tblclientes")

        for (let index = 0; index < datos.length ; index++) {
            if (datos[index].Nombre==null) {
                
            }else{
            datos[index].Nombre=datos[index].Nombre.toUpperCase()
            await pool.query("UPDATE tblclientes SET Nombre = ? WHERE IdCliente = ?",[datos[index].Nombre,datos[index].IdCliente])}

            if (datos[index].DirColonia==null) {
                
            }else{
            datos[index].DirColonia=datos[index].DirColonia.toUpperCase()
            await pool.query("UPDATE tblclientes SET DirColonia = ? WHERE IdCliente = ?",[datos[index].DirColonia,datos[index].IdCliente])}

            if (datos[index].DirCalle==null) {
                
            }else{
            datos[index].DirCalle=datos[index].DirCalle.toUpperCase()
            await pool.query("UPDATE tblclientes SET DirCalle = ? WHERE IdCliente = ?",[datos[index].DirCalle,datos[index].IdCliente])}

            if (datos[index].DirEntre==null) {
                
            }else{
            datos[index].DirEntre=datos[index].DirEntre.toUpperCase()
            await pool.query("UPDATE tblclientes SET DirEntre = ? WHERE IdCliente = ?",[datos[index].DirEntre,datos[index].IdCliente])}

            if (datos[index].Municipio==null) {
                
            }else{
            datos[index].Municipio=datos[index].Municipio.toUpperCase()
            await pool.query("UPDATE tblclientes SET Municipio = ? WHERE IdCliente = ?",[datos[index].Municipio,datos[index].IdCliente])}

            if (datos[index].RFC==null) {
                
            }else{
            datos[index].RFC=datos[index].RFC.toUpperCase()
            await pool.query("UPDATE tblclientes SET RFC = ? WHERE IdCliente = ?",[datos[index].RFC,datos[index].IdCliente])}
            

        }
   
    res.send("Listoooo")
    })



    router.get("/mayuscn", isLoggedIn, async (req,res) =>{
        const datos=await pool.query("SELECT * FROM tblclientes")

        for (let index = 0; index < datos.length ; index++) {
            if (datos[index].DirNum==null) {
                
            }else{
            datos[index].DirNum=datos[index].DirNum.toUpperCase()
            await pool.query("UPDATE tblclientes SET DirNum = ? WHERE IdCliente = ?",[datos[index].DirNum,datos[index].IdCliente])}
            

        }
        res.send("Listoooo")
    })

    router.get("/notacerrada", isLoggedIn, async (req,res) =>{
        
            await pool.query("UPDATE tblnotas SET NotaCerrada = '1' WHERE NotaCerrada = '0'")
        
        res.send("Listoooo")
    })

    router.get("/cant", isLoggedIn, async (req,res) =>{
       await pool.query("UPDATE tbldetallenota SET Cantidad = 1 WHERE Cantidad = 0")
        res.send("Listoooo")
    })



    */
//Exportar
module.exports = router