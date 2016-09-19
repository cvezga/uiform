package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

public class MapDAO {
	
	private static String SQL_INSERT = "INSERT INTO %TABLE%(%FIELDS%) VALUES(%VALUES%)"; 
	
	public String insert(String table, Map<String, Object> dataMap){
		
		String sql = getInsertSQL(table,dataMap);
		
		Connection con = DB.getConnetion();
		PreparedStatement ps = null;
		try {
			 ps = con.prepareStatement(sql);
			int idx=0;
			for(Entry<String,Object> entry : dataMap.entrySet()){
				idx++;
				ps.setObject(idx, entry.getValue());
			}
			int count = ps.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			if(ps!=null){
				try {
					ps.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		
		
		return "success";
	}

	private String getInsertSQL(String table, Map<String, Object> dataMap) {
        String sql = SQL_INSERT;
		
		StringBuilder fields = new StringBuilder();
		StringBuilder values = new StringBuilder();
		for(Entry<String,Object> entry : dataMap.entrySet()){
			if(fields.length()>0){
				fields.append(",");
				values.append(",");
			}
			fields.append(entry.getKey());
			values.append("?");
		}
		
		sql = sql.replace("%TABLE%", table).replace("%FIELDS%", fields.toString()).replace("%VALUES%",  values.toString());
		
	
		return sql;
	}

	public Map<Long, String> getMap(String string, String key, String value) {
		Map<Long,String> map = new HashMap<Long,String>();
		String sql = "SELECT %KEY%,%VALUE% FROM TABLA ORDER BY %ORDER%"
				.replace("%KEY%", key).replace("%VALUE%", value).replace("%ORDER%",  value);
		
		ConnectionHelper ch = DB.getConnectionHelper();
		try {
			ResultSet rs = ch.executeQuery(sql);
			while(rs.next()){
				Long keyValue = rs.getLong(key);
				String valueValue = rs.getString(value);
				map.put(keyValue, valueValue);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			ch.closeAll();
		}
		
		 
		return map;
	}

}
