package com.vvs.ordenservicio;

import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;

public class OrdenServicioBOTest {

	@Test
	public void getFabricantestTest(){
		OrdenServicioBO bo = new OrdenServicioBO();
		
		Map<Long,String> map = bo.getFabricantes();
		
		for(Entry<Long,String> entry : map.entrySet()){
			System.out.println(entry.getKey()+":"+entry.getValue());
		}
	}
}
