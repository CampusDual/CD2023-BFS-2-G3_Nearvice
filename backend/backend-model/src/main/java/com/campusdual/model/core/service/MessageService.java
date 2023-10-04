package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IMessageService;
import com.campusdual.model.core.dao.MessageDao;
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
@Service("MessageService")
public class MessageService implements IMessageService {

    @Autowired
    private MessageDao messageDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;



    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult messageQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(messageDao, keyMap, attrList);
    }

    public EntityResult messageEmitterQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("U_EMITTER",authentication.getName());
        return this.daoHelper.query(messageDao, userKeyMap, attrList);
    }

    @Override
    public EntityResult messageReceiverQuery(Map<?, ?> keyMap, List<?> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("U_RECEIVER",authentication.getName());
        return this.daoHelper.query(messageDao, userKeyMap, attrList);
    }

    public EntityResult messageAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(messageDao, keyMap, attrList,"allDetailAnnounces");
    }

    public EntityResult messageInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("U_EMITTER",authentication.getName());
        return this.daoHelper.insert(messageDao, userKeyMap);
    }

    public EntityResult messageUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(messageDao, attrMap, keyMap);
    }

    public EntityResult messageDelete(Map<?, ?> keyMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.delete(this.messageDao, userKeyMap);
    }
}
