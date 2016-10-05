////////////////////////////
// Orden de Servicio Logic
////////////////////////////

var canvas,ctx;
var hasValidationError = false;
var marks = [];
var seCreoLaOrden = false;
var searchComboOptions = {};


$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
			.exec(window.location.href);
	if (results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
}


/////////////////////////////////////////////////////////////////////////////////////////////
//

	$(document).ready(function(e) {
		
		//dialogPageLoad();

		genForm();
		
		init();
	
	});
	
//
/////////////////////////////////////////////////////////////////////////////////////////////
	
///////////////////////
// UIFORM
///////////////////////	
	function genForm(){
		
		table = $("#table-form");
		fields =  $("#field-list");
		


		$.each( $('#field-list'), function(i, list) {
		   $('div', list).each(function(k,v) {
			   id = v.attributes["id"];
			   label =  v.attributes["label"]; 
			   if(!label) return;
			   type  =  v.attributes["type"];
			   //--------------------
			   required = v.attributes["required"];
			   if(required){
				   reqchar = '*';
			   }else{
				   reqchar = '';
			   }
			   //--------------------
			   maxlength =  v.attributes["max-length"];
			   var xmaxlength='';
			   if(maxlength){
				   xmaxlength=' maxlength="'+maxlength.value+'" ';
			   }
			   //--------------------
			   size =  v.attributes["size"];
			   xsize=' style=" width:200px;" ';
			   if(size){
				   xsize=' style=" width:'+size.value+'px;" ';
			   }
			   //--------------------
			   useclass =  v.attributes["use-class"];
			   xclass='';
			   if(useclass){
				   xclass=' class="'+useclass.value+'" ';
			   }
			   
			   if(typeof(type) !== "undefined" && type != null && "search-combo" == type.value){
                   model  =  v.attributes["model"];
                   if(model){
                     options = getOptions(model.value, id.value+'-input');
                   }else{
                       options = "";
                   }
                   onchange  =  v.attributes["on-change"];
                   
                   if(onchange){
                       table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><div class=\"ui-widget\"><input id='"+id.value+"-search-text' onkeyup=\"searchOptions(this,'"+id.value+"-input');\"><select class=\"combobox\" id=\""+id.value+"-input\" onchange=\""+onchange.value+"\">"+options+"</select></div></td></tr>");
                   }else{
                       table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><div class=\"ui-widget\"><input id='"+id.value+"-search-text' onkeyup=\"searchOptions(this,'"+id.value+"-input');\"><select class=\"combobox\" id=\""+id.value+"-input\" >"+options+"</select></div></td></tr>");
                       
                   }
                   onchange="myFunction()";
               }else
			   if(typeof(type) !== "undefined" && type != null && "combo" == type.value){
				   model  =  v.attributes["model"];
				   if(model){
				     options = getOptions(model.value);
			       }else{
			    	   options = "";
			       }
				   onchange  =  v.attributes["on-change"];
				   
				   if(onchange){
					   table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><div class=\"ui-widget\"><select class=\"combobox\" id=\""+id.value+"-input\" onchange=\""+onchange.value+"\">"+options+"</select></div></td></tr>");
				   }else{
					   table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><div class=\"ui-widget\"><select class=\"combobox\" id=\""+id.value+"-input\" >"+options+"</select></div></td></tr>");
					   
				   }
				   onchange="myFunction()";
			   }else if(typeof(type) !== "undefined" && type != null && "textarea" == type.value){
				   cols = v.attributes["cols"];
				   rows = v.attributes["rows"];
				   table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><textarea id=\""+id.value+"-input\"  rows=\""+rows.value+"\" cols=\""+cols.value+"\" "+xmaxlength+"></textarea></td></tr>");
				  	   
			   }else{
				   if(type && type.value == 'numeric'){
					   table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><input class=\"numeric\" id=\""+id.value+"-input\" "+xmaxlength+xsize+xclass+"></td></tr>");
				   }else{
               		   table.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"+label.value+reqchar+":</td><td  class=\"odd\"><input id=\""+id.value+"-input\"  "+xmaxlength+xsize+xclass+"></td></tr>");
				   }
			   }
		   });
		})
	}
	
