package com.cvezga.uiform;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class JsonUtilTest {
	
	
	@Test
	public void toJsonTest(){
		
		Map<String,Object> dataMap = new HashMap<String,Object>();
		
		dataMap.put("id", 1234);
		dataMap.put("name", "My Name");
		dataMap.put("phone", 12345678);
		
		String json = JsonUtil.toJson(dataMap);
		
		System.out.println(json);
		
		
	}
	
	@Test
	public void fromJsonTest(){
		
		Type type = new TypeToken<Map<String, String>>(){}.getType();
		
		Gson gson = new Gson();
		
		Map<String, String> myMap = gson.fromJson("{\"phone\":12345678,\"name\":\"My Name\",\"id\":1234}", type);
		
		System.out.println(myMap.get("phone"));
	}
	
	
	@Test
	public void fromJsonToMap(){
		
		Map<String,String> map = JsonUtil.fromJsonToMap("{\"phone\":12345678,\"name\":\"My Name\",\"id\":1234}");
		
		System.out.println(map.get("id"));
	}

}
