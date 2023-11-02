package com.campusdual.model.core.scheduler;

import com.campusdual.model.core.dao.AgreementDao;
import com.campusdual.model.core.dao.ConversationDao;
import com.campusdual.model.core.dao.MessageDao;
import com.campusdual.model.core.service.AgreementService;
import com.campusdual.model.core.service.ConversationService;
import com.ontimize.jee.common.db.SQLStatementBuilder;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicField;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicOperator;
import com.ontimize.jee.common.dto.EntityResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.SQLOutput;
import java.sql.Timestamp;
import java.util.*;

@Configuration
@EnableScheduling
@Component
public class ConversationArchiveTask {

    @Autowired
    private ConversationService conversationService;
    @Autowired
    private AgreementService agreementService;

    @Scheduled(cron = "*/3 * * * * *")
    private void conversationActivityChecker() {
        BasicField dateTimeField = new BasicField(MessageDao.MDATETIME);

        Calendar calendar = Calendar.getInstance();
        Date now = new Date();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, -0);
        Date dateTime = calendar.getTime();
        Timestamp limitDateTime = new Timestamp(dateTime.getTime());

        BasicExpression cidExpression = new BasicExpression(dateTimeField, BasicOperator.LESS_EQUAL_OP, limitDateTime);

        Map<String, Object> userKeyMap = new HashMap<>();
        List<String> attrList = List.of(ConversationDao.CID);
        userKeyMap.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, cidExpression);

        EntityResult results = conversationService.conversationLastMessageChecker(userKeyMap, attrList);

        List<Object> cids = (List<Object>) results.get(ConversationDao.CID);
        for (Object cid : cids) {
            Map<String, Object> conversationUpdateMap = new HashMap<>();
            Map<String, Object> cidKeyMap = new HashMap<>();
            cidKeyMap.put(ConversationDao.CID,cid);
            //conversationUpdateMap.put(ConversationDao.CACTIVE, false);
            //conversationService.conversationUpdate(conversationUpdateMap, cidKeyMap);

            BasicField cidsAgreement = new BasicField(AgreementDao.AGCID);
            BasicExpression cidsAgreementsListExpression = new BasicExpression(cidsAgreement, BasicOperator.EQUAL_OP, cid);
            Map<String, Object> cidsAgreementsKeyMap = new HashMap<>();
            cidsAgreementsKeyMap.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, cidsAgreementsListExpression);
            List<String> agreementAgidsAttrList = List.of(AgreementDao.AGID, AgreementDao.AGACCEPTED);
            EntityResult cidsAgreementsResult = agreementService.agreementQuery(cidsAgreementsKeyMap, agreementAgidsAttrList);

            List<Object> cidsAgreementsAgids = (List<Object>) cidsAgreementsResult.get(AgreementDao.AGID);
            List<Object> cidsAgreementsAgAccepted = (List<Object>) cidsAgreementsResult.get(AgreementDao.AGACCEPTED);

                Object cidsAgreementsAgid = cidsAgreementsAgids.get(0);
                Object agAcceptedValue = cidsAgreementsAgAccepted.get(0);

                if (agAcceptedValue == null || !(Boolean) agAcceptedValue) {
                    Map<String, Object> agreementKeyMap = new HashMap<>();
                    Map<String, Object> agreementUpdateMap = new HashMap<>();
                    agreementUpdateMap.put(AgreementDao.AGACCEPTED, false);
                    agreementKeyMap.put(AgreementDao.AGID,cidsAgreementsAgid);
                    agreementService.agreementUpdate(agreementUpdateMap, agreementKeyMap);
                }

/*
            BasicField agAcceptedField = new BasicField(AgreementDao.AGACCEPTED);
            BasicExpression agNotAcceptedExpression = new BasicExpression(agAcceptedField, BasicOperator.NOT_EQUAL_OP, true);
            Map<String, Object> agNotAcceptedKeyMap = new HashMap<>();
            agNotAcceptedKeyMap.put(SQLStatementBuilder.ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, agNotAcceptedExpression);
            List<String> agNotAcceptedattrList = List.of(AgreementDao.AGACCEPTED);
            EntityResult agNotAcceptedResult = agreementService.agreementQuery(agNotAcceptedKeyMap, agNotAcceptedattrList);

            List<Object> agNotAcceptedCids = (List<Object>) agNotAcceptedResult.get(AgreementDao.AGCID);
            for (Object agNotAcceptedCid : agNotAcceptedCids) {
                Map<String, Object> agreementUpdateMap = new HashMap<>();
                cidKeyMap.put(AgreementDao.AGCID,agNotAcceptedCid);
                agreementUpdateMap.put(AgreementDao.AGACCEPTED, false);
                agreementService.agreementUpdate(agreementUpdateMap, cidKeyMap);
            }

 */
        }
    }
}