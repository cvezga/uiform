package com.vvs.ordenservicio.web.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.vvs.ordenservicio.db.DB;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperRunManager;

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

		String ordenId = request.getParameter("orden");

		Integer id = Integer.parseInt(ordenId);

		String reportPath = getServletContext().getRealPath("WEB-INF/jr/orden.jasper");

		InputStream inputStream = new FileInputStream(new File(reportPath));
		HashMap<String, Object> parametrosReporte = new HashMap<String, Object>();
		parametrosReporte.put("ORDEN_SERVICIO", id);
		Connection connection = DB.getConnection();
		parametrosReporte.put("REPORT_CONNECTION", connection);

		/**
		 * URI uri= null; try { uri = new
		 * URI(request.getRequestURL().toString()); } catch (URISyntaxException
		 * e1) { e1.printStackTrace(); } String proto = "http://"; String host =
		 * uri.getHost(); String base = "/OrdenServicioView"; int port =
		 * uri.getPort(); String rutaLogo = proto+host+":"+port+base+
		 * "/images/logo.png"; parametrosReporte.put("LOGO",rutaLogo);
		 * parametrosReporte.put("NOMBRE_LOGO","Movistar");
		 * //parametrosReporte.put("CONTEXTO",request.getServletContext());
		 **/

		response.setContentType("application/pdf");
		response.setHeader("Content-disposition", "inline; filename='OrdedServicio-" + id + ".pdf'");

		try {
			JasperRunManager.runReportToPdfStream(inputStream, response.getOutputStream(), parametrosReporte,
					connection);
		} catch (JRException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		response.getOutputStream().flush();
		response.getOutputStream().close();

		try {
			connection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
