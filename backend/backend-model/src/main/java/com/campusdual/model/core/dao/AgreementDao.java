package com.campusdual.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "AgreementDao")
@ConfigurationFile(configurationFile = "dao/AgreementDao.xml", configurationFilePlaceholder = "dao/placeholders.properties")
public class AgreementDao extends OntimizeJdbcDaoSupport {

    public static final String ID = "AG_ID";
    public static final String CID = "C_ID";
    public static final String  AGDATETIME= "AG_DATETIME";
    public static final String AGPLACE = "AG_PLACE";
    public static final String AGDESCRIPTION = "AG_DESCRIPTION";
    public static final String AGPRICE = "AG_PRICE";
    public static final String AGSTATUS = "AG_STATUS";
}
