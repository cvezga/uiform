package com.cvezga.uiform;

import java.lang.reflect.Type;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class JsonUtil {
	
	//private static Gson gson = new Gson();
	private static Gson gson = new GsonBuilder()
			   .setDateFormat("dd/MM/yyyy").create();
	
	private static Type mapType = new TypeToken<Map<String, String>>(){}.getType();
	
	private static Type modelMapType = new TypeToken<Map<Long, String>>(){}.getType();
	
	public static Object fromJson(String json, Class clazz){
		return gson.fromJson(json, clazz);	
	}
	
	public static String toJson(Object obj){
		return gson.toJson(obj);	
	}

	public static Map<String,String> fromJsonToMap(String json){

		
		Map<String, String> map = gson.fromJson(json, mapType);
		
		return map;
	}
}
