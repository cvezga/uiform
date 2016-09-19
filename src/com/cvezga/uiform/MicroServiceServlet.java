package com.cvezga.uiform;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class MicroServiceServlet
 */
public class MicroServiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Map<String,String> paramMap = new HashMap<String,String>();
	private static Map<String,BO> requestHandlerMap = new HashMap<String,BO>();
	
    /**
     * Default constructor. 
     */
    public MicroServiceServlet() {
        // TODO Auto-generated constructor stub
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
        Enumeration<String> param = config.getInitParameterNames();
        while(param.hasMoreElements()){
        	String pname = param.nextElement();
            synchronized (paramMap) {
            	if(paramMap.get(pname)==null){
            	   paramMap.put(pname, config.getInitParameter(pname));
            	}
            }
			
		}
       super.init(config);
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BO bo = null;
		String uri = request.getRequestURI();
		int idx1 = uri.lastIndexOf("/");
		int idx2 = uri.lastIndexOf(".ms");
		if(idx1>-1 && idx1<idx2){
			String req = uri.substring(idx1+1,idx2+3);
			bo = requestHandlerMap.get(req);
			if(bo==null){
				String classname = paramMap.get(req);
				try {
					bo = (BO)getClass().forName(classname).newInstance();
				} catch (InstantiationException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				synchronized (requestHandlerMap) {
					requestHandlerMap.put(req, bo);
				}
			
			}
		}
		if(bo!=null){
			
			Map<String, String> newMap = getNewMap(request.getParameterMap());
			String outcome = bo.process(newMap);
		
		}
		doGet(request, response);
	}

	private Map<String, String> getNewMap(Map<String, String[]> parameterMap) {
		Map<String, String> map = new HashMap<String,String>();
		for(Entry<String,String[]> entry : parameterMap.entrySet()){
			map.put(entry.getKey(), entry.getValue()[0]);
		}
		return map;
	}

	

}
