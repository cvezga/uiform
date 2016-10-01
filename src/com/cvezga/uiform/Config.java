package com.cvezga.uiform;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class Config {

	private static Properties prop;

	public static void load(File propFile) {
		prop = new Properties();

		try {
			prop.load(new FileReader(propFile));
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static String getString(String key) {
		String value = null;

		try {
			value = prop.getProperty(key);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
	
	public static int getInt(String key) {
		int value = 0;

		try {
			String svalue = prop.getProperty(key);
			value = Integer.parseInt(svalue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
}
