package com.vvs.ordenservicio;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class OrdenServicioDAO {

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyMMdd");

	private static MapDAO mapDao = new MapDAO();

	public void save(Map<String, String> dataMap) {

		Map<String, Object> bindMap = new HashMap<String, Object>();

		bindMap.put("sssss", dataMap.get("aaaaa"));

		String outcome = mapDao.insert("log_orden_servicio", "codigo", bindMap);
	}

	public String save(OrdenServicio os) {

		Map<String, Object> bindMap = getBindMap(os);

		String outcome = mapDao.insert("log_orden_servicio", "codigo", bindMap);
		
		if(outcome.startsWith("success,")){
			long orden = Long.parseLong(outcome.substring(8));
			os.setOrden(orden);
		}

		if (os.getDetalleAccesorios() != null) {
			saveDetalle(os);
		}

		return outcome;
	}

	private Map<String, Object> getBindMap(OrdenServicio os) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("telefono", os.getTelefono());
		map.put("codigo_fabricante", os.getFabricante());
		map.put("codigo_modelo", os.getModelo());
		map.put("numero_serie_tel", os.getSerie());
		map.put("nombre_cliente", os.getNombre());
		map.put("email", os.getEmail());
		map.put("telefono_personal", os.getTelefonoPersona());
		map.put("direccion", os.getDireccion());
		map.put("codigo_tiene_factura", os.getClienteTieneFactura());
		map.put("codigo_falla_1", os.getFalla1());
		if (os.getFalla2() > -1)
			map.put("codigo_falla_2", os.getFalla2());
		if (os.getFalla3() > -1)
			map.put("codigo_falla_3", os.getFalla3());
		if (os.getFalla4() > -1)
			map.put("codigo_falla_4", os.getFalla4());
		map.put("comentario_ejecutivo", os.getComentario());
		map.put("codigo_garantia", os.getGarantia());
		if (os.getFabricanteTelefonoPrestado() > -1) {
			map.put("codigo_fabricante_tel_pres", os.getFabricanteTelefonoPrestado());
			map.put("codigo_modelo_tel_pres", os.getModeloTelefonoPrestado());
		}
		if (os.getSerieTelefonoPrestado() != null && os.getSerieTelefonoPrestado().trim().length() > 0) {
			map.put("numero_serie_tel_prest", os.getSerieTelefonoPrestado());
		}
		map.put("factura_nota_venta", os.getFacturaNota());
		try {
			if (os.getFechaFactura() != null && "19000101".compareTo(sdf.format(os.getFechaFactura())) < 0)
				map.put("fecha_factura", os.getFechaFactura());
		} catch (Exception e) {
			e.printStackTrace();
		}
		map.put("fecha_modificacion", new Date());
		map.put("usuario_modificacion", os.getUsuario());
		map.put("imagen_final", os.getImagen());
			return map;
	}

	public Map<Long, String> getFabricantes() {
		return mapDao.getMap("log_fabricante", "codigo", "desc_fabricante");
	}

	public Map<Long, String> getModelos(long codigoFabricante) {
		return mapDao.getMap("log_modelos", "codigo_fabricante", codigoFabricante, "codigo", "desc_modelo");
	}

	public Map<Long, String> getGarantias(long tieneFactura) {
		return mapDao.getMap("log_garantias_ejecu", "codigo_con_factura", tieneFactura, "codigo", "descripcion");
	}

	public Map<Long, String> getFallas() {
		return mapDao.getMap("log_fallas", "codigo", "desc_falla");
	}

	public Map<Long, String> getFallasTipos() {
		Map<Long, String> map = new LinkedHashMap<Long, String>();
		map.put(-1L, "-- Seleccione --");

		String sql = "SELECT f.codigo, tf.desc_tp_falla || ' - ' || f.desc_falla as desc_falla"
				+ " from log_fallas f, log_tipo_falla tf " + " WHERE f.codigo_tipo_falla = tf.codigo "
				+ " ORDER BY tf.desc_tp_falla, f.desc_falla";

		ConnectionHelper ch = DB.getConnectionHelper();
		try {
			ResultSet rs = ch.executeQuery(sql);
			while (rs.next()) {
				Long keyValue = rs.getLong(1);
				String valueValue = rs.getString(2);
				map.put(keyValue, valueValue);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			ch.closeAll();
		}

		return map;
	}

	public Map<Long, String> getGarantias() {
		return mapDao.getMap("log_garantias_ejecu", "codigo", "descripcion");
	}

	public Map<Long, String> getAccesorios() {
		return mapDao.getMap("log_accesorios", "codigo", "descripcion");
	}

	
	/**
	public void saveImage(byte[] image, long id) {
		String sql = "UPDATE log_orden_servicio SET imagen_final=? WHERE codigo=?";
		ByteArrayInputStream bais = new ByteArrayInputStream(image);
		System.out.println(image.length);
		System.out.println(bais.available());
		Connection con = DB.getConnection();

		PreparedStatement ps = null;
		try {
			con.setAutoCommit(false);
			ps = con.prepareStatement(sql);
			// ps.setBinaryStream(1, bais, image.length);
			ps.setBytes(1, image);
			ps.setLong(2, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				ps.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.commit();
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	public void saveImageToFile(byte[] image, long id) {
		File dir = new File("/tmp/images");
		if (!dir.exists()) {
			dir.mkdirs();
		}
		File f = new File(dir, "image-" + id + ".png");
		try {
			FileOutputStream fos = new FileOutputStream(f);
			fos.write(image, 0, image.length);
			fos.flush();
			fos.close();
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}**/
	

	private void saveDetalle(OrdenServicio os) {
		String sql = "INSERT INTO log_deta_orden_servi(codigo_orden_servicio,codigo_tramite_orden_servicio,consecutivo,codigo_accesorio,descripcin) "
				+" VALUES(?,1,?,?,?);";
		
		Connection con = DB.getConnection();
		
		PreparedStatement ps=null;
		try {
			con.setAutoCommit(false);
			ps = con.prepareStatement(sql);
			for(int i=0; i<os.getDetalleAccesorios().length; i=i+2){
				
				
				ps.clearParameters();
				
				ps.setInt(1, (int)os.getOrden());
				ps.setInt(2, (i+2)/2 );
				ps.setInt(3, Integer.parseInt(os.getDetalleAccesorios()[i]));
				ps.setString(4, os.getDetalleAccesorios()[i+1]);
				
				ps.addBatch();
				
			}
			
			ps.executeBatch();
			
		} catch (SQLException e) {
			
			e.printStackTrace();
		}finally{
			try {
				ps.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.commit();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			try {
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
	}

}
