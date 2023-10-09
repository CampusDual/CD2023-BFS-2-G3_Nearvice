package com.campusdual.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IConversationService {
    public EntityResult conversationQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult conversationMessageEmitterQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult conversationMessageReceiverQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult conversationInsert(Map<?, ?> attrMap);
    public EntityResult conversationUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult conversationDelete(Map<?, ?> keyMap);
}
