
//Este me convencio mas
import * as GastosGen from "./gestionPresupuesto.js";
import * as GastosGenWeb from "./gestionPresupuestoWeb.js";

GastosGen.actualizarPresupuesto(1500);
GastosGenWeb.mostrarDatoEnId("presupuesto",GastosGen.mostrarPresupuesto());

 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Compra carne",23.44, "2021-10-06", "casa", "comida"));
 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
 GastosGen.anyadirGasto(new GastosGen.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

GastosGenWeb.mostrarDatoEnId("gastos-totales", GastosGen.calcularTotalGastos());
GastosGenWeb.mostrarDatoEnId("balance-total",GastosGen.calcularBalance());

//Listado de Gastos
GastosGenWeb.mostrarGastoWeb("listado-gastos-completo", GastosGen.listarGastos())

//Listado de gastos filtrados
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-1",GastosGen.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-2",GastosGen.filtrarGastos({valorMinimo:50}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-3",GastosGen.filtrarGastos({valorMinimo: 200, etiquetasTiene:["seguros"]}))
GastosGenWeb.mostrarGastoWeb("listado-gastos-filtrado-4", GastosGen.filtrarGastos({valorMaximo: 50, etiquetasTiene:["comida","transporte"]}));
//Listado de gastos por año,mes,dia

let gastoAgrupado1 = GastosGen.agruparGastos("dia")
GastosGenWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastoAgrupado1,"día")

//=============================
let gastoAgrupado2 = GastosGen.agruparGastos("mes")
GastosGenWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastoAgrupado2,"mes")
//=============================
let gastoAgrupado3 = GastosGen.agruparGastos("anyo")

GastosGenWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastoAgrupado3,"año")