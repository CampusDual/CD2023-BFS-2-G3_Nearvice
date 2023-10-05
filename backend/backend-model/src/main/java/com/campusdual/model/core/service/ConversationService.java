package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IConversationService;
import com.campusdual.model.core.dao.ConversationDao;
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
public class ConversationService implements IConversationService {

    @Autowired
    private ConversationDao conversationDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;



    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult conversationQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(conversationDao, keyMap, attrList);
    }

    public EntityResult conversationEmitterQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("U_EMITTER",authentication.getName());
        return this.daoHelper.query(conversationDao, userKeyMap, attrList);
    }

    @Override
    public EntityResult conversationReceiverQuery(Map<?, ?> keyMap, List<?> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("U_RECEIVER",authentication.getName());
        return this.daoHelper.query(conversationDao, userKeyMap, attrList);
    }

    public EntityResult conversationAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(conversationDao, keyMap, attrList,"allDetailAnnounces");
    }

    public EntityResult conversationInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("U_EMITTER",authentication.getName());
        return this.daoHelper.insert(conversationDao, userKeyMap);
    }

    public EntityResult conversationUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(conversationDao, attrMap, keyMap);
    }

    public EntityResult conversationDelete(Map<?, ?> keyMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.delete(this.conversationDao, userKeyMap);
    }
}
