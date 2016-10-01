package com.vvs.ordenservicio.bo;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import com.cvezga.uiform.BO;
import com.cvezga.uiform.JsonUtil;
import com.vvs.ordenservicio.dao.OrdenServicioDAO;
import com.vvs.ordenservicio.domain.OrdenServicio;

public class OrdenServicioBO implements BO {

	private static Map<String, String> modelCacheMap = new HashMap<String, String>();
	
	private OrdenServicioDAO dao = new OrdenServicioDAO();
	
	public OrdenServicioBO(){
		
		loadAllCache();
		
	}

	@Override
	public String process(Map<String, String> data) {
		String outcome = null;
		if (data.get("model") != null) {
			return getModelData(data.get("model"));
		} else if (data.get("submodel") != null) {
			return getSubModelData(data.get("submodel"), data.get("id"));
		} else {

			String json = data.get("json");
			
			System.out.println(json);

			OrdenServicio os = (OrdenServicio) JsonUtil.fromJson(json, OrdenServicio.class);

			 outcome = dao.save(os);
			
			System.out.println(os.getTelefono());
		}
		return outcome;
	}

	private String getSubModelData(String model, String id) {
		String key = model+"-"+id;
		String json = modelCacheMap.get(key);
		if (json != null) {
			return json;
		}
		long lid = Long.parseLong(id);
		Map<Long, String> map = null;
		if ("modelos".equals(model)) {
			map = getModelos(lid);
		}else if("garantias".equals(model)){
			map = getGarantias(lid);
		}
		if (map != null) {
			json = JsonUtil.toJson(map);
			json = json.replace("{", "[").replace("}", "]").replace(":", ",");
			modelCacheMap.put(key, json);
			return json;
		}

		return null;
	}

	

	private String getModelData(String model) {
		String json = modelCacheMap.get(model);
		if (json != null) {
			return json;
		}
		Map<Long, String> map = null;
		if ("fabricantes".equals(model)) {
			map = getFabricantes();
		} else if ("fallas".equals(model)) {
			map = getFallas();
		} else if ("garantias".equals(model)) {
			map = getGarantias();
		} else if ("tieneFacturas".equals(model)) {
			map = getTieneFacturas();
		} else if ("accesorios".equals(model)) {
			map = getAccesorios();
		}
		if (map != null) {
			json = JsonUtil.toJson(map);
			json = json.replace("{", "[").replace("}", "]").replace(":", ",");
			modelCacheMap.put(model, json);
			return json;
		}

		return null;
	}
	
	public void loadAllCache(){
		getModelData("fabricantes");
		getModelData("fallas");
		getModelData("garantias");
		getModelData("tieneFacturas");
		getModelData("accesorios");
	}

	private Map<Long, String> getTieneFacturas() {
		Map<Long, String> map = new LinkedHashMap<Long, String>();
		map.put(-1L, "-- Selecione --");
		map.put(0L, "NO");
		map.put(1L, "SI");
		return map;
	}

	public Map<Long, String> getFabricantes() {
		return dao.getFabricantes();
	}

	public Map<Long, String> getModelos(Long codigoFabricante) {
		return dao.getModelos(codigoFabricante);
	}

	private Map<Long, String> getGarantias(long tieneFactura) {
		return dao.getGarantias(tieneFactura);
	}
	
	public Map<Long, String> getFallas() {
		return dao.getFallasTipos();
	}

	public Map<Long, String> getGarantias() {
		return dao.getGarantias();
	}
	
	public Map<Long, String> getAccesorios() {
		return dao.getAccesorios();
	}
	
	/**
	public void saveImage(byte[] image, long id){
		//dao.saveImage(image,id);
		//dao.saveImageToFile(image, id);
	}**/
}
