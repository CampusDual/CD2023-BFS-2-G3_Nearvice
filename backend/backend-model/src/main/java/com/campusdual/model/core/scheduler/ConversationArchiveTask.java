package com.campusdual.model.core.scheduler;

import com.campusdual.model.core.dao.AgreementDao;
import com.campusdual.model.core.dao.ConversationDao;
import com.campusdual.model.core.dao.MessageDao;
import com.campusdual.model.core.service.AgreementService;
import com.campusdual.model.core.service.ConversationService;
import com.ontimize.jee.common.db.SQLStatementBuilder.ExtendedSQLConditionValuesProcessor;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicExpression;
import com.ontimize.jee.common.db.SQLStatementBuilder.BasicField;
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

    final int timeLimitConversationDelay = -45;
    final int finishedServiceConversationDelay = -15;
    @Autowired
    private ConversationService conversationService;
    @Autowired
    private AgreementService agreementService;

    @Scheduled(cron = "0 0 10 * * *")
    private void conversationActivityChecker() {
        EntityResult timeLimitConversationCheckerResults = timeLimitConversationChecker();
        finishedServiceConversationChecker();
        if (!timeLimitConversationCheckerResults.isEmpty()) {
            List<Object> cids = (List<Object>) timeLimitConversationCheckerResults.get(ConversationDao.CID);
            for (Object cid : cids) {
                Map<String, Object> conversationUpdateMap = Map.of(ConversationDao.CACTIVE, false);
                Map<String, Object> cidKeyMap = Map.of(ConversationDao.CID, cid);
                conversationService.conversationUpdate(conversationUpdateMap, cidKeyMap);
                EntityResult cidsAgreementsResult = agreementService.agreementQuery(cidKeyMap, List.of(AgreementDao.AGID, AgreementDao.AGACCEPTED));
                if (!cidsAgreementsResult.isEmpty()) {
                    changeAgreementToFalse(cidsAgreementsResult);
                }
            }
        }
    }
    private void changeAgreementToFalse(EntityResult er){
        for (int i = 0; i < er.calculateRecordNumber(); i++) {
            Map<String, Object> item = er.getRecordValues(i);
            if (item.get(AgreementDao.AGACCEPTED) == null) {
                Map<String, Object> agreementKeyMap = Map.of(AgreementDao.AGID, item.get(AgreementDao.AGID));
                Map<String, Object> agreementUpdateMap = Map.of(AgreementDao.AGACCEPTED, false);
                agreementService.agreementUpdate(agreementUpdateMap, agreementKeyMap);
            }
        }
    }
    private EntityResult timeLimitConversationChecker(){
        BasicField dateTimeField = new BasicField(MessageDao.MDATETIME);
        BasicField finishDateTime = new BasicField(ConversationDao.CENDDATETIME);
        Calendar calendar = Calendar.getInstance();
        Date now = new Date();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, this.timeLimitConversationDelay);
        Date dateTime = calendar.getTime();
        Timestamp limitDateTime = new Timestamp(dateTime.getTime());
        BasicExpression cidExpression = new BasicExpression(dateTimeField, BasicOperator.LESS_EQUAL_OP, limitDateTime);
        BasicExpression isNull = new BasicExpression(finishDateTime,  BasicOperator.NULL_OP, null);
        BasicExpression complexExpression = new BasicExpression(cidExpression, BasicOperator.AND_OP, isNull);
        Map<String, Object> expressionMap = Map.of(ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, complexExpression);
        List<String> attrList = List.of(ConversationDao.CID);
        return conversationService.conversationLastMessageChecker(expressionMap, attrList);
    }
    private void finishedServiceConversationChecker() {
        BasicField endDateTimeField = new BasicField(ConversationDao.CENDDATETIME);
        Calendar calendar = Calendar.getInstance();
        Date now = new Date();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_MONTH, this.finishedServiceConversationDelay);
        Date dateTime = calendar.getTime();
        Timestamp limitDateTime = new Timestamp(dateTime.getTime());
        BasicExpression isFinishedExpression = new BasicExpression(endDateTimeField, BasicOperator.LESS_EQUAL_OP, limitDateTime);
        Map<String, Object> isFinishedExpressionMap = Map.of(ExtendedSQLConditionValuesProcessor.EXPRESSION_KEY, isFinishedExpression);
        List<String> isFinishedAttrList = List.of(ConversationDao.CID);
        EntityResult finishedConversations = conversationService.conversationIsFinishedChecker(isFinishedExpressionMap, isFinishedAttrList);
        if(!finishedConversations.isEmpty()){
            List<Object> cids = (List<Object>) finishedConversations.get(ConversationDao.CID);
            for (Object cid : cids) {
                Map<String, Object> conversationUpdateMap = Map.of(ConversationDao.CACTIVE, false);
                Map<String, Object> cidKeyMap = Map.of(ConversationDao.CID, cid);
                conversationService.conversationUpdate(conversationUpdateMap, cidKeyMap);
            }
        }
    }
}