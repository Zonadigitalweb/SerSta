const puppeteer = require("puppeteer")
const pool = require("../database")
var moment = require('moment');


async function crearimagen(url){

    let navegador=await puppeteer.launch({args:['--no-sandbox']})

    let pagina = await navegador.newPage()

    await pagina.goto(url)

    await pagina.screenshot({path:"i.jpg", fullPage: true })

    navegador.close()

    return
}

async function crearpdf(url){
    let navegador=await puppeteer.launch({args:['--no-sandbox']})

    let pagina = await navegador.newPage()

    await pagina.goto(url)

    let pdf=await pagina.pdf({margin:{top:40,bottom:50}})

    navegador.close()

    return pdf
}


var numeroALetras = (function() {
   
    function Unidades(num) {

        switch (num) {
            case 1:
                return 'UN';
            case 2:
                return 'DOS';
            case 3:
                return 'TRES';
            case 4:
                return 'CUATRO';
            case 5:
                return 'CINCO';
            case 6:
                return 'SEIS';
            case 7:
                return 'SIETE';
            case 8:
                return 'OCHO';
            case 9:
                return 'NUEVE';
        }

        return '';
    } //Unidades()

    function Decenas(num) {

        let decena = Math.floor(num / 10);
        let unidad = num - (decena * 10);

        switch (decena) {
            case 1:
                switch (unidad) {
                    case 0:
                        return 'DIEZ';
                    case 1:
                        return 'ONCE';
                    case 2:
                        return 'DOCE';
                    case 3:
                        return 'TRECE';
                    case 4:
                        return 'CATORCE';
                    case 5:
                        return 'QUINCE';
                    default:
                        return 'DIECI' + Unidades(unidad);
                }
            case 2:
                switch (unidad) {
                    case 0:
                        return 'VEINTE';
                    default:
                        return 'VEINTI' + Unidades(unidad);
                }
            case 3:
                return DecenasY('TREINTA', unidad);
            case 4:
                return DecenasY('CUARENTA', unidad);
            case 5:
                return DecenasY('CINCUENTA', unidad);
            case 6:
                return DecenasY('SESENTA', unidad);
            case 7:
                return DecenasY('SETENTA', unidad);
            case 8:
                return DecenasY('OCHENTA', unidad);
            case 9:
                return DecenasY('NOVENTA', unidad);
            case 0:
                return Unidades(unidad);
        }
    } //Unidades()

    function DecenasY(strSin, numUnidades) {
        if (numUnidades > 0)
            return strSin + ' Y ' + Unidades(numUnidades)

        return strSin;
    } //DecenasY()

    function Centenas(num) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);

        switch (centenas) {
            case 1:
                if (decenas > 0)
                    return 'CIENTO ' + Decenas(decenas);
                return 'CIEN';
            case 2:
                return 'DOSCIENTOS ' + Decenas(decenas);
            case 3:
                return 'TRESCIENTOS ' + Decenas(decenas);
            case 4:
                return 'CUATROCIENTOS ' + Decenas(decenas);
            case 5:
                return 'QUINIENTOS ' + Decenas(decenas);
            case 6:
                return 'SEISCIENTOS ' + Decenas(decenas);
            case 7:
                return 'SETECIENTOS ' + Decenas(decenas);
            case 8:
                return 'OCHOCIENTOS ' + Decenas(decenas);
            case 9:
                return 'NOVECIENTOS ' + Decenas(decenas);
        }

        return Decenas(decenas);
    } //Centenas()

    function Seccion(num, divisor, strSingular, strPlural) {
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let letras = '';

        if (cientos > 0)
            if (cientos > 1)
                letras = Centenas(cientos) + ' ' + strPlural;
            else
                letras = strSingular;

        if (resto > 0)
            letras += '';

        return letras;
    } //Seccion()

    function Miles(num) {
        let divisor = 1000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMiles = Seccion(num, divisor, 'MIL', 'MIL');
        let strCentenas = Centenas(resto);

        if (strMiles == '')
            return strCentenas;

        return strMiles + ' ' + strCentenas;
    } //Miles()

    function Millones(num) {
        let divisor = 1000000;
        let cientos = Math.floor(num / divisor)
        let resto = num - (cientos * divisor)

        let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
        let strMiles = Miles(resto);

        if (strMillones == '')
            return strMiles;

        return strMillones + ' ' + strMiles;
    } //Millones()

    return function NumeroALetras(num, currency) {
        currency = currency || {};
        let data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: '',
            letrasMonedaPlural: currency.plural || 'PESOS CHILENOS', //'PESOS', 'Dólares', 'Bolívares', 'etcs'
            letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
            letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
            letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO'
        };

        if (data.centavos > 0) {
            data.letrasCentavos = 'CON ' + (function() {
                if (data.centavos == 1)
                    return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoSingular;
                else
                    return Millones(data.centavos) + ' ' + data.letrasMonedaCentavoPlural;
            })();
        };

        if (data.enteros == 0)
            return 'CERO ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + ' ' + data.letrasMonedaSingular + ' ' + data.letrasCentavos;
        else
            return Millones(data.enteros) + ' ' + data.letrasMonedaPlural + ' ' + data.letrasCentavos;
    };

})();

