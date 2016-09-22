package com.vvs.ordenservicio;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
/**
	private void generarReporte(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String nombreArchivo = this.reporte.getNombreReal();
		HashMap<String, Object> parametrosReporte = new HashMap<String, Object>();

		ServletContext servletContext = (ServletContext) this.getServletConfig(); // this.getFacesContext().getExternalContext().getContext();
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

		

		Connection connection = ConexionBD.conexionBD.getConnection(this.reporte.getConexion());
		parametrosReporte.put("REPORT_CONNECTION", connection);

	 
		response.setContentType("application/pdf");
		response.setHeader("Content-disposition", "attachment;filename=" + nombreArchivo + ".pdf");
		JasperRunManager.runReportToPdfStream(reportStream, response.getOutputStream(), parametrosReporte,
				connection);
		response.getOutputStream().flush();
		response.getOutputStream().close();
		 
		
		

		

		if (!FacesContext.getCurrentInstance().getResponseComplete()) {
			FacesContext.getCurrentInstance().responseComplete();
		}
		connection.close();

		
	}
	
	**/
}
