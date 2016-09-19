
function trapKeys(anEvent,nCampo,nextfield) {
    var evt = anEvent ? anEvent : window.event;
    var theKeyPressed = evt.keyCode ? evt.keyCode : evt.which ? evt.which : null;
    var sigCampo ;
    var posAct   = nextfield - 1 ;
 
   alert(theKeyPressed) ;
 
 
 
 
    if (theKeyPressed == 40  ) {
         eval('document.form2.'+ nCampo + nextfield + '.focus();');
         return true;
    }
 
    if (theKeyPressed == 38  ) {
         nextfield = nextfield - 2 ;
         eval('document.form2.'+ nCampo + nextfield + '.focus();');
         return true;
    }
 
    if (theKeyPressed == 39  ) {
 
         if (nCampo == 'empaques' ) {
             sigCampo ='unidades' ;
              nextfield = nextfield - 1 ;
         }
         if (nCampo == 'unidades' ) {
             sigCampo ='empaques' ;
 
         }
 
         eval('document.form2.'+ sigCampo + nextfield + '.focus();');
         return true;
    }
 
    if (theKeyPressed == 37  ) {
         if (nCampo == 'empaques' ) {
             sigCampo ='unidades' ;
             nextfield = nextfield - 2 ;
         }
          if (nCampo == 'unidades' ) {
             sigCampo ='empaques' ;
             nextfield = nextfield - 1 ;
         }
 
         eval('document.form2.'+ sigCampo + nextfield + '.focus();');
         return true;
    }
 
if(theKeyPressed == 16 || theKeyPressed == 9  || theKeyPressed == 8   ){
       return  true;
}
 
 
if(theKeyPressed == 190 || theKeyPressed == 110  || theKeyPressed == 46   ){
       return  true;
}
 
 
 
if(theKeyPressed > 95 && theKeyPressed < 108){
       return  true;
}
if(theKeyPressed > 45 && theKeyPressed < 58){
       return  true;
}
 
 nextfield -- ;
 
 alert("S�lo digite numeros") ;
 
eval('document.form2.'+nCampo+nextfield+'.value=document.form2.'+nCampo+nextfield+'.value.substr(0,document.form2.'+nCampo+nextfield+'.value.length-1);' );
 
 eval('document.form1.'+nCampo+nextfield+'.value=0 ;');
 return false ;
 
}  // fin de la funcion 


function busqueda(search)
  {		  
	//alert('search ='+search.value);
  		  //var idCombo = search.id.substring(0, search.id.length - 12);
  		  
  		  var indiceI = search.id.indexOf("txtBusqueda");
  		  var indiceF = search.id.indexOf("txtBusqueda")+"txtBusqueda".length;
  		  var idCombo2 = search.id.substring(0, indiceI);
  		
  		  var idPosfijo = search.id.substring(indiceF, search.id.length);
  		  
  		  //alert('idcom1 ='+idCombo);
  		  //idCombo = idCombo + ":valorCampoComboTablaBusqueda";
  		  idCombo2 = idCombo2 +"valorCampoComboTablaBusqueda"+idPosfijo;
  		//alert('idcom ='+idCombo);
  		//alert('idcom2 ='+idCombo2);
	      var field = document.getElementById(idCombo2);
	      var fieldAux = document.getElementById(idCombo2);
          //var pattern;
          //var ninguna;
   
          //ninguna = -1;
   
          if (search.value == "")
          {
                  field.options.selectedIndex = 0;
                  for(var i=0; i<field.options.length; i++){
         		      field.options[i].disabled=false;
                  }
                  return;
          }
          //Use "i" to make search not case-sensitive
          //pattern = new RegExp(search.value, "gi");
          
          var valoresAux = new Array();
          var textoAux = new Array();
          
          var valoresAux2 = new Array();
          var textoAux2 = new Array();
          
          var contador = 0;
          field.remove(0); 
          
          var laOpcion;
          var laOpcion1;
          var elValor;
          var valorBusqueda = search.value;
          valorBusqueda = valorBusqueda.toUpperCase();
          
          
        	  
          
          //Llena los arreglos con las opciones que tengan la coincidencia de caracteres.
     		for(var i=0; i<field.options.length; i++)  {
     			  laOpcion = field.options[i].text;
     			  laOpcion1 = laOpcion;
     			  elValor = field.options[i].value;
     			  laOpcion = laOpcion.toUpperCase();
     			
           if(laOpcion.indexOf(valorBusqueda)  > -1){
           	 valoresAux[contador] = elValor;
           	 textoAux[contador] = laOpcion1;
           	 contador ++;       	 
           }
          }
//____________________________________________________________________________________________
     	  //Se eliminan las opciones que s� coinciden del selec principal.
          for(var l=0; l< fieldAux.options.length; l++)  {
          	 laOpcion = field.options[l].text;
     			 laOpcion = laOpcion.toUpperCase();
     			
              if(laOpcion.indexOf(valorBusqueda)  > -1){
           	     fieldAux.remove(l);
           	     l--;
              }	   
          }
//_____________________________________________________________________________________________________
        //Se llena otro arreglo con las restantes de opciones, las que no coinciden.
          for(i=0; i<fieldAux.options.length; i++)  {
           valoresAux2[i] = fieldAux.options[i].value;
           textoAux2[i] = fieldAux.options[i].text;
          }
//_____________________________________________________________________________________________________
          
        //Se pone en "null" el select principal y se empieza rellenar con los datos en orden.
          field.innerHTML = "";
          var option = document.createElement("option");
          option.text ="-- Seleccione --"; 
          option.value =-1;
          field.add(option);
        //Se agregan las opciones que coinciden.
          for(var j=0; j< valoresAux.length; j++)  {
               var option = document.createElement("option");
               option.text =textoAux[j];
               option.value =valoresAux[j];
               field.add(option);
          }
          
        //Se agregan las opciones que no coinciden.
          for(var k=0; k< textoAux2.length; k++)  {
               var option = document.createElement("option");
               option.text =textoAux2[k];
               option.value =valoresAux2[k];
               option.disabled = true;
               field.add(option);
          }
          field.options[1].selected = true;
          //field.onchage();

         /*
          for(var x=1; x < field.options.length; x++)
          {
                  if (field.options[x].text == search.value)
                  {
                          field.options[x].selected = true;
                          ninguna = 1;
                          break;
                  }else{
                          if (pattern.test(field.options[x].text) == true){
                                  field.options[x].selected = true;
                                  ninguna = 1;
                                  break;
                          }
                  }
          }
          if(ninguna == -1){
                  field.options[0].selected = true;
          }
          
          */
   
  }

function busquedaDetalle(search)
{		  
		var txtBusqueda = search.id;
		var idCombo = txtBusqueda.replace("txtBusquedaDetalle","valorCampoComboTablaBusquedaDetalle");
	    var field = document.getElementById(idCombo);
        var pattern;
        var ninguna;
 
        ninguna = -1;
 
        if (search.value == "")
        {
                field.options.selectedIndex = 0;
                return;
        }
        //Use "i" to make search not case-sensitive
        pattern = new RegExp(search.value, "gi");
 
        for(var x=0; x < field.options.length; x++)
        {
                if (field.options[x].text == search.value)
                {
                        field.options[x].selected = true;
                        ninguna = 1;
                        break;
                }else{
                        if (pattern.test(field.options[x].text) == true){
                                field.options[x].selected = true;
                                ninguna = 1;
                                break;
                        }
                }
        }
        if(ninguna == -1){
                field.options[0].selected = true;
        }
 
}

  function limpiarBusquedas(){

		var inputs = document.getElementsByTagName("input"), span = Array(), textnode, option, active;
		for(a = 0; a < inputs.length; a++) {
			if((inputs[a].type == "text")) {	  
				var partes = inputs[a].id.split(":");
				var ultimaParte = partes[partes.length - 1];
				if(ultimaParte == "txtBusqueda"){
					inputs[a].value = "";
				}
				if(ultimaParte == "txtBusquedaDetalle"){
					inputs[a].value = "";
				}				
			}
		}
	  
  }  


