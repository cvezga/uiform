package com.cvezga.uiform.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ReplaceContentFilter implements Filter {
  protected FilterConfig config;

  public void init(FilterConfig config) throws ServletException {
    this.config = config;
  }

  public void destroy() {
  }

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws ServletException, IOException {
    ServletResponse newResponse = response;

    if (request instanceof HttpServletRequest) {
    	System.out.println(((HttpServletRequest)request).getRequestURL().toString());
    	response.setContentType("text/html");
      newResponse = new CharResponseWrapper((HttpServletResponse) response);
    }

    chain.doFilter(request, newResponse);

    if (newResponse instanceof CharResponseWrapper) {
      String text = newResponse.toString();
      if (text != null) {
        text = text.replace("{os_combo_ajax_control_timestamp}", String.valueOf(System.currentTimeMillis()));
        
        byte[] utf8JsonString = text.getBytes("Windows-1252");
        response.setContentLength(utf8JsonString.length);
		response.getOutputStream().write(utf8JsonString);
        response.getOutputStream().flush();      
      }
    }
  }
}


