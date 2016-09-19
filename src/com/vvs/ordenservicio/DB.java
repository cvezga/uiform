package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {
	

	private static String host = "190.7.214.194";
	private static String port = "14432";
	private static String user = "postgres";
	private static String pass = "pos_GREEN_BOX_2016";
	private static String sche = "telefonica_clinte";
	
	public static Connection getConnetion(){
		Connection connection = null;
		try {
			Class.forName("org.postgresql.Driver");
			connection = DriverManager.getConnection(
					   "jdbc:postgresql://"+host+":"+port+"/"+sche, user, pass);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		 
		
		return connection;
	}
	
	public static ConnectionHelper getConnectionHelper(){
		ConnectionHelper ch = new ConnectionHelper(getConnetion());
		return ch;
	}
}
