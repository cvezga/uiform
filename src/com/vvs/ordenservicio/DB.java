package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DB {

	private static String host = "190.7.214.194";
	private static String port = "14432";
	private static String user = "postgres";
	private static String pass = "pos_GREEN_BOX_2016";
	private static String sche = "telefonica_cliente";

	/**
	public void DS() {
		InitialContext cxt = new InitialContext();
		if (cxt == null) {
			throw new Exception("Uh oh -- no context!");
		}

		DataSource ds = (DataSource) cxt.lookup("java:/comp/env/jdbc/postgres");

		if (ds == null) {
			throw new Exception("Data source not found!");

			// ---------------

			Context initContext = new InitialContext();
			Context envContext = (Context) initContext.lookup("java:/comp/env");
			DataSource ds = (DataSource) envContext.lookup("jdbc/myoracle");
			Connection conn = ds.getConnection();
			// etc.
		}
	}
	**/

	public static Connection getConnection() {
		Connection connection = null;
		try {
			Class.forName("org.postgresql.Driver");
			connection = DriverManager.getConnection("jdbc:postgresql://" + host + ":" + port + "/" + sche, user, pass);

			if (connection == null) {
				System.out.println("Connection error");
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return connection;
	}

	public static ConnectionHelper getConnectionHelper() {
		ConnectionHelper ch = new ConnectionHelper(getConnection());
		return ch;
	}
}