////////////////////
// INIT
////////////////////
	function init(){
		  $("button").click(function(){
			    $("#CrearOrdenButton").prop('disabled', true);
			    $("#errmsg").empty();
		    	var jsonform = getForm();
		    	if(!hasValidationError){
			    	$.ajaxSetup({ cache: false, async:true });
			        $.post("os.ms",
			        {
			           json: JSON.stringify(jsonform)
			        },
			        function(data,status){
			        	//alert($.urlParam('usuario'));
			        	seCreoLaOrden = false;
			        	newId = null;
			        	if(!data.startsWith("success")){
			        		showError$(data);
				               return false;
			        	}else{
			        		idx1 = data.indexOf(',');
			        		newId = data.substring(idx1+1);
			        		//uploadImage(newId);
				            //alert("SE CREO LA ORDEN DE SERVICIO NO.: " + newId);
			        		if(data.startsWith("success") && "success" == status){
			        		       //getPdf(newId);
                              //location.reload();
                              seCreoLaOrden=true;
		                    }     
				            
				           confirm(newId);
			        		
			        	}
			        	
			           
			        });
		    	}
		    	 
		    	$("#CrearOrdenButton").prop('disabled', false);
		    	 
		    });
		
		
		  $(".numeric").keypress(function (e) {
			     //if the letter is not digit then display error and don't type anything
			     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			            return false;
			    }
		   });
		  
		  paintImage();
		  
		  $('#myCanvas').mousedown(function (e) {
		        mousePressed = true;
		        Draw(e.pageX - $(this).offset().left -5 , e.pageY - $(this).offset().top - 5, false);
		    });
		
		  $( ".datepicker" ).datepicker({
		      showOn: "button",
		      buttonImage: "images/calendar.gif",
		      buttonImageOnly: true,
		      buttonText: "[Selecione Fechase]",
		      dateFormat: 'dd/mm/yy'
		    });
		  
		 // closeDialogPageLoad();
	}
	
