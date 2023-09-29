package com.campusdual.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "AnnounceDao")
@ConfigurationFile(configurationFile = "dao/AnnounceDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class AnnounceDao extends OntimizeJdbcDaoSupport {

    public static final String ID = "A_ID";
    public static final String USERID = "USER_";
    public static final String  SID= "S_ID";
    public static final String ADESCRIPTION = "A_DESCRIPTION";
}
