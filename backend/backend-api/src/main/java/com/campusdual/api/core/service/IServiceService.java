package com.campusdual.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

public interface IServiceService {
    public EntityResult serviceQuery(Map<?, ?> keyMap, List<?> attrList);
    public EntityResult serviceInsert(Map<?, ?> attrMap);
    public EntityResult serviceUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap);
    public EntityResult serviceDelete(Map<?, ?> keyMap);
}
