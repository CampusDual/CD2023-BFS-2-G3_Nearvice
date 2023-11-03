package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IConversationService;
import com.campusdual.model.core.dao.ConversationDao;
import com.campusdual.model.core.dao.MessageDao;
import com.ontimize.jee.common.db.SQLStatementBuilder;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("ConversationService")
public class ConversationService implements IConversationService {

    @Autowired
    private ConversationDao conversationDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    public EntityResult conversationQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(conversationDao, keyMap, attrList,"detailConversations");
    }

    public EntityResult conversationMessageEmitterQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("U_CLIENT",authentication.getName());
        return this.daoHelper.query(conversationDao, userKeyMap, attrList,"lastConversationMessages");
    }

    public EntityResult conversationMessageReceiverQuery(Map<?, ?> keyMap, List<?> attrList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.query(conversationDao, userKeyMap, attrList, "lastConversationMessages");
    }

    public EntityResult conversationInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("U_CLIENT",authentication.getName());
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

    public EntityResult conversationLastMessageChecker(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(conversationDao, keyMap, attrList,"lastConversationMessages");
    }
    public EntityResult conversationIsFinishedChecker(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(conversationDao, keyMap, attrList,"conversationFinishedService");
    }
}
