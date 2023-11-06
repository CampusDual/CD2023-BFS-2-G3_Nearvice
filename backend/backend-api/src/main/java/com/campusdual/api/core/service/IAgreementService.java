package com.campusdual.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IAgreementService {
    public EntityResult agreementQuery(Map<?, ?> keyMap, List<?> attrList);
     public EntityResult agreementLastIdQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult agreementAllQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult agreementInsert(Map<?, ?> attrMap);
    public EntityResult agreementUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult agreementDelete(Map<?, ?> keyMap);
}
