package com.vvs.ordenservicio.db;

import org.postgresql.ds.PGPoolingDataSource;

import com.cvezga.uiform.Config;



public class PGPoolingDataSourceSingleton {

	/**
	 * 
	 * <?xml version="1.0" encoding="UTF-8"?>
<Context allowCasualMultipartParsing="true" antiJARLocking="true" path="/uploadImage">


<Resource name="jdbc/postgres" 
          auth="Container"
          type="javax.sql.DataSource" 
          driverClassName="org.postgresql.Driver"
          url="jdbc:postgresql://190.7.214.194:14432/telefonica_cliente"
          username="postgres" 
          password="pos_GREEN_BOX_2016" 
          maxActive="10" 
          maxIdle="5"
          maxWait="-1"    />

	 */
	private static PGPoolingDataSourceSingleton instance;
	static {
		instance = new PGPoolingDataSourceSingleton();
	}

	public  static PGPoolingDataSourceSingleton getInstance(){
		return instance;
	}

	private PGPoolingDataSource source;
	
	private PGPoolingDataSourceSingleton(){
		source = new PGPoolingDataSource();
		source.setDataSourceName(Config.getString("datasource.DataSourceName"));
		source.setServerName(Config.getString("datasource.ServerName"));
		source.setPortNumber(Config.getInt("datasource.PortNumber"));
		source.setDatabaseName(Config.getString("datasource.DatabaseName"));
		source.setUser(Config.getString("datasource.User"));
		source.setPassword(Config.getString("datasource.Password"));
		source.setMaxConnections(Config.getInt("datasource.MaxConnections"));
	}
	

	public PGPoolingDataSource getSource() {
		return this.source;
	}	
}
