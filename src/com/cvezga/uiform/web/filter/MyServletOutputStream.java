package com.cvezga.uiform.web.filter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;

public class MyServletOutputStream extends ServletOutputStream {

	private ByteArrayOutputStream baos;
	private WriteListener writeListener;
	
	public MyServletOutputStream(){
		this.baos = new ByteArrayOutputStream(30000);
	}
	
	@Override
	public boolean isReady() {
		return true;
	}

	@Override
	public void setWriteListener(WriteListener writeListener) {
		this.writeListener = writeListener;
	}

	@Override
	public void write(int b) throws IOException {
		this.baos.write(b);
		 if (writeListener != null) {
             writeListener.notify();
         }
	}
	
	@Override
	public String toString() {
		try {
			return new String(this.baos.toByteArray(),"Windows-1252");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return new String(this.baos.toByteArray());
	}
	
	
}
