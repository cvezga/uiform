package com.vvs.ordenservicio;

import java.util.Map;

import com.cvezga.uiform.BO;
import com.cvezga.uiform.JsonUtil;

public class OrdenServicioBO implements BO {

	@Override
	public String process(Map<String, String> data) {
		
		String json = data.get("json");
		
		OrdenServicio os = (OrdenServicio) JsonUtil.fromJson(json, OrdenServicio.class);
		
		System.out.println(os.getTelefono());
		
		return null;
	}

}