///////////////////////
// FORM 
///////////////////////
	
	function getForm(){
		hasValidationError = false;
		$("#error-div").hide();
		form = {
				telefono: valueOf('telefono',true),
				fabricante: valueOf('fabricante',true),
				modelo: valueOf('modelo',true),
				serie: valueOf('serie',true), 
				nombre: valueOf('nombre',true), 
				email: valueOf('email'),  
				telefonoPersona: valueOf('telefonoPersona',true),
				direccion: valueOf('direccion',true), 
				clienteTieneFactura: valueOf('clienteTieneFactura',true), 
				falla1: valueOf('falla1',true), 
				falla2: valueOf('falla2'),  
				falla3: valueOf('falla3'),  
				falla4: valueOf('falla4'),  
				comentario: valueOf('comentario',true), 
				garantia: valueOf('garantia',true), 
				fabricanteTelefonoPrestado: valueOf('fabricanteTelefonoPrestado',false,-1), 
				modeloTelefonoPrestado: valueOf('modeloTelefonoPrestado',false,-1),  
				serieTelefonoPrestado: valueOf('serieTelefonoPrestado'),
				facturaNota: valueOf('facturaNota'), 
				fechaFactura: valueOf('fechaFactura'), 
				detalleAccesorios: getDetalleAccesorios(),
				imagen: getImageData(),
				usuario: $.urlParam('usuario')
				
		};
		
		if(!form.modeloTelefonoPrestado){
			form.modeloTelefonoPrestado=-1;
		}
		
		
		
		if(!hasValidationError 
				&& ((form.fabricanteTelefonoPrestado==-1 && (form.modeloTelefonoPrestado>-1 || !isEmpty(form.serieTelefonoPrestado)))
				||  (form.fabricanteTelefonoPrestado> -1 && (form.modeloTelefonoPrestado==-1 || isEmpty(form.serieTelefonoPrestado)))
						)		){
			showError("DEBE COMPLETAR EL FABRICANTE, MODELO E IMEI PARA UN TELEFONO PRESTADO");
		}else
		if(!hasValidationError 
				&& (form.clienteTieneFactura==0 && (!isEmpty(form.facturaNota) || !isEmpty(form.fechaFactura)))
				){
			showError("NUMERO DE FACTURA Y FECHA NO APLICAN PARA ESTE CASO");
		}else
		if(!hasValidationError && form.clienteTieneFactura==1 && isEmpty(form.facturaNota)){
			showError("Digite <b>FACTURA / NOTA DE VENTA</b>");
		}else	
		if(!hasValidationError && form.clienteTieneFactura==1 && isEmpty(form.fechaFactura)){
			showError("Digite <b>FECHA DE FACTURA</b>");
		}
		
		if(!hasValidationError){
			if(!form.fechaFactura){
				form.fechaFactura = '01/01/1900';
			}else{
				dd= form.fechaFactura.substring(0,2);
				if(!isNaN(dd) && dd>31){
					showError("Formato de fecha invalido");
				}
				mm= form.fechaFactura.substring(3,5);
				if(!isNaN(mm) && (mm<1 || mm>12)){
					showError("Formato de fecha invalido");
				}
				yy= form.fechaFactura.substring(6,10);
				if(isNaN(dd) || isNaN(dd) || isNaN(dd)){
					showError("Formato de fecha invalido");
				}
			}
	   }
		
		return form;
	}
	
	function isEmpty(value){
		//return value==null || !value || value.replace(/\s/g, '').length == 0;
		if(value) return false;
		return true;
	}
	
	function valueOf(fieldName, required, defaultValue){
		
		if(hasValidationError) return;
		
		value =   $('#'+fieldName+'-input').prop('value');
		if(required && ( !value || value == -1 || value.replace(/\s/g, '').length == 0)){
			showError("El campo <b>"+$('#'+fieldName).attr('label')+"</b> es requerido");
            return false;

		}
		
		minlength= $('#'+fieldName).attr('min-length');
		if(minlength && value.replace(/\s/g, '').length > 0 && value.replace(/\s/g, '').length < minlength){
			showError("El campo <b>"+$('#'+fieldName).attr('label')+"</b> debe tener "+minlength+" caracteres minimo");
            return false;
		}
		
		if(!(value)){
		   value = defaultValue;
		}
		return value;
	}
	
	function valueOfOrDefault(fieldName, defaultValue){
		value =   $('#'+fieldName+'-input').prop('value');
		if(!value){
			return defaultValue;
		}
		return value;
	}
	

////////////////////////////////
// DETALLE ACCESORIOS
////////////////////////////////
	
	
	var rowCount=0;
	function addAccesorios(){
		
		options = getOptions('accesorios');
		
		 
		 newTR = '<tr id="tr-accesorio-row-%row%" class="detalleRow">'
			+'<td><select id="select-accesorio-%row%">'+options+'</select></td>'
			+'<td><input  id="input-descripcion-accesorio-%row%" size="50" maxlength="150"></td>'
			+'<td><img src="images/Delete.png" onclick="removeRow(%row%);"></td>'
		    +'</tr>';
		    
		 rowCount++;
		 
		 trn = newTR.replace(/%row%/g,rowCount);
		
		 table = $("#detalle-table");
			
		 table.append(trn);
		 
	}
	
	function removeRow(row){
	   // alert('remove');
		$('#select-accesorio-'+row).remove();
		$('#input-descripcion-accesorio-'+row).remove();;
		$('#tr-accesorio-row-'+row).remove();
		return false;
		//rowCount--;
	}
	
	function getDetalleAccesorios(){
		if(hasValidationError){
			//alert('detalle no se agrego; hay error de validacion');
			return;
		}
		detalles = [];
		for(r=1; r<=rowCount; r++){
			row = $('#tr-accesorio-row-'+r);
			if(row){
				sel = $('#select-accesorio-'+r).prop('value');
				des = $('#input-descripcion-accesorio-'+r).prop('value');
				if(sel==-1 && !isEmpty(des)){
						showError('Seleccione Accesorio');
			    }else if( sel>-1 ){
					detalles.push(sel);
					detalles.push(des);
				}
			}
		}
		 
		return detalles;
		
	}
	
	function showError(msg){
		$("#error-message").html(msg);
		$("#error-div").show();
		hasValidationError=true;
        return false;
	}
	
	
  
   
