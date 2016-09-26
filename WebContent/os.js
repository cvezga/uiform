var canvas, ctx;
var hasValidationError = false;
var marks = [];
var seCreoLaOden = false;

$.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)')
			.exec(window.location.href);
	if (results == null) {
		return null;
	} else {
		return results[1] || 0;
	}
}

$(document)
		.ready(
				function(e) {
					table = $("#table-form");
					fields = $("#field-list");

					$
							.each(
									$('#field-list'),
									function(i, list) {
										$('div', list)
												.each(
														function(k, v) {
															id = v.attributes["id"];
															label = v.attributes["label"];
															type = v.attributes["type"];
															// --------------------
															required = v.attributes["required"];
															if (required) {
																reqchar = '*';
															} else {
																reqchar = '';
															}
															// --------------------
															maxlength = v.attributes["max-length"];
															var xmaxlength = '';
															if (maxlength) {
																xmaxlength = ' maxlength="'
																		+ maxlength.value
																		+ '" ';
															}
															// --------------------
															size = v.attributes["size"];
															xsize = '';
															if (size) {
																xsize = ' size="'
																		+ size.value
																		+ '" ';
															}
															// --------------------
															useclass = v.attributes["use-class"];
															xclass = '';
															if (useclass) {
																xclass = ' class="'
																		+ useclass.value
																		+ '" ';
															}
															// --------------------
															xwidth = ' width=\"200px\"';
															if (typeof (type) !== "undefined"
																	&& type != null
																	&& "combo" == type.value) {
																model = v.attributes["model"];
																if (model) {
																	options = getOptions(model.value);
																} else {
																	options = "";
																}
																onchange = v.attributes["on-change"];

																if (onchange) {
																	table
																			.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"
																					+ label.value
																					+ reqchar
																					+ ":</td><td  class=\"odd\"><div class=\"ui-widget\"><select class=\"combobox\" id=\""
																					+ id.value
																					+ "-input\" onchange=\""
																					+ onchange.value
																					+ "\">"
																					+ options
																					+ "</select></div></td></tr>");
																} else {
																	table
																			.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"
																					+ label.value
																					+ reqchar
																					+ ":</td><td  class=\"odd\"><div class=\"ui-widget\"><select class=\"combobox\" id=\""
																					+ id.value
																					+ "-input\" >"
																					+ options
																					+ "</select></div></td></tr>");

																}
																onchange = "myFunction()";
															} else if (typeof (type) !== "undefined"
																	&& type != null
																	&& "textarea" == type.value) {
																table
																		.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"
																				+ label.value
																				+ reqchar
																				+ ":</td><td  class=\"odd\"><textarea id=\""
																				+ id.value
																				+ "-input\" ''></textarea></td></tr>");

															} else {
																if (type
																		&& type.value == 'numeric') {
																	table
																			.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"
																					+ label.value
																					+ reqchar
																					+ ":</td><td  class=\"odd\"><input class=\"numeric\" id=\""
																					+ id.value
																					+ "-input\" "
																					+ xmaxlength
																					+ xsize
																					+ xwidth
																					+ xclass
																					+ "></td></tr>");
																} else {
																	table
																			.append("<tr class='rich-table'><td class=\"rich-table-cell tablaTitulo\">"
																					+ label.value
																					+ reqchar
																					+ ":</td><td  class=\"odd\"><input id=\""
																					+ id.value
																					+ "-input\" width=\"200px\" "
																					+ xmaxlength
																					+ xsize
																					+ xwidth
																					+ xclass
																					+ "></td></tr>");
																}
															}
														});
									})

					$("button")
							.click(
									function() {
										$('#img-load').show();
										$("#errmsg").empty();
										var jsonform = getForm();
										if (!hasValidationError) {
											$.ajaxSetup({
												cache : false,
												async : true
											});
											$
													.post(
															"os.ms",
															{
																json : JSON
																		.stringify(jsonform)
															},
															function(data,
																	status) {
																// alert($.urlParam('usuario'));
																seCreoLaOden = false;
																newId = null;
																if (!data
																		.startsWith("success")) {
																	$("#errmsg")
																			.html(
																					data);
																	return false;
																} else {
																	idx1 = data
																			.indexOf(',');
																	newId = data
																			.substring(idx1 + 1);
																	uploadImage(newId);
																	alert("SE CREO LA ORDEN DE SERVICIO NO.: "
																			+ newId);

																	seCreoLaOden = true;
																}

																if (data
																		.startsWith("success")
																		&& "success" == status) {
																	getPdf(newId);
																	// location.reload();
																}
															});
										}
										$('#img-load').hide();
									});

					$(".numeric").keypress(
							function(e) {
								// if the letter is not digit then display error
								// and don't type anything
								if (e.which != 8 && e.which != 0
										&& (e.which < 48 || e.which > 57)) {
									return false;
								}
							});

					paintImage();

					$('#myCanvas').mousedown(
							function(e) {
								mousePressed = true;
								Draw(e.pageX - $(this).offset().left - 5,
										e.pageY - $(this).offset().top - 5,
										false);
							});

					$(".datepicker").datepicker({
						showOn : "button",
						buttonImage : "images/calendar.gif",
						buttonImageOnly : true,
						buttonText : "[Selecione Fechase]",
						dateFormat : 'dd/mm/yy'
					});

					$('#img-load').hide();
				});



