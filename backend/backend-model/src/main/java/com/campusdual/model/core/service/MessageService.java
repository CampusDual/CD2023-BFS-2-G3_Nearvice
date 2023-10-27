package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IMessageService;
import com.campusdual.model.core.dao.ConversationDao;
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
    private ConversationService conversationService;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;



    public EntityResult messageQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(messageDao, keyMap, attrList,"allDetailMessages");
    }

    public EntityResult messageAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(messageDao, keyMap, attrList,"allDetailMessages");
    }

    public EntityResult messageInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> result = new HashMap<>();
        result.put(ConversationDao.CID, attrMap.get(ConversationDao.CID));
        EntityResult conversationEntityResult = null;
        if (attrMap.get(ConversationDao.CID) == null) {
            Map<String, Object> coversationMap = new HashMap<>();
            coversationMap.put(ConversationDao.AID, attrMap.get(ConversationDao.AID));
            coversationMap.put(MessageDao.UEMITTER, authentication.getName());
            conversationEntityResult = conversationService.conversationInsert(coversationMap);
            result.put(ConversationDao.CID, conversationEntityResult.get(ConversationDao.CID));
        }
        Map<String, Object> messageMap = new HashMap<>();
        messageMap.put(MessageDao.MMESSAGE, attrMap.get(MessageDao.MMESSAGE));
        messageMap.put(MessageDao.UEMITTER, authentication.getName());
        messageMap.put(ConversationDao.CID, result.get(ConversationDao.CID));
        EntityResult entityResult2 = this.daoHelper.insert(messageDao, messageMap);
        return (conversationEntityResult != null) ? conversationEntityResult : entityResult2;
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