////////////////////////////////////////////////////////////////
// C O M B O S
////////////////////////////////////////////////////////////////
   
	function comboChange(combo, target, model){
		   // alert('combo change'+combo+':'+target+':'+model);
		   searchComboOptions[target+'-input']=null;
			$('#'+target+'-input').empty();
			searchText = $('#'+target+'-search-text');
			if(searchText){
				searchText.val('');
			}
			if(combo.value>-1){
				options = getSubOptions(model, combo.value, target+'-input');
				$('#'+target+'-input').append(options);
			}
		}
	
	function getSubOptions(modelName, id, target){
		options = '';
     
		
    	 $.ajaxSetup({ cache: true, async:false });
    	  $.get("os.ms?submodel="+modelName+"&id="+id+"&cc="+os_combo_ajax_control_timestamp, function(data, status){
    		  var obj = jQuery.parseJSON( data );
    		  
    		  
    		  aoptions = [];
              memOptionsLoaded = false;
              
              memOptions = searchComboOptions[target];
              if(memOptions){
                  memOptionsLoaded = true;
              }
    		  
    		  for(i=0; i<obj.length; i=i+2){
    			  op = '<option value="'+obj[i]+'">'+obj[i+1]+'</option>';
    			  options = options + op;
    			  if(!memOptionsLoaded){
                      aoptions.push(obj[i]);
                      aoptions.push(obj[i+1]);
                  }
    	      }
    		  if(!memOptionsLoaded){
                  searchComboOptions[target]=aoptions;
              }
    	    });
     
     return options;
	}
	
	function searchOptions(searchFor, target){
		 aoptions = searchComboOptions[target];
		 if(aoptions){
			 matches = '<option value="'+aoptions[0]+'">'+aoptions[1]+'</option>';
			 nomatches = "";
			 searchValue = searchFor.value;
			 firstMatch=true;
			 for(i=2; i<aoptions.length; i=i+2){
				 desc = aoptions[i+1];
				 if(desc.toLowerCase().indexOf(searchValue.toLowerCase())>-1){
					 if(firstMatch){
						 isselected = " selected ";
						 firstMatch = false;
					 }else{
						 isselected = "";
					 }
					  
					 matches = matches+'<option value="'+aoptions[i]+'" '+isselected +'>'+aoptions[i+1]+'</option>';	 
				 }else{
					 nomatches = nomatches+'<option value="'+aoptions[i]+'" disabled>'+aoptions[i+1]+'</option>';
				 }
                
                
			 }
			 
			 options = matches+nomatches;
			 
			 $('#'+target).html(options);
		 }
		
	}
	
	function getOptions(modelName, target){
		options = '';
		
	 
		
    	 $.ajaxSetup({ cache: true, async:false });
    	  $.get("os.ms?model="+modelName+"&cc="+os_combo_ajax_control_timestamp, function(data, status){
    		  var obj = jQuery.parseJSON( data );
    		  aoptions = [];
	   		    memOptionsLoaded = false;
	   	        
	   	        memOptions = searchComboOptions[target];
	   	        if(memOptions){
	   	            memOptionsLoaded = true;
	   	        }
    	    
    		    
    		  for(i=0; i<obj.length; i=i+2){
    			  op = '<option value="'+obj[i]+'">'+obj[i+1]+'</option>';
    			  options = options + op;
    			  if(!memOptionsLoaded){
    				  aoptions.push(obj[i]);
    				  aoptions.push(obj[i+1]);
    			  }
    	      }
    		  if(!memOptionsLoaded){
    			  searchComboOptions[target]=aoptions;
              }
    	    });
     
     return options;
	}
	