module.exports={


    async img(req,res){
        let idOrden = await pool.query("SELECT * FROM `tblidnotas`")
        idOrden=idOrden[0].IdOrden
        const datos = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = ?",[idOrden])
        const cliente = await pool.query("SELECT * FROM tblclientes WHERE IdCliente = ?",[datos[0].IdCliente])
        const tecnico =await pool.query("SELECT * FROM tbltecnicos WHERE IdTecnico = ?",[datos[0].IdTecnico])
        const equipo =await pool.query("SELECT * FROM tblequipos WHERE IdCliente = ? AND IdEquipo = ?", [datos[0].IdCliente, datos[0].IdEquipo])

        if(datos[0].Realizado==128){
            datos[0].Realizado="Cotizado"
        }else if(datos[0].Realizado==255){
            datos[0].Realizado="Realizado"
        }else{
            datos[0].Realizado="Abierto"
        }
        const garantia = await pool.query("SELECT substring(FechaGarantia,1,10)AS FechaGarantia FROM tblordenservicio WHERE IdOrdenServicio = ?",[idOrden])
        
        console.log(garantia[0].FechaGarantia)
        if (garantia[0].FechaGarantia =="2021-12-31") {
            res.render("factura_garantia.hbs",{ layout:"mainpdf",datos,cliente,tecnico,equipo})
            
        }else{

            res.render("factura.hbs",{ layout:"mainpdf",datos,cliente,tecnico,equipo})
        }

    },

    
    async desimg(req,res){
        await crearimagen("http://localhost:3500/ver")
        let idOrden = await pool.query("SELECT * FROM `tblidnotas`")
        idOrden=idOrden[0].IdOrden
        let datos = await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = ?",[idOrden])
        const cliente = await pool.query("SELECT * FROM tblclientes WHERE IdCliente = ?",[datos[0].IdCliente])
        //res.type("png")
        //res.set('content-type', 'image/png')
        //res.send(pdf)
        filename=cliente[0].Nombre+".jpg"
        res.download('i.jpg', filename)
        
    },
 

    async pdf(req,res){
        let orden = await pool.query("SELECT * FROM tblidnotas")
        orden= await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = ?",[orden[0].IdOrden])
        let cliente = await pool.query("SELECT * FROM tblclientes WHERE IdCliente = ?",[orden[0].IdCliente])
        let tec = await pool.query("SELECT * FROM tbltecnicos WHERE IdTecnico = ?",[orden[0].IdTecnico])
        const cantidad = numeroALetras(orden[0].CostoServicio, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
          });
          if (orden.length!=0) {
            if ((orden[0].FechaEntrega != null || orden[0].FechaEntrega != undefined) && (orden[0].VigenciaGarantia != null ||orden[0].VigenciaGarantia != undefined)) {
                orden[0].FechaVencimiento=moment(orden[0].FechaEntrega).add(orden[0].VigenciaGarantia,'d')
            
            
                var fecha1 = moment();
            var fecha2 = moment(orden[0].FechaVencimiento);
            
            orden[0].DiasVencimiento = fecha2.diff(fecha1, 'days') 
            }
            if(orden[0].DiasVencimiento < 1){
                orden[0].DiasVencimiento=0
            } else {
                orden[0].DiasVencimiento++
            }
            
        }
        orden[0].CostoServicio=orden[0].CostoServicio.toLocaleString();

        console.log(orden[0].Descripcion)

        res.render("nota.hbs",{ layout:"mainpdf",orden,cliente,cantidad,tec})
    },
    
    async despdf(req,res){
        const pdf = await crearpdf("http://localhost:3500/verpdf")
        res.contentType("application/pdf")
        res.send(pdf)

    },

    async despdf_blan(req,res){
        const pdf = await crearpdf("http://localhost:3500/verpdf_blan")
        res.contentType("application/pdf")
        res.send(pdf)

    },

    async pdf_blan(req,res){
        let orden = await pool.query("SELECT * FROM tblidnotas")
        orden= await pool.query("SELECT * FROM tblordenservicio WHERE IdOrdenServicio = ?",[orden[0].IdOrden])
        let cliente = await pool.query("SELECT * FROM tblclientes WHERE IdCliente = ?",[orden[0].IdCliente])
        let tec = await pool.query("SELECT * FROM tbltecnicos WHERE IdTecnico = ?",[orden[0].IdTecnico])
        const cantidad = numeroALetras(orden[0].CostoServicio, {
            plural: "PESOS",
            singular: "PESO",
            centPlural: "CENTAVOS",
            centSingular: "CENTAVO"
          });
          if (orden.length!=0) {
            if ((orden[0].FechaEntrega != null || orden[0].FechaEntrega != undefined) && (orden[0].VigenciaGarantia != null ||orden[0].VigenciaGarantia != undefined)) {
                orden[0].FechaVencimiento=moment(orden[0].FechaEntrega).add(orden[0].VigenciaGarantia,'d')
            
            
                var fecha1 = moment();
            var fecha2 = moment(orden[0].FechaVencimiento);
            
            orden[0].DiasVencimiento = fecha2.diff(fecha1, 'days') 
            }
            if(orden[0].DiasVencimiento < 1){
                orden[0].DiasVencimiento=0
            } else {
                orden[0].DiasVencimiento++
            }
            
        }
        orden[0].CostoServicio=orden[0].CostoServicio.toLocaleString();

        res.render("nota_blan.hbs",{ layout:"mainpdf",orden,cliente,cantidad,tec})
    },

    async pdff(req,res){
        let fechas = await pool.query("SELECT * FROM tblidnotas WHERE IdNota = 1")
        let orden= await pool.query("SELECT tblordenservicio.*, tblclientes.Nombre AS NombreCli, tblequipos.*, tbltecnicos.* FROM tblordenservicio,tblclientes,tblequipos,tbltecnicos WHERE tblordenservicio.FechaSolicitud >= ? AND tblordenservicio.FechaSolicitud <= ? AND tblclientes.IdCliente = tblordenservicio.IdCliente AND tblequipos.IdEquipo = tblordenservicio.IdEquipo AND tblequipos.IdCliente = tblordenservicio.IdCliente AND tbltecnicos.IdTecnico = tblordenservicio.IdTecnico",[fechas[0].FechaDesde,fechas[0].FechaHasta])
        for (let index = 0; index < orden.length; index++) {
            
            let com=orden[index].CostoServicio-orden[index].Dolares
            if (com <= 1200) {
                com=0
            } else if(com <= 1700){
                com=150
            } else if(com <= 2200){
                com=200
            } else if(com <= 2500){
                com=250
            } else {
                com=300
            }
            orden[index].TipoTrabajo=com
            let utili=orden[index].CostoServicio-orden[index].Presupuesto-com
            orden[index].VisitaRealizada=utili
            

            let tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'KIT DE LIMPIEZA'")
            orden[index].kit=tem[0].CostoVenta
            tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'DLLS'")
            orden[index].Dlls=tem[0].CostoVenta
            tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'IVA'")
            orden[index].Iva=tem[0].CostoVenta
            tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'LUZ Y AGUA'")
            orden[index].LyA=tem[0].CostoVenta
            tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'GARANTIA'")
            orden[index].Gara=tem[0].CostoVenta
            tem = await pool.query("SELECT * FROM tblgastosfijos WHERE Descripcion = 'GASOLINA VILLA'")
            orden[index].Gas=tem[0].CostoVenta

        }
        res.render("notaa.hbs",{ layout:"mainpdf", orden})
    },
    
    async despdff(req,res){
        const pdf = await crearpdf("http://localhost:3500/verpdff")
        res.contentType("application/pdf")
        res.send(pdf)

    }

}