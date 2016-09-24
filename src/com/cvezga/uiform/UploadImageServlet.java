package com.cvezga.uiform;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.Base64;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.vvs.ordenservicio.OrdenServicioBO;

/**
 * Servlet implementation class UploadImageServlet
 */
public class UploadImageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	static OrdenServicioBO osBO = new OrdenServicioBO();

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public UploadImageServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 
		 
		try {
			Part part = request.getPart("myImg");
			BufferedReader br = new BufferedReader(
					new InputStreamReader(part.getInputStream(), Charset.forName("utf-8")));

			/*
			 * String imgData = request.getParameter("imgData"); BufferedReader
			 * br = new BufferedReader(new InputStreamReader( new
			 * ByteArrayInputStream( imgData.getBytes(StandardCharsets.UTF_8)),
			 * Charset.forName("utf-8")));
			 */

			String sImg = br.readLine();
			sImg = sImg.substring("data:image/png;base64,".length());
			byte[] bImg64 = sImg.getBytes();
			byte[] bImg = Base64.getDecoder().decode(bImg64);
			 
			String xid = request.getParameter("id");
			long lid = Long.parseLong(xid);

			//osBO.saveImage(bImg, lid);
			/*
			 * String imgData = req.getParameter("imgData"); String img64 =
			 * imgData.replaceAll("data:image/png;base64,", ""); byte[]
			 * decodedBytes = DatatypeConverter.parseBase64Binary(img64 );
			 * BufferedImage bfi = ImageIO.read(new
			 * ByteArrayInputStream(decodedBytes)); File outputfile = new
			 * File(ReloadableProps.getProperty("local.image.save.path")+
			 * "img.png"); ImageIO.write(bfi , "png", outputfile); bfi.flush();
			 */
		} catch (Exception e) {
			e.printStackTrace();
			String loggerMessage = "Upload image failed : ";
			 
		} 
	}

}
