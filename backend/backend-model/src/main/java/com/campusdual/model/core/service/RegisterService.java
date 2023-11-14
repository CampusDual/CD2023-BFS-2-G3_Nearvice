package com.campusdual.model.core.service;


import com.campusdual.api.core.service.IRegisterService;
import com.campusdual.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;


@Lazy
@Service("RegisterService")
public class RegisterService implements IRegisterService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;

	public EntityResult userInsert(Map<?, ?> attrMap) {
		try{
		return this.daoHelper.insert(userDao, attrMap);
		}catch(org.springframework.dao.DuplicateKeyException exception){
			System.out.println("error");
			EntityResult errorEr = new EntityResultMapImpl();
			errorEr.setCode(EntityResult.OPERATION_WRONG);
			errorEr.setMessage("ERROR_DUPLICATE_USER_ID");
			return errorEr;
		}
	}
}