////////////////////////////////////////////////////////////////
// C A N V A S
////////////////////////////////////////////////////////////////   
   
   function getImageData(){
	  canvasServer = document.getElementById("myCanvas");
	  imageDataURL = canvasServer.toDataURL('image/png');
	  return imageDataURL;
	}
   
   function removeMark(x,y){
	    removed = false;
		
	    for(i=(marks.length-1); i>=0; i--){
			xx = marks[i][0];
			yy = marks[i][1];
			if( ( x >= xx-5 && x <= xx+10-5 ) && ( y >= yy-5 && y <= yy+10-5 ) ){
				marks.splice(i,1);
				redraw();
				removed = true;
				break;
			}
		}
		
		return removed;
		
	}
	
	function redraw(){
		paintImage();
		for(i=0; i<marks.length; i++){
			xx = marks[i][0];
			yy = marks[i][1];
		 
			drawRect(xx,yy);
		}
		
	}
	
	function paintImage(){
		  canvas=document.getElementById("myCanvas");
		     ctx=canvas.getContext("2d");
		    var img=document.getElementById("casopng");
		    ctx.drawImage(img,0,0);
		 
	}
	
	function Draw(x, y) {
	   
		if(!removeMark(x,y)){
		
			 drawRect(x,y);
      
      	 marks.push([x,y]);
      
		}
	  
	}
	
	function drawRect(x,y){
		    ctx.beginPath();
	        ctx.strokeStyle = 'red';
	        ctx.lineWidth = 2;
	        ctx.lineJoin = "round";
	        ctx.rect(x, y, 10, 10);
	        ctx.closePath();
	        ctx.stroke();
	}
	
	
////////////////////
// REPORTE
////////////////////
	
	function getPdf(id){
		//window.location.href = "reporte?orden="+id;
		$(location).attr('href', 'reporte?orden='+id)
	}
	
	
	
////////////////////////
// UTILS
////////////////////////
	
	 function dialogPageLoad(){
	       
	       $( "#dialog-page-load").dialog(
	    		 {
	             modal: true
	             }
	       );
	   
	   }
	   
	   function closeDialogPageLoad(){
		   //$('.ui-dialog-titlebar-close').click();
		   //$('#dialog-page-load').modal('toggle');
		   //$('#dialog-page-load').find('.ui-dialog-titlebar-close').click(); //.trigger('click');
		   //$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
		   $(".ui-dialog-titlebar-close").hide();
		   $("#dialog-page-load.dialog").dialog( "close" );
	   }

	   function confirm(ordenId){
			
			$('#msg-confirmacion').html("Se creo la Orden de Servicio No. "+ordenId);
			$( "#dialog-message" ).dialog({
			      modal: true,
			      buttons: {
			        Ok: function() {
			          $( this ).dialog( "close" );
			        }
			      }
			     ,
			    
			    close: function(event, ui){
			      if(seCreoLaOrden){
			    	  confirmPdf(ordenId);
			    	  getPdf(ordenId);
			    	  
			      }
			    }
			});
		
		}
		
	   function confirmPdf(ordenId){
	        
	        $( "#dialog-message-pdf" ).dialog({
	              modal: true,
	              buttons: {
	                Ok: function() {
	                  $( this ).dialog( "close" );
	                }
	              }
	        });
	    
	    }
	   
		
		

		/**
		function updateFormEntries(){
			for(i=1; i<23; i++){
				row = document.getElementById('field-'+i);//$("#field1");
				id = row.getAttribute('id');
				label = row.getAttribute('label');
				required = row.getAttribute('required');
				if(required!=null){
					req="*";
				}else{
					req="";
				}
				
				//row.innerHTML = "<tr><td>"+label+"</td><td><input></td></tr>";
				
				table = document.getElementById('table-form');
				
				table.innerHTML = table.innerHTML + "<tr><td>"+label+req+":</td><td><input id=\""+id+"-input\" ></td></tr>";
			}
		}**/
		

	   