package com.vvs.ordenservicio;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ConnectionHelper {

	private Connection con;
	private PreparedStatement ps;
	private ResultSet rs;

	public ConnectionHelper(Connection con) {
		this.con = con;
	}

	public void closeAll() {
		closeResultSet();
		closePreparedStatement();
		closeConection();
	}

	private void closeResultSet() {
		try {
			if (rs != null) {
				this.rs.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private void closePreparedStatement() {
		try {
			if (ps != null) {
				this.ps.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private void closeConection() {
		try {
			if (con != null) {
				this.con.close();
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public Connection getCon() {
		return con;
	}

	public void setCon(Connection con) {
		this.con = con;
	}

	public PreparedStatement getPs() {
		return ps;
	}

	public void setPs(PreparedStatement ps) {
		this.ps = ps;
	}

	public ResultSet getRs() {
		return rs;
	}

	public void setRs(ResultSet rs) {
		this.rs = rs;
	}

	public PreparedStatement prepareStatement(String sql) {

		try {
			this.ps = this.con.prepareStatement(sql);
			return this.ps;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public ResultSet executeQuery() {
		try {
			this.rs = this.ps.executeQuery();
			return this.rs;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public ResultSet executeQuery(String sql) {
		try {
			this.ps = this.con.prepareStatement(sql);
			this.rs = this.ps.executeQuery();
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void beginTansaction() throws SQLException {
		this.con.setAutoCommit(false);

	}

	public void endTransaction() throws SQLException {
		this.con.commit();

	}

	public ResultSet executeQuery(PreparedStatement ps) {
		try {
			this.rs = this.ps.executeQuery();
			return rs;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}
}
