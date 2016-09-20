package com.vvs.ordenservicio;

import java.io.ByteArrayInputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

public class OrdenServicioDAO {

	private static MapDAO mapDao = new MapDAO();

	public void save(Map<String, String> dataMap) {

		Map<String, Object> bindMap = new HashMap<String, Object>();

		bindMap.put("sssss", dataMap.get("aaaaa"));

		String outcome = mapDao.insert("log_ordenservicio", "codigo", bindMap);
	}

	public String save(OrdenServicio os)  {

		Map<String,Object> bindMap = getBindMap(os);

		String outcome = mapDao.insert("log_orden_servicio", "codigo", bindMap);
		
		return outcome;
	}

	private Map<String, Object> getBindMap(OrdenServicio os) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("telefono", os.getTelefono());
		map.put("codigo_fabricante", os.getFabricante());
		map.put("codigo_modelo", os.getModelo());
		map.put("numero_serie", os.getSerie());
		map.put("nombre_cliente", os.getNombre());
		map.put("email", os.getEmail());
		map.put("telefono_personal", os.getTelefonoPersona());
		map.put("direccion", os.getDireccion());
		map.put("codigo_tiene_factura", os.getClienteTieneFactura());
		map.put("codigo_falla_1", os.getFalla1());
		if(os.getFalla2()>-1)
		map.put("codigo_falla_2", os.getFalla2());
		if(os.getFalla3()>-1)
		map.put("codigo_falla_3", os.getFalla3());
		if(os.getFalla4()>-1)
		map.put("codigo_falla_4", os.getFalla4());
		map.put("comentario_ejecutivo", os.getComentario());
		map.put("codigo_garantia", os.getGarantia());
		map.put("codigo_fabricante_tel_pres", os.getFabricanteTelefonoPrestado());
		map.put("codigo_modelo_tel_pres", os.getModeloTelefonoPrestado());
		map.put("numero_serie_tel_pres", os.getSerieTelefonoPrestado());
		map.put("factura_nota_venta", os.getFacturaONotaDeventa());
		map.put("fecha_factura", os.getFechaFactura());
		//map.put("imagen_final", os.getTelefono());
		/**
		 * CREATE TABLE log_orden_servicio
		 * 
		 * codigo_tramite numeric(3,0) NOT NULL, codigo numeric(5,0) NOT NULL,
		 * codigo_tienda numeric(4,0), telefono numeric(8,0), codigo_fabricante
		 * numeric(2,0), codigo_modelo numeric(3,0), numero_serie numeric(15,0),
		 * nombre_cliente character varying(150), email character varying(50),
		 * telefono_personal numeric(8,0), direccion character varying(300),
		 * codigo_tiene_factura numeric(1,0), codigo_falla_1 numeric(4,0),
		 * codigo_falla_2 numeric(4,0), codigo_falla_3 numeric(4,0),
		 * codigo_falla_4 numeric(4,0), comentario_ejecutivo character
		 * varying(500), codigo_garantia numeric(2,0),
		 * codigo_fabricante_tel_pres numeric(2,0), codigo_modelo_tel_pres
		 * numeric(3,0), numero_serie_tel_pres numeric(15,0), factura_nota_venta
		 * character varying(8), fecha_factura timestamp without time zone,
		 * fecha_entrega timestamp without time zone, codigo_resuelto_en_sitio
		 * numeric(1,0), codigo_garantia_interno numeric(2,0),
		 * codigo_desicion_interno numeric(2,0),
		 * codigo_garantia_desicion_interno numeric(2,0),
		 * codigo_reparacion_interno numeric(2,0),
		 * codigo_decision_reparacion_interno numeric(2,0),
		 * codigo_garantia_decision_reparacion_interno numeric(2,0),
		 * notas_interno character varying(500), numero_rma numeric(15,0),
		 * codigo_garantia_externo numeric(2,0), codigo_desicion_externo
		 * numeric(2,0), codigo_garantia_desicion_externo numeric(2,0),
		 * codigo_reparacion_externo numeric(2,0),
		 * codigo_decision_reparacion_externo numeric(2,0),
		 * codigo_garantia_decision_reparacion_externo numeric(2,0),
		 * notas_externo character varying(500), numero_serie_tel_devo
		 * numeric(15,0), codigo_dependencia numeric(5,0), codigo_csa_destino
		 * numeric(4,0), codigo_paso_actual numeric(3,0), paso_terminado
		 * numeric(5,0), usuario_ingreso numeric(20,0), fecha_ingreso timestamp
		 * without time zone, usuario_movimiento numeric(20,0), fecha_movimiento
		 * timestamp without time zone, usuario_moificacion numeric(20,0),
		 * fecha_modificacion timestamp without time zone,
		 * recomendaciones_interno character varying(500),
		 * recomendaciones_externo character varying(500), codigo_tipo_ciclo
		 * numeric(2,0), imagen_final bytea, nombre_imagen_final character
		 * varying(100), comprobante bytea, nombre_comprobante character
		 * varying(100), registro_danos bytea, nombre_registro_danos character
		 * varying(100), actualizar_externo numeric(1,0), ind_pintar_danos
		 * numeric(5,0), metodologia_interno character varying(500),
		 * metodologia_externo character varying(500), finalizado_cobro_marca
		 * numeric(5,0), codigo_estado numeric(1,0),
		 **/
		return map;
	}
	
	public Map<Long,String> getFabricantes(){
		return mapDao.getMap("log_fabricante","codigo","desc_fabricante");
	}

	public Map<Long, String> getModelos(long codigoFabricante) {
		return mapDao.getMap("log_modelos","codigo_fabricante",codigoFabricante, "codigo","desc_modelo");
	}

	public Map<Long, String> getFallas() {
		return mapDao.getMap("log_fallas","codigo","desc_falla");
	}

	public Map<Long, String> getGarantias() {
		return mapDao.getMap("log_garantias_ejecu","codigo","descripcion");
	}

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
			ps.setBinaryStream(1, bais, image.length);
			//ps.setBytes(1, image);
			ps.setLong(2, id);
			ps.executeUpdate();
			 
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
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
				con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		
	}

}
