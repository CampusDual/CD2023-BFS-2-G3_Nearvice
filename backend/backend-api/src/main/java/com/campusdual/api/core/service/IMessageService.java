package com.campusdual.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IMessageService {
    public EntityResult messageQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult messageAllQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult messageInsert(Map<?, ?> attrMap);
    public EntityResult messageUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult messageDelete(Map<?, ?> keyMap);
}
