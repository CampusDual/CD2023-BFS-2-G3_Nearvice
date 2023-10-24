package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IAgreementService;
import com.campusdual.model.core.dao.AgreementDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("AgreementService")

public class AgreementService implements IAgreementService {

    @Autowired
    private AgreementDao agreementDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    public EntityResult agreementQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
           return this.daoHelper.query(agreementDao, keyMap, attrList);
    }

    public EntityResult agreementAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(agreementDao, keyMap, attrList);
    }

    public EntityResult agreementInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.insert(agreementDao, userKeyMap);
    }

    public EntityResult agreementUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(agreementDao, attrMap, keyMap);
    }

    public EntityResult agreementDelete(Map<?, ?> keyMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.delete(this.agreementDao, userKeyMap);
    }
}
