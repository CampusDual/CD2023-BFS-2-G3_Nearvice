package com.campusdual.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.Map;


public interface IRegisterService {
	public EntityResult userInsert(Map<?, ?> attrMap);
}
