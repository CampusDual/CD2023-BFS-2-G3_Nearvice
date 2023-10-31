package com.campusdual.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "ConversationDao")
@ConfigurationFile(configurationFile = "dao/ConversationDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class ConversationDao extends OntimizeJdbcDaoSupport {

    public static final String CID = "C_ID";
    public static final String AID = "A_ID";
    public static final String UCLIENT= "U_CLIENT";
    public static final String CACTIVE = "C_ACTIVE";
}
