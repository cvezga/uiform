package com.vvs.ordenservicio;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Connection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperRunManager;
import net.sf.jasperreports.engine.export.JRHtmlExporter;
import net.sf.jasperreports.engine.export.JRHtmlExporterParameter;
import net.sf.jasperreports.engine.export.JRTextExporter;
import net.sf.jasperreports.engine.export.JRTextExporterParameter;

/**
 * Servlet implementation class GenerarReporteServlet
 */
public class GenerarReporteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public GenerarReporteServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	private void generarReporte(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String nombreArchivo = this.reporte.getNombreReal();
		HashMap<String, Object> parametrosReporte = new HashMap<String, Object>();



		ServletContext servletContext = (ServletContext) this.getFacesContext().getExternalContext().getContext();
		// String path = servletContext.getRealPath(File.separatorChar + ".." +
		// File.separatorChar + "recursos" + File.separatorChar);
		String path = servletContext.getRealPath("");
		for (int i = path.length() - 1; i >= 0; i--) {
			if (path.charAt(i) == File.separatorChar) {
				path = path.substring(0, i);
				i = -1;
			}
		}
		path = path + File.separatorChar + "recursos" + File.separatorChar;
		System.out.println("path: " + path);

		InputStream reportStream = new ByteArrayInputStream(this.reporte.getJasper());

		// si el reporte tiene subreportes, se graban los subreportes a ser
		// utilizados
		for (int i = 0; i < this.reporte.getSubReportes().size(); i++) {
			SubReporte subReporte = this.reporte.getSubReportes().get(i);
			InputStream subreportStream = new ByteArrayInputStream(subReporte.getJasper());

			String nombreArchivoSubReporte = subReporte.getNombre();
			File file = new File(path + nombreArchivoSubReporte);
			OutputStream out = new FileOutputStream(file);

			int read = 0;
			byte[] bytes = new byte[1024];

			while ((read = subreportStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}

			subreportStream.close();
			out.flush();
			out.close();

		}

		response.reset();
		response.setHeader("pragma", "no-cache");
		response.setHeader("Cache-control", "no-cache, no-store, must-revalidate");

		// PARAMETROS
		Map<ParametroReporte, Object> valores = this.formulario.getValores();
		Iterator<Entry<ParametroReporte, Object>> iterator = valores.entrySet().iterator();
		if (!valores.isEmpty()) {
			while (iterator.hasNext()) {
				Entry<ParametroReporte, Object> entry = iterator.next();
				ParametroReporte pr = entry.getKey();
				Object value = entry.getValue();
				if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_TEXTO)
						|| pr.getTipo().equals(ParametroReporte.TIPO_VALOR_TEXTO_LARGO)) {
					parametrosReporte.put(pr.getNombreReal(), value.toString());
				} else if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_NUMERO)) {
					Integer valor = new Integer(value.toString());
					parametrosReporte.put(pr.getNombreReal(), valor);
				} else if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_FECHA)) {
					Date fecha = (Date) value;
					SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
					parametrosReporte.put(pr.getNombreReal(), sdf.format(fecha));
				} else if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_FECHA_HORA)) {
					Date fecha = (Date) value;
					SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy h:mm a");
					parametrosReporte.put(pr.getNombreReal(), sdf.format(fecha));
				} else if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_CHECK)) {
					Boolean check = (Boolean) value;
					parametrosReporte.put(pr.getNombreReal(), check.booleanValue() ? new Integer(1) : new Integer(0));
				} else if (pr.getTipo().equals(ParametroReporte.TIPO_VALOR_COMBO)) {
					parametrosReporte.put(pr.getNombreReal(), value);
				} else {
					parametrosReporte.put(pr.getNombreReal(), value);
				}
			}
		}

		String logo = (String) this.getValueBinding("#{estiloController.logo}");
		String empresa = (String) this.getValueBinding("#{estiloController.empresa}");
		if (logo != null) {
			String contexto = Utilidades.getContextURL(request);
			String partesContexto[] = contexto.split("/");
			String contextoSinNombreAplicacion = partesContexto[0] + "//" + partesContexto[2] + "/";
			String rutaLogo = contexto + "/Theme/logos/" + logo;
			parametrosReporte.put("LOGO", rutaLogo);
			parametrosReporte.put("NOMBRE_LOGO", logo);
			parametrosReporte.put("CONTEXTO", contextoSinNombreAplicacion);
		}
		if (empresa != null) {
			parametrosReporte.put("EMPRESA", empresa);
		}

		if (!this.reporte.getSubReportes().isEmpty()) {// si el reporte tiene
														// subreportes
			parametrosReporte.put("SUBREPORT_DIR", path);
		}

		Connection connection = ConexionBD.conexionBD.getConnection(this.reporte.getConexion());
		parametrosReporte.put("REPORT_CONNECTION", connection);

		if (this.formato.equals(Reportes.FORMATO_PDF)) {
			response.setContentType("application/pdf");
			response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".pdf");
			JasperRunManager.runReportToPdfStream(reportStream, response.getOutputStream(), parametrosReporte,
					connection);
			response.getOutputStream().flush();
			response.getOutputStream().close();
		}
		if (this.formato.equals(Reportes.FORMATO_XLS)) {
			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".xls");
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			JasperReportVVS.generarArchivoXls(JasperReportVVS.cargarArchivoJasper(reportStream), parametrosReporte,
					connection, baos);
			ServletOutputStream servletOutputStream = response.getOutputStream();
			baos.writeTo(servletOutputStream);
			response.setContentLength(baos.size());
			servletOutputStream.flush();
			servletOutputStream.close();
		}
		if (this.formato.equals(Reportes.FORMATO_RTF)) {
			response.setContentType("application/rtf");
			response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".rtf");
			JasperReportVVS.generarArchivoRTF(JasperReportVVS.cargarArchivoJasper(reportStream), parametrosReporte,
					connection, response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();
		}
		if (this.formato.equals(Reportes.FORMATO_HTML)) {
			response.setContentType("application/html");
			response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".html");
			JasperPrint jasperPrint = JasperFillManager.fillReport(JasperReportVVS.cargarArchivoJasper(reportStream),
					parametrosReporte, connection);
			JRHtmlExporter exportadorHTML = new JRHtmlExporter();
			exportadorHTML.setParameter(JRHtmlExporterParameter.JASPER_PRINT, jasperPrint);
			exportadorHTML.setParameter(JRHtmlExporterParameter.OUTPUT_STREAM, response.getOutputStream());
			exportadorHTML.setParameter(JRHtmlExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exportadorHTML.setParameter(JRHtmlExporterParameter.IS_WHITE_PAGE_BACKGROUND, Boolean.FALSE);
			exportadorHTML.setParameter(JRHtmlExporterParameter.IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS, Boolean.TRUE);
			exportadorHTML.setParameter(JRHtmlExporterParameter.IS_USING_IMAGES_TO_ALIGN, Boolean.FALSE);
			exportadorHTML.exportReport();
			response.getOutputStream().flush();
			response.getOutputStream().close();
		}

		if (this.formato.equals(Reportes.FORMATO_TXT)) {
			response.setContentType("application/txt");
			response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".txt");
			JasperPrint jasperPrint = JasperFillManager.fillReport(JasperReportVVS.cargarArchivoJasper(reportStream),
					parametrosReporte, connection);

			JRTextExporter exporter = new JRTextExporter();

			exporter.setParameter(JRTextExporterParameter.JASPER_PRINT, jasperPrint);
			exporter.setParameter(JRTextExporterParameter.OUTPUT_STREAM, response.getOutputStream());
			exporter.setParameter(JRTextExporterParameter.OUTPUT_FILE,
					JasperReportVVS.cargarArchivoJasper(reportStream));
			exporter.setParameter(JRTextExporterParameter.PAGE_HEIGHT, new Float(250));
			exporter.setParameter(JRTextExporterParameter.PAGE_WIDTH, new Float(50));
			exporter.setParameter(JRTextExporterParameter.CHARACTER_WIDTH, new Float(4));
			exporter.setParameter(JRTextExporterParameter.CHARACTER_HEIGHT, new Float(8));
			exporter.exportReport();

			response.getOutputStream().flush();
			response.getOutputStream().close();
		}

		if (!FacesContext.getCurrentInstance().getResponseComplete()) {
			FacesContext.getCurrentInstance().responseComplete();
		}
		connection.close();

		// si el reporte tiene subreportes, se borran los subreportes que fueron
		// utilizados
		for (int i = 0; i < this.reporte.getSubReportes().size(); i++) {
			SubReporte subReporte = this.reporte.getSubReportes().get(i);
			String nombreArchivoSubReporte = subReporte.getNombre();
			File file = new File(path + nombreArchivoSubReporte);
			file.delete();

		}
	}

}