function mascaraCheckSoloNumerosDecimales(evt, campo) {

    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode	
	
    if (charCode != 37 && charCode != 39 && charCode != 8) {	
    	var posCursor = doGetCaretPosition(campo);
    	
		var posPunto = 0;
		for (i = 0;i <= campo.value.length;i++){
			if(campo.value.charAt(i) == '.')
				i = campo.value.length + 1;
			else
				posPunto = posPunto + 1;
		}	
    	
	    var txt = "";
		for (i = 0;i <= campo.value.length;i++){
			if(campo.value.charAt(i) != ',')
				txt += campo.value.charAt(i);
		}
		campo.value = txt;   
		
		var campoHidden = campo.id.replace("valorCampoNumeroDecimalMascaraConComas", "hiddenFieldCantidadDecimales");
		//window.alert(campoHidden);
		var cantidadDecimales = document.getElementById(campoHidden).value;
		
		var format = '###,###.';		
		for (var i = 0;i < cantidadDecimales;i++){
			format = format + '#';
		}
			
	    campo.value = new Number(campo.value).numberFormat(format);
	    //alert(posCursor +  ' y ' + posPunto);
	    //if(posCursor <= posPunto)
	    	//setCaretPosition(campo, campo.value.length - (cantidadDecimales + 1));
    }

}

function mascaraCheckSoloNumeros(evt, campo) {

    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode	

    if (charCode != 37 && charCode != 39) {	
	    var txt = "";
		for (i = 0;i <= campo.value.length;i++){
			if(campo.value.charAt(i) != ',')
				txt += campo.value.charAt(i);
		}
		campo.value = txt;    		
	    		
	    campo.value = new Number(campo.value).numberFormat('###,###');
    }

}

function setCaretPosition(ctrl, pos){
	var tam = ctrl.length;
	if(ctrl.setSelectionRange)
	{
		ctrl.focus();
		ctrl.setSelectionRange(pos,pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

function doGetCaretPosition (ctrl) {
	var CaretPos = 0;	// IE Support
	if (document.selection) {
	ctrl.focus ();
		var Sel = document.selection.createRange ();
		Sel.moveStart ('character', -ctrl.value.length);
		CaretPos = Sel.text.length;
	}
	// Firefox support
	else if (ctrl.selectionStart || ctrl.selectionStart == '0')
		CaretPos = ctrl.selectionStart;
	//alert(CaretPos);
	return CaretPos;
}

function checkIt(evt, campo) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	if(charCode == 45 || charCode == 37 || charCode == 39){
	    if(charCode == 45){
		var texto = campo.value;
		var primerKey = texto.substring(0,1);			
		if(primerKey == "-"){
			campo.value = texto.substring(1,texto.length);
		        return false
		}else{
			campo.value = "-" + texto;
		        return false
		}
	    }
	    status = ""
	    return true
	}else{
  	   status = "This field accepts numbers only."
           return false
	}
       
    }
    status = ""
    return true
}


function checkSoloNumeros(evt, campo) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	if(charCode == 45 || charCode == 37 || charCode == 39){
	    if(charCode == 45){
		var texto = campo.value;
		var primerKey = texto.substring(0,1);			
		if(primerKey == "-"){
			campo.value = texto.substring(1,texto.length);
		        return false
		}else{
			campo.value = "-" + texto;
		        return false
		}
	    }
	    status = ""
	    return true
	}else{
  	   status = "This field accepts numbers only."
           return false
	}
       
    }
    status = ""
    return true
}

function checkSoloNumerosDecimales(evt, campo) {
    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	if(charCode == 45 || charCode == 46 || charCode == 37 || charCode == 39){
	    if(charCode == 45){
		var texto = campo.value;
		var primerKey = texto.substring(0,1);			
		if(primerKey == "-"){
			campo.value = texto.substring(1,texto.length);
		        return false
		}else{
			campo.value = "-" + texto;
		        return false
		}
	    }else{
	    	if(charCode == 46){
	    		texto = campo.value;	    		
	    		var index = texto.indexOf('.');
	    		if(index > -1){
	    			partes = texto.split('.');
	    			campo.value = partes[0] + "." + partes[1];
	    			return false;
	    		}else{
	    			if(texto.length == 0){
	    				campo.value = "";
	    				return false;
	    			}
	    		}
	    	}
	    }
	    status = ""
	    return true
	}else{
  	   status = "This field accepts numbers only."
           return false
	}
       
    }
    status = ""
    return true
}

function alfanumerico(evt){
	evt = (evt) ? evt : window.event;
	var tecla = (evt.which) ? evt.which : evt.keyCode;
	if(tecla == 95 || tecla == 127 || tecla == 8 || tecla == 37 || tecla == 39 || tecla == 9){
		return true;
	}
	if(65<=tecla && tecla<=90 || 97<=tecla && tecla<=122 || 48<=tecla && tecla<=57){
		return true;
	}
	else{
	      return false;
	   }
}

//JavaScript Document
//Fecha en espa�ol
function spanishDate(d){
	var weekday=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
	var monthname=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	return d.getDate()+" "+monthname[d.getMonth()]+" "+d.getFullYear();
	//return weekday[d.getDay()]+" "+d.getDate()+" de "+monthname[d.getMonth()]+" de "+d.getFullYear();
}
/*Ejemplo uso
<script type="text/javascript">
var d = new Date()
document.write(spanishDate(d));
</script>
//Resultado Miercoles 14 de Abril de 2010 
*/

Number.formatFunctions = {count:0};

//Constants useful for controlling the format of numbers in special cases.
Number.prototype.NaN         = 'NaN';
Number.prototype.posInfinity = 'Infinity';
Number.prototype.negInfinity = '-Infinity';

Number.prototype.numberFormat = function(format, context) {
if (isNaN(this) ) {
   return Number.prototype.NaNstring;
}
else if (this == +Infinity ) {
   return Number.prototype.posInfinity;
}
else if ( this == -Infinity) {
   return Number.prototype.negInfinity;
}
else if (Number.formatFunctions[format] == null) {
   Number.createNewFormat(format);
}
return this[Number.formatFunctions[format]](context);
}

Number.createNewFormat = function(format) {
var funcName = "format" + Number.formatFunctions.count++;
Number.formatFunctions[format] = funcName;
var code = "Number.prototype." + funcName + " = function(context){\n";

// Decide whether the function is a terminal or a pos/neg/zero function
var formats = format.split(";");
switch (formats.length) {
   case 1:
       code += Number.createTerminalFormat(format);
       break;
   case 2:
       code += "return (this < 0) ? this.numberFormat(\""
           + String.escape(formats[1])
           + "\", 1) : this.numberFormat(\""
           + String.escape(formats[0])
           + "\", 2);";
       break;
   case 3:
       code += "return (this < 0) ? this.numberFormat(\""
           + String.escape(formats[1])
           + "\", 1) : ((this == 0) ? this.numberFormat(\""
           + String.escape(formats[2])
           + "\", 2) : this.numberFormat(\""
           + String.escape(formats[0])
           + "\", 3));";
       break;
   default:
       code += "throw 'Too many semicolons in format string';";
       break;
}
eval(code + "}");
}

Number.createTerminalFormat = function(format) {
// If there is no work to do, just return the literal value
if (format.length > 0 && format.search(/[0#?]/) == -1) {
   return "return '" + String.escape(format) + "';\n";
}
// Negative values are always displayed without a minus sign when section separators are used.
var code = "var val = (context == null) ? new Number(this) : Math.abs(this);\n";
var thousands = false;
var lodp = format;
var rodp = "";
var ldigits = 0;
var rdigits = 0;
var scidigits = 0;
var scishowsign = false;
var sciletter = "";
// Look for (and remove) scientific notation instructions, which can be anywhere
m = format.match(/\..*(e)([+-]?)(0+)/i);
if (m) {
   sciletter = m[1];
   scishowsign = (m[2] == "+");
   scidigits = m[3].length;
   format = format.replace(/(e)([+-]?)(0+)/i, "");
}
// Split around the decimal point
var m = format.match(/^([^.]*)\.(.*)$/);
if (m) {
   lodp = m[1].replace(/\./g, "");
   rodp = m[2].replace(/\./g, "");
}
// Look for %
if (format.indexOf('%') >= 0) {
   code += "val *= 100;\n";
}
// Look for comma-scaling to the left of the decimal point
m = lodp.match(/(,+)(?:$|[^0#?,])/);
if (m) {
   code += "val /= " + Math.pow(1000, m[1].length) + "\n;";
}
// Look for comma-separators
if (lodp.search(/[0#?],[0#?]/) >= 0) {
   thousands = true;
}
// Nuke any extraneous commas
if ((m) || thousands) {
   lodp = lodp.replace(/,/g, "");
}
// Figure out how many digits to the l/r of the decimal place
m = lodp.match(/0[0#?]*/);
if (m) {
   ldigits = m[0].length;
}
m = rodp.match(/[0#?]*/);
if (m) {
   rdigits = m[0].length;
}
// Scientific notation takes precedence over rounding etc
if (scidigits > 0) {
   code += "var sci = Number.toScientific(val,"
       + ldigits + ", " + rdigits + ", " + scidigits + ", " + scishowsign + ");\n"
       + "var arr = [sci.l, sci.r];\n";
}
else {
   // If there is no decimal point, round to nearest integer, AWAY from zero
   if (format.indexOf('.') < 0) {
       code += "val = (val > 0) ? Math.ceil(val) : Math.floor(val);\n";
   }
   // Numbers are rounded to the correct number of digits to the right of the decimal
   code += "var arr = val.round(" + rdigits + ").toFixed(" + rdigits + ").split('.');\n";
   // There are at least "ldigits" digits to the left of the decimal, so add zeros if needed.
   code += "arr[0] = (val < 0 ? '-' : '') + String.leftPad((val < 0 ? arr[0].substring(1) : arr[0]), "
       + ldigits + ", '0');\n";
}
// Add thousands separators
if (thousands) {
   code += "arr[0] = Number.addSeparators(arr[0]);\n";
}
// Insert the digits into the formatting string.  On the LHS, extra digits are copied
// into the result.  On the RHS, rounding has chopped them off.
code += "arr[0] = Number.injectIntoFormat(arr[0].reverse(), '"
   + String.escape(lodp.reverse()) + "', true).reverse();\n";
if (rdigits > 0) {
   code += "arr[1] = Number.injectIntoFormat(arr[1], '" + String.escape(rodp) + "', false);\n";
}
if (scidigits > 0) {
   code += "arr[1] = arr[1].replace(/(\\d{" + rdigits + "})/, '$1" + sciletter + "' + sci.s);\n";
}
return code + "return arr.join('.');\n";
}

Number.toScientific = function(val, ldigits, rdigits, scidigits, showsign) {
var result = {l:"", r:"", s:""};
var ex = "";
// Make ldigits + rdigits significant figures
var before = Math.abs(val).toFixed(ldigits + rdigits + 1).trim('0');
// Move the decimal point to the right of all digits we want to keep,
// and round the resulting value off
var after = Math.round(new Number(before.replace(".", "").replace(
   new RegExp("(\\d{" + (ldigits + rdigits) + "})(.*)"), "$1.$2"))).toFixed(0);
// Place the decimal point in the new string
if (after.length >= ldigits) {
   after = after.substring(0, ldigits) + "." + after.substring(ldigits);
}
else {
   after += '.';
}
// Find how much the decimal point moved.  This is #places to LODP in the original
// number, minus the #places in the new number.  There are no left-padded zeroes in
// the new number, so the calculation for it is simpler than for the old number.
result.s = (before.indexOf(".") - before.search(/[1-9]/)) - after.indexOf(".");
// The exponent is off by 1 when it gets moved to the left.
if (result.s < 0) {
   result.s++;
}
// Split the value around the decimal point and pad the parts appropriately.
result.l = (val < 0 ? '-' : '') + String.leftPad(after.substring(0, after.indexOf(".")), ldigits, "0");
result.r = after.substring(after.indexOf(".") + 1);
if (result.s < 0) {
   ex = "-";
}
else if (showsign) {
   ex = "+";
}
result.s = ex + String.leftPad(Math.abs(result.s).toFixed(0), scidigits, "0");
return result;
}

Number.prototype.round = function(decimals) {
if (decimals > 0) {
   var m = this.toFixed(decimals + 1).match(
       new RegExp("(-?\\d*)\.(\\d{" + decimals + "})(\\d)\\d*$"));
   if (m && m.length) {
       return new Number(m[1] + "." + String.leftPad(Math.round(m[2] + "." + m[3]), decimals, "0"));
   }
}
return this;
}

Number.injectIntoFormat = function(val, format, stuffExtras) {
var i = 0;
var j = 0;
var result = "";
var revneg = val.charAt(val.length - 1) == '-';
if ( revneg ) {
  val = val.substring(0, val.length - 1);
}
while (i < format.length && j < val.length && format.substring(i).search(/[0#?]/) >= 0) {
   if (format.charAt(i).match(/[0#?]/)) {
       // It's a formatting character; copy the corresponding character
       // in the value to the result
       if (val.charAt(j) != '-') {
           result += val.charAt(j);
       }
       else {
           result += "0";
       }
       j++;
   }
   else {
       result += format.charAt(i);
   }
   ++i;
}
if ( revneg && j == val.length ) {
   result += '-';
}
if (j < val.length) {
   if (stuffExtras) {
       result += val.substring(j);
   }
   if ( revneg ) {
        result += '-';
   }
}
if (i < format.length) {
   result += format.substring(i);
}
return result.replace(/#/g, "").replace(/\?/g, " ");
}

Number.addSeparators = function(val) {
return val.reverse().replace(/(\d{3})/g, "$1,").reverse().replace(/^(-)?,/, "$1");
}

String.prototype.reverse = function() {
var res = "";
for (var i = this.length; i > 0; --i) {
   res += this.charAt(i - 1);
}
return res;
}

String.prototype.trim = function(ch) {
if (!ch) ch = ' ';
return this.replace(new RegExp("^" + ch + "+|" + ch + "+$", "g"), "");
}

String.leftPad = function (val, size, ch) {
var result = new String(val);
if (ch == null) {
   ch = " ";
}
while (result.length < size) {
   result = ch + result;
}
return result;
}

String.escape = function(string) {
return string.replace(/('|\\)/g, "\\$1");
}

function currencyFormat(fld, milSep, decSep, e) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;  // Enter
    if (whichCode == 8) return true;  // DELETE
    if (whichCode == 127) return true;  // DELETE
    if (whichCode == 9) return true;  // TAB
     
    key = String.fromCharCode(whichCode);  // Get key value from key code
    if (strCheck.indexOf(key) == -1) return false;  // Not a valid key
    len = fld.value.length;
    for(i = 0; i < len; i++)
    if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for(; i < len; i++)
    if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0'+ decSep + '0' + aux;
    if (len == 2) fld.value = '0'+ decSep + aux;
    if (len > 2) {
    aux2 = '';
    for (j = 0, i = len - 3; i >= 0; i--) {
    if (j == 3) {
    aux2 += milSep;
    j = 0;
    }
    aux2 += aux.charAt(i);
    j++;
    }
    fld.value = '';
    len2 = aux2.length;
    for (i = len2 - 1; i >= 0; i--)
    fld.value += aux2.charAt(i);
    fld.value += decSep + aux.substr(len - 2, len);
    }
    return false;
}

function currencyFormatDecimalesVariables(fld, milSep, decSep, e, replaceName) {
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return true;  // Enter
    if (whichCode == 8) return true;  // DELETE
    if (whichCode == 127) return true;  // DELETE
    if (whichCode == 9) return true;  // TAB
     
    key = String.fromCharCode(whichCode);  // Get key value from key code    
    if (strCheck.indexOf(key) == -1) return false;  // Not a valid key, is not a number
    //window.alert('valor  ' +  strCheck.indexOf(key));
    len = fld.value.length;
    for(i = 0; i < len; i++)
    if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for(; i < len; i++)
    if (strCheck.indexOf(fld.value.charAt(i))!=-1) aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    
    var idDelCampo = fld.id;
    var campoHidden = idDelCampo.replace(replaceName, "hiddenFieldCantidadDecimales");
	var cantidadDecimales = document.getElementById(campoHidden).value;
	//window.alert(idDelCampo);
	var completa = '';
	for(y = len; y < cantidadDecimales; y++){
		completa = completa + '0';
	}
	
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0'+ decSep + completa + aux;
    if (len == 2) fld.value = '0'+ decSep + completa + aux;
    if (len == 3) fld.value = '0'+ decSep + completa + aux;
    if (len == 4) fld.value = '0'+ decSep + completa + aux;
    if (len == 5) fld.value = '0'+ decSep + completa + aux;
    if (len == 6) fld.value = '0'+ decSep + completa + aux;
    if (len == 7) fld.value = '0'+ decSep + completa + aux;
    if (len == 8) fld.value = '0'+ decSep + completa + aux;    
    
    //alert(fld.value + ' ' + len + ' ' + cantidadDecimales);
    if (len > cantidadDecimales) {
    	var variable = parseInt(cantidadDecimales) + 1;
        aux2 = '';
        for (j = 0, i = len - variable; i >= 0; i--) {
        if (j == 3) {
        aux2 += milSep;
        j = 0;
        }
        aux2 += aux.charAt(i);
        j++;
        }
        fld.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        fld.value += aux2.charAt(i);
        fld.value += decSep + aux.substr(len - parseInt(cantidadDecimales), len);
    }
    return false;
	
}

function chequeo(fld, milSep, decSep, e, replaceName) {

    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789.';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return false;  // Enter
    if (whichCode == 8) return true;  // DELETE
    if (whichCode == 127) return true;  // DELETE
    if (whichCode == 9) return true;  // TAB
     
    key = String.fromCharCode(whichCode);  // Get key value from key code    
    if (strCheck.indexOf(key) == -1) return false;  // Not a valid key, is not a number or point
    if (fld.value.indexOf(key) != -1 && key == '.') return false;  // Not a valid key, double point is not valid
    
    
    var idDelCampo = fld.id;
    var campoHidden = idDelCampo.replace(replaceName, "hiddenFieldCantidadDecimales");
	var cantidadDecimales = document.getElementById(campoHidden).value;
	
	var campoHidden = idDelCampo.replace(replaceName, "hiddenFieldLongitudEntera");
	var longitudEntera = document.getElementById(campoHidden).value;
    
    var valorTotal = fld.value;
    var partes = valorTotal.split(".");
    var parteEntera = partes[0];
    var parteDecimal = "";
    
    if(partes.length == 1){//si solo hay parte entera
    
	    if(partes.length > 1){
	    	parteDecimal = partes[1];
	    }
	    
	    //alert("entera: " + parteEntera + " decimal: " + parteDecimal);
	    fld.value = parteEntera;
	    
	    len = parteEntera.length;
	    
	    for(i = 0; i < len; i++){
	        if (/*(fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep) && */(parteEntera.charAt(i) != milSep))
	    		aux += fld.value.charAt(i);
	    }
	    //aux += key;
	    len = aux.length;
		
		if (partes.length > 1 && cantidadDecimales < parteDecimal.length + 1){
			fld.value = parteEntera + "." + parteDecimal;
			return false;
		}
	
		var completa = '';
		for(y = len; y < cantidadDecimales; y++){
			completa = completa + '0';
		}    
	
		var expresion = "";
		if(key != ".")
			expresion = aux + key;
		else
			expresion = aux;
			
		if (longitudEntera < expresion.length){
			if(partes.length > 1)
				fld.value = parteEntera + "." + parteDecimal;
			else
				fld.value = parteEntera;
			return false;
		}
		
		var longitudAEvaluar = aux.length;
		if(partes.length == 1){
			aux = aux + key;
		}else{
			aux = aux + parteDecimal + key;
		}
		len = aux.length;
		
	

	
		
	    if (longitudAEvaluar % 3 == 0) {
	        aux2 = '';
	        /*for (j = 0, i = 0; i < len; i++) {    
	        	//alert(len);
		        if (j == 3 && (key != '.' || i + 1 < len)) {
			        aux2 += milSep;
			        j = 0;
		        }
		        aux2 += aux.charAt(i);
		        j++;
	        }*/
	        fld.value = '';
	        aux2 = aux;
	        aux2 = aux2.substring(0, aux2.length - 1);
	        if(partes.length == 1){
	    		fld.value = aux2;
	    	}else{
	    		fld.value = aux2 + "." + parteDecimal;
	    	}
	    }else{
	    	if(partes.length == 1){
	    		aux = aux.substring(0, aux.length - 1);
	    		fld.value = parteEntera;
	    	}else{
	    		//parteDecimal = parteDecimal.substring(0, parteDecimal.length - 1);
	    		fld.value = parteEntera + "." + parteDecimal;
	    	}
	    }

    }else{// el numero ya tiene decimales
	    parteDecimal = partes[1];
		if (cantidadDecimales < parteDecimal.length + 1){
			fld.value = parteEntera + "." + parteDecimal;
			return false;
		}
    }
    return true;
    
}

function formatearCampo(campo){
	contador = 0;
	resultado = "";
	for (i = campo.length - 1; i >= 0 ; i--) {
		if(contador == 3){
			resultado = campo.charAt(i) + "," + resultado;
			contador = 1;
		}else{
			resultado = campo.charAt(i) + resultado;
			contador = contador + 1;
		}
	}
	return resultado;
}

function mascaraChequeo(evt, campo) {


    evt = (evt) ? evt : window.event
    var charCode = (evt.which) ? evt.which : evt.keyCode	

    if (charCode != 37 && charCode != 39) {
    	
        var valorTotal = campo.value;
        var partes = valorTotal.split(".");
        var parteEntera = partes[0];
        var parteDecimal = "";
	    if(partes.length > 1){
	    	parteDecimal = partes[1];
	    }
    	
	    var txt = "";
		for (i = 0;i <= campo.value.length;i++){
			if(campo.value.charAt(i) != ',')
				txt += campo.value.charAt(i);
		}
		campo.value = txt;
		
		nuevaParteEntera = "";
		for (i = 0;i <= txt.length;i++){
			if(txt.charAt(i) != '.'){
				nuevaParteEntera += txt.charAt(i);
			}else{
				i = txt.length + 1;
			}
		}
	    		
	    nuevaParteEntera = new Number(nuevaParteEntera).numberFormat('###,###');
	    campo.value = (partes.length > 1 ? nuevaParteEntera + "." + parteDecimal : nuevaParteEntera);
	    
	    var whichCode = (window.Event) ? evt.which : evt.keyCode;
	    if ((whichCode == 127 || whichCode == 8) && campo.value == "0"){campo.value = "";}
	    
    }

}



function chequeoEntero(fld, milSep, decSep, e, replaceName) {

    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;
    if (whichCode == 13) return false;  // Enter
    if (whichCode == 8) return true;  // DELETE
    if (whichCode == 127) return true;  // DELETE
    if (whichCode == 9) return true;  // TAB
     
    key = String.fromCharCode(whichCode);  // Get key value from key code    
    if (strCheck.indexOf(key) == -1) return false;  // Not a valid key, is not a number or point
    //if (fld.value.indexOf(key) != -1 && key == '.') return false;  // Not a valid key, double point is not valid
    
    
    var idDelCampo = fld.id;
    //var campoHidden = idDelCampo.replace(replaceName, "hiddenFieldCantidadDecimales");
	//var cantidadDecimales = document.getElementById(campoHidden).value;
	
	var campoHidden = idDelCampo.replace(replaceName, "hiddenFieldLongitudEntera");
	var longitudEntera = document.getElementById(campoHidden).value;
    
	
    var valorTotal = fld.value;
    var partes = valorTotal.split(".");
    var parteEntera = partes[0];
    var parteDecimal = "";
    if(partes.length == 1){//si solo hay parte entera
    
	    if(partes.length > 1){
	    	parteDecimal = partes[1];
	    }
	    
	    fld.value = parteEntera;
	    
	    len = parteEntera.length;
	    
	    for(i = 0; i < len; i++){
	        if (/*(fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep) && */(parteEntera.charAt(i) != milSep))
	    		aux += fld.value.charAt(i);
	    }
	    //aux += key;
	    len = aux.length;		
	  
		var expresion = "";
		if(key != ".")
			expresion = aux + key;
		else
			expresion = aux;
			
		if (longitudEntera < expresion.length){
			if(partes.length > 1)
				fld.value = parteEntera + "." + parteDecimal;
			else
				fld.value = parteEntera;
			return false;
		}
		
		var longitudAEvaluar = aux.length;
		if(partes.length == 1){
			aux = aux + key;
		}else{
			aux = aux + parteDecimal + key;
		}
		len = aux.length;

		//alert("3");
	    if (longitudAEvaluar % 3 == 0) {
	        aux2 = '';
	        fld.value = '';
	        aux2 = aux;
	        aux2 = aux2.substring(0, aux2.length - 1);
	        if(partes.length == 1){
	    		fld.value = aux2;
	    	}else{
	    		fld.value = aux2 + "." + parteDecimal;
	    	}
	    }else{
	    	if(partes.length == 1){
	    		aux = aux.substring(0, aux.length - 1);
	    		fld.value = parteEntera;
	    	}else{
	    		//parteDecimal = parteDecimal.substring(0, parteDecimal.length - 1);
	    		fld.value = parteEntera + "." + parteDecimal;
	    	}
	    }

    }
    return true;
    
}