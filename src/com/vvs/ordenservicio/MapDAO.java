package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

public class MapDAO {
	
	private static String SQL_INSERT = "INSERT INTO %TABLE%(%FIELDS%) VALUES(%VALUES%)";
	
	public synchronized String insert(String table, String id, Map<String, Object> dataMap){
		
	    String outcome = "success";
		
		ConnectionHelper ch = DB.getConnectionHelper();
		
		PreparedStatement ps = null;
		try {
			 ch.beginTansaction();
			 long maxId = getMaxId(ch.getCon(), table, id);
			 long newId = maxId + 1;
			 dataMap.put(id, newId);
		 	 String sql = getInsertSQL(table,dataMap);
		 	 System.out.println(sql);
			 ps = ch.prepareStatement(sql);
			int idx=0;
			for(Entry<String,Object> entry : dataMap.entrySet()){
				idx++;
				if("imagen_final".equals(entry.getKey())){
					String sImg = ((String)entry.getValue()).substring("data:image/png;base64,".length());
					
					byte[] bImg64 = sImg.getBytes();
					byte[] bImg = Base64.getDecoder().decode(bImg64);
					 
					ps.setBytes(idx, bImg);
					
				}else
				if(entry.getValue() instanceof Date){
					Date d = (Date) entry.getValue();
					Timestamp ts = new Timestamp(d.getTime());
				   ps.setTimestamp(idx, ts); 	
				}else{
				   ps.setObject(idx, entry.getValue());
				}
			}
			int count = ps.executeUpdate();
			System.out.println("records updated "+count);
			ch.endTransaction();
			outcome = outcome+","+newId;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			outcome = e.getMessage();
		}finally{
			ch.closeAll();
		}
		
		
		return outcome;
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

	public Map<Long, String> getMap(String table, String key, String value) {
		Map<Long,String> map = new LinkedHashMap<Long,String>();
		map.put(-1L, "-- Seleccione --");
		String sql = "SELECT %KEY%,%VALUE% FROM %TABLE% ORDER BY %ORDER%"
				.replace("%KEY%", key)
				.replace("%VALUE%", value)
				.replace("%TABLE%",  table)
				.replace("%ORDER%",  value);
		
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

	public Map<Long, String> getMap(String table, String filterKey, Long filterValue, String key, String value) {
		Map<Long,String> map = new LinkedHashMap<Long,String>();
		map.put(-1L, "-- Seleccione --");
		String sql = "SELECT %KEY%,%VALUE% FROM %TABLE% WHERE %FILTER-KEY%=? ORDER BY %ORDER%"
				.replace("%KEY%", key)
				.replace("%VALUE%", value)
				.replace("%TABLE%",  table)
				.replace("%FILTER-KEY%",  filterKey)
				.replace("%ORDER%",  value);
		
		ConnectionHelper ch = DB.getConnectionHelper();
		try {
			PreparedStatement ps = ch.prepareStatement(sql);
			ps.setLong(1, filterValue);
			
			ResultSet rs = ch.executeQuery(ps);
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
	private  Long getMaxId(Connection con, String table, String key){
		Long max=-1L;
		String sql = "SELECT MAX(%KEY%) FROM %TABLE%"
				.replace("%KEY%", key)
				.replace("%TABLE%",  table);
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = con.prepareStatement(sql);
			rs = ps.executeQuery();
			if(rs.next()){
				max = rs.getLong(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			close(rs);
			close(ps);
		}
		
	   return max;			
	}

	private void close(ResultSet rs) {
		try {
			rs.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	private void close(PreparedStatement ps) {
		try {
			ps.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
