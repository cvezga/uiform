package com.vvs.ordenservicio;

import java.util.HashMap;
import java.util.Map;

public class OrdenDeServisioDAO {
	
	private static MapDAO mapDao = new MapDAO();
	
	
	public void save(Map<String,String> dataMap){
		
		
		Map<String, Object> bindMap = new HashMap<String,Object>();
		
		bindMap.put("sssss", dataMap.get("aaaaa"));
		
		
		String outcume = mapDao.insert("log_ordenservicio", bindMap);
	}

}
