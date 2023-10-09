package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IAnnounceService;
import com.campusdual.model.core.dao.AnnounceDao;
import com.campusdual.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.common.security.PermissionsProviderSecured;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Lazy
@Service("AnnounceService")
public class AnnounceService implements IAnnounceService {

    @Autowired
    private AnnounceDao announceDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    public EntityResult announceQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.query(announceDao, userKeyMap, attrList);
    }

    public EntityResult announceAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(announceDao, keyMap, attrList,"allDetailAnnounces");
    }

    public EntityResult announceInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.insert(announceDao, userKeyMap);
    }

    public EntityResult announceUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(announceDao, attrMap, keyMap);
    }

    public EntityResult announceDelete(Map<?, ?> keyMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.delete(this.announceDao, userKeyMap);
    }
}
