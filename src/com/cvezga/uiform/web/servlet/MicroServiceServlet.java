package com.cvezga.uiform.web.servlet;

import java.io.File;
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

import com.cvezga.uiform.BO;
import com.cvezga.uiform.Config;

/**
 * Servlet implementation class MicroServiceServlet
 */
public class MicroServiceServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	private static Map<String,String> paramMap = new HashMap<String,String>();
	private static Map<String,BO> requestHandlerMap = new HashMap<String,BO>();
	private static long CACHE_TIME = 5 * 60 * 1000; //5 Minutos
	
	//private static Cache cache;
    /**
     * Default constructor. 
     */
    public MicroServiceServlet() {
        // TODO Auto-generated constructor stub
    }

    @Override
    public void init(ServletConfig config) throws ServletException {
    	 super.init(config);
        Enumeration<String> param = config.getInitParameterNames();
        while(param.hasMoreElements()){
        	String pname = param.nextElement();
            synchronized (paramMap) {
            	if(paramMap.get(pname)==null){
            	   paramMap.put(pname, config.getInitParameter(pname));
            	}
            }
			
		}
		
        //String ecfile = getServletContext().getRealPath("WEB-INF/ehcache.xml");
		//CacheManager manager = CacheManager.newInstance(ecfile);
		//cache = manager.getCache("OrdenServicio");
		 
        String propFile = getServletContext().getRealPath("WEB-INF/application.properties");
        
        Config.load(new File(propFile));
        
        CACHE_TIME = Config.getInt("cache.browser.minutes") * 60 * 1000;
        
      
    }
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		/**
		String uri = request.getRequestURI();
		Element element = cache.get(uri);
		if (element != null) {
			String outcome = (String) element.getObjectValue();
			System.out.println("from cache:"+outcome);
			byte[] utf8JsonString = outcome.getBytes("UTF8");
			response.getOutputStream().write(utf8JsonString);
		}**/
		
		BO bo = getBO(request.getRequestURI());
		String outcome = "";
		if(bo!=null){
			
			Map<String, String> newMap = getNewMap(request.getParameterMap());
			newMap.put("model", request.getParameter("model"));
			outcome = bo.process(newMap);
			
			System.out.println("outcome:"+outcome);
		
		}
		
		long expiry = System.currentTimeMillis() + CACHE_TIME;

		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.setDateHeader("Expires", expiry);
		httpResponse.setHeader("Cache-Control", "max-age=" + CACHE_TIME / 1000);

		/**
		 * String jsonString = new Gson().toJson(objectToEncode); byte[]
		 * utf8JsonString = jsonString.getBytes("UTF8");
		 * responseToClient.write(utf8JsonString, 0, utf8JsonString.Length);
		 **/

		//cache.put(new Element(uri, outcome));
		byte[] utf8JsonString = outcome.getBytes("UTF8");

		response.getOutputStream().write(utf8JsonString);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String outcome = "";
		BO bo = getBO(request.getRequestURI());
		if(bo!=null){
			
			Map<String, String> newMap = getNewMap(request.getParameterMap());
			outcome = bo.process(newMap);
		
		}
		
		 byte[] utf8String = outcome.getBytes("UTF8");
		 response.getOutputStream().write(utf8String); 
		 
	}
	
	private BO getBO(String uri){
		BO bo = null;
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
		
		return bo;
	}

	private Map<String, String> getNewMap(Map<String, String[]> parameterMap) {
		Map<String, String> map = new HashMap<String,String>();
		for(Entry<String,String[]> entry : parameterMap.entrySet()){
			map.put(entry.getKey(), entry.getValue()[0]);
		}
		return map;
	}

	

}