function getOptions(modelName) {
	options = '';

	$.ajaxSetup({
		cache : true,
		async : false
	});
	$.get("os.ms?model=" + modelName, function(data, status) {
		var obj = jQuery.parseJSON(data);
		for (i = 0; i < obj.length; i = i + 2) {
			op = '<option value="' + obj[i] + '">' + obj[i + 1] + '</option>';
			options = options + op;
		}
	});

	return options;
}

function getSubOptions(modelName, id) {
	options = '';

	$.ajaxSetup({
		cache : true,
		async : false
	});
	$.get("os.ms?submodel=" + modelName + "&id=" + id, function(data, status) {
		var obj = jQuery.parseJSON(data);
		for (i = 0; i < obj.length; i = i + 2) {
			op = '<option value="' + obj[i] + '">' + obj[i + 1] + '</option>';
			options = options + op;
		}
	});

	return options;
}

//============================
// BUILD ENTRY FORM
//============================

function updateFormEntries() {
	for (i = 1; i < 23; i++) {
		row = document.getElementById('field-' + i);// $("#field1");
		id = row.getAttribute('id');
		label = row.getAttribute('label');
		required = row.getAttribute('required');
		if (required != null) {
			req = "*";
		} else {
			req = "";
		}

		// row.innerHTML = "<tr><td>"+label+"</td><td><input></td></tr>";

		table = document.getElementById('table-form');

		table.innerHTML = table.innerHTML + "<tr><td>" + label + req
				+ ":</td><td><input id=\"" + id + "-input\" ></td></tr>";
	}
}

//==============================
// Formularios y validaciones 
//==============================

function getForm() {
	hasValidationError = false;
	form = {
		telefono : valueOf('telefono', true),
		fabricante : valueOf('fabricante', true),
		modelo : valueOf('modelo', true),
		serie : valueOf('serie', true),
		nombre : valueOf('nombre', true),
		email : valueOf('email'),
		telefonoPersona : valueOf('telefonoPersona', true),
		direccion : valueOf('direccion', true),
		clienteTieneFactura : valueOf('clienteTieneFactura', true),
		falla1 : valueOf('falla1', true),
		falla2 : valueOf('falla2'),
		falla3 : valueOf('falla3'),
		falla4 : valueOf('falla4'),
		comentario : valueOf('comentario', true),
		garantia : valueOf('garantia', true),
		fabricanteTelefonoPrestado : valueOf('fabricanteTelefonoPrestado',
				false, -1),
		modeloTelefonoPrestado : valueOf('modeloTelefonoPrestado', false, -1),
		serieTelefonoPrestado : valueOf('serieTelefonoPrestado'),
		facturaNota : valueOf('facturaNota'),
		fechaFactura : valueOf('fechaFactura'),
		detalleAccesorios : getDetalleAccesorios(),
		// image: getImageData(),
		usuario : $.urlParam('usuario')

	};

	if (!form.modeloTelefonoPrestado) {
		form.modeloTelefonoPrestado = -1;
	}

	if (!hasValidationError && form.fabricanteTelefonoPrestado > -1
			&& form.modeloTelefonoPrestado == -1) {
		showError("Selectione <b>MODELO TEL�FONO PRESTADO</b>");
	} else if (!hasValidationError && form.fabricanteTelefonoPrestado > -1
			&& isEmpty(form.serieTelefonoPrestado)) {
		showError("Digite <b># SERIE (IMEI) TEL�FONO PRESTADO</b>");
	} else if (!hasValidationError && form.fabricanteTelefonoPrestado == -1
			&& !isEmpty(form.serieTelefonoPrestado)) {
		showError("Seleccione FABRICANTE TEL�FONO PRESTADO: [SI]; o remueva la serie en <b># SERIE (IMEI) TEL�FONO PRESTADO</b>");
	} else if (!hasValidationError && form.clienteTieneFactura > -1
			&& form.garantia == -1) {
		showError("Seleccione <b>GARANT�A</b>");
	} else if (!hasValidationError && form.clienteTieneFactura == 1
			&& isEmpty(form.facturaNota)) {
		showError("Digite <b>FACTURA / NOTA DE VENTA</b>");
	} else if (!hasValidationError && form.clienteTieneFactura == 1
			&& isEmpty(form.fechaFactura)) {
		showError("Digite <b>FECHA DE FACTURA</b>");
	} else if (!hasValidationError && form.clienteTieneFactura == 0
			&& !isEmpty(form.facturaNota)) {
		showError("Selecciono Cliente <b>NO</b> tiene factura y digito en <b>FACTURA / NOTA DE VENTA</b>");
	} else if (!hasValidationError && form.clienteTieneFactura == 0
			&& !isEmpty(form.fechaFactura)) {
		showError("Selecciono Cliente <b>NO</b> tiene factura y digito en <b>FECHA DE FACTURA</b>");
	}

	if (!hasValidationError) {
		if (!form.fechaFactura) {
			form.fechaFactura = '01/01/1900';
		} else {
			dd = form.fechaFactura.substring(0, 2);
			if (!isNaN(dd) && dd > 31) {
				showError("Formato de fecha invalido");
			}
			mm = form.fechaFactura.substring(3, 5);
			if (!isNaN(mm) && (mm < 1 || mm > 12)) {
				showError("Formato de fecha invalido");
			}
			yy = form.fechaFactura.substring(6, 10);
			if (isNaN(dd) || isNaN(dd) || isNaN(dd)) {
				showError("Formato de fecha invalido");
			}
		}
	}

	return form;
}

 
function valueOf(fieldName, required, defaultValue) {

	if (hasValidationError)
		return;

	value = $('#' + fieldName + '-input').prop('value');
	if (required
			&& (!value || value == -1 || value.replace(/\s/g, '').length == 0)) {
		$("#errmsg").html(
				"El campo <b>" + $('#' + fieldName).attr('label')
						+ "</b> es requerido");
		hasValidationError = true;
		return false;

	}

	minlength = $('#' + fieldName).attr('min-length');
	if (minlength && value.replace(/\s/g, '').length > 0
			&& value.replace(/\s/g, '').length < minlength) {
		$("#errmsg")
				.html(
						"El campo <b>" + $('#' + fieldName).attr('label')
								+ "</b> debe tener " + minlength
								+ " caracteres minimo");
		hasValidationError = true;
		return false;
	}

	if (!(value)) {
		value = defaultValue;
	}
	return value;
}

function valueOfOrDefault(fieldName, defaultValue) {
	value = $('#' + fieldName + '-input').prop('value');
	if (!value) {
		return defaultValue;
	}
	return value;
}

function comboChange(combo, target, model) {
	// alert('combo change'+combo+':'+target+':'+model);
	$('#' + target + '-input').empty();
	if (combo.value > -1) {
		options = getSubOptions(model, combo.value);
		$('#' + target + '-input').append(options);
	}
}




var rowCount = 0;
function addAccesorios() {

	options = getOptions('accesorios');

	newTR = '<tr id="accesorio-row-%row%" class="detalleRow">'
			+ '<td><select id="accesorio-%row%">'
			+ options
			+ '</select></td>'
			+ '<td><input  id="descripcion-accesorio-%row%" size="50" maxlength="150"></td>'
			+ '<td><img src="images/Delete.png" onclick="remove(\'accesorio-row-%row%\');"></td>'
			+ '</tr>';

	rowCount++;

	trn = newTR.replace(/%row%/g, rowCount);

	table = $("#detalle-table");

	table.append(trn);

}

function remove(id) {
	// alert('remove');
	$('#' + id).find('select').remove();
	$('#' + id).find('input').remove();
	$('#' + id).remove();
	//rowCount--;
}

function getDetalleAccesorios() {
	if (hasValidationError) {
		//alert('detalle no se agrego; hay error de validacion');
		return;
	}
	detalles = [];
	for (r = 1; r <= rowCount; r++) {
		row = $('#accesorio-row-' + r);
		if (row) {
			sel = $('#accesorio-' + r).prop('value');
			des = $('#descripcion-accesorio-' + r).prop('value');
			if (sel && des) {
				detalles.push(sel);
				detalles.push(des);
			} else if (sel == -1) {
				showError('Seleccione el accesorio en la linea de detalla No. '
						+ r);
			} else if (isEmpty(des)) {
				showError('Describa el accesorio seleccionado en la linea de detalle No. '
						+ r);
			}
		}
	}

	return detalles;

}

function showError(msg) {
	$("#errmsg").html(msg);
	hasValidationError = true;
	return false;
}

//====================
// REGISTRO DE DANOS
//====================

function getImageData() {
	canvasServer = document.getElementById("myCanvas");
	imageDataURL = canvasServer.toDataURL('image/png');
	return imageDataURL;
}

function uploadImage(newId) {
	var canvasServer = document.getElementById("myCanvas");
	var context = canvasServer.getContext("2d");
	var imageDataURL = canvasServer.toDataURL('image/png');

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "uploadImage?id=" + newId, true);
	var boundary = Math.random().toString().substr(2);
	xhr.setRequestHeader("content-type",
			"multipart/form-data; charset=utf-8; boundary=" + boundary);
	var multipart = "--" + boundary + "\r\n"
			+ "Content-Disposition: form-data; name=myImg\r\n"
			+ "Content-type: image/png\r\n\r\n" + imageDataURL + "\r\n" + "--"
			+ boundary + "--\r\n";
	xhr.send(multipart);
	/*xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send("imgData="+imageDataURL);*/
}


function redraw() {
	paintImage();
	for (i = 0; i < marks.length; i++) {
		xx = marks[i][0];
		yy = marks[i][1];

		drawRect(xx, yy);
	}

}

function drawRect(x, y) {
	ctx.beginPath();
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 2;
	ctx.lineJoin = "round";
	ctx.rect(x, y, 10, 10);
	ctx.closePath();
	ctx.stroke();
}

function removeMark(x, y) {
	removed = false;

	for (i = (marks.length - 1); i >= 0; i--) {
		xx = marks[i][0];
		yy = marks[i][1];
		if ((x >= xx - 5 && x <= xx + 10 - 5)
				&& (y >= yy - 5 && y <= yy + 10 - 5)) {
			marks.splice(i, 1);
			redraw();
			removed = true;
			break;
		}
	}

	return removed;

}

function paintImage() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var img = document.getElementById("casopng");
	ctx.drawImage(img, 0, 0);

}

function Draw(x, y) {

	if (!removeMark(x, y)) {

		drawRect(x, y);

		marks.push([ x, y ]);

	}

}

//==========
// REPORTE
//==========

function getPdf(id) {
	// window.location.href = "reporte?orden="+id;
	$(location).attr('href', 'reporte?orden=' + id)
}