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

    @Scheduled(cron = "0 0 10 * * *")
    private void conversationActivityChecker() {
        BasicField dateTimeField = new BasicField(MessageDao.MDATETIME);

        Calendar calendar = Calendar.getInstance();
        Date now = new Date();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, -45);
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
            conversationUpdateMap.put(ConversationDao.CACTIVE, false);
            conversationService.conversationUpdate(conversationUpdateMap, cidKeyMap);

            Map<String, Object> agreementUpdateMap = new HashMap<>();
            cidKeyMap.put(AgreementDao.CID,cid);
            agreementUpdateMap.put(AgreementDao.AGSTATUS, false);
            agreementService.agreementUpdate(agreementUpdateMap, cidKeyMap);
        }
    }
}