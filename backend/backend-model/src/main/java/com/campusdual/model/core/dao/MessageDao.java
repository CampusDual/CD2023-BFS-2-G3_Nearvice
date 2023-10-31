package com.campusdual.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "MessageDao")
@ConfigurationFile(configurationFile = "dao/MessageDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class MessageDao extends OntimizeJdbcDaoSupport {

    public static final String MID = "M_ID";
    public static final String UEMITTER = "U_EMITTER";
    public static final String MMESSAGE= "M_MESSAGE";
    public static final String CID= "C_ID";
    public static final String MDATETIME= "M_DATETIME";
}
