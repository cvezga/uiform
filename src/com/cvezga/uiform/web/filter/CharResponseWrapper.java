package com.cvezga.uiform.web.filter;

import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

public class CharResponseWrapper extends HttpServletResponseWrapper {
	private MyServletOutputStream sos;
	
	public String toString() {
		return this.sos.toString();
	}

	public CharResponseWrapper(HttpServletResponse response) {
		super(response);
		sos = new MyServletOutputStream();
	}


    @Override
    public ServletOutputStream getOutputStream() throws IOException {
    	return this.sos;
    }	
}
