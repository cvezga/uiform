package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DB {
	


	public static Connection getConnetion(){
		Connection connection = null;
		try {
			Class.forName("org.postgresql.Driver");
			connection = DriverManager.getConnection(
					   "jdbc:postgresql://190.7.214194:14432/telefonica_clinte","postgres", "pos_GREEN_BOX_2016");
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		 
		
		return connection;
	}
}
