package com.campusdual.model.core.service;

import com.campusdual.api.core.service.IAnnounceService;
import com.campusdual.model.core.dao.AgreementDao;
import com.campusdual.model.core.dao.AnnounceDao;
import com.campusdual.model.core.dao.UserDao;
import com.campusdual.model.core.utils.CalculateDistances;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.common.dto.EntityResultTools;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Lazy
@Service("AnnounceService")
public class AnnounceService implements IAnnounceService {

    @Autowired
    private AnnounceDao announceDao;
    @Autowired
    private AgreementDao agreementDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;
    @Autowired
    private UserService userService;


    public EntityResult announceQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.query(announceDao, userKeyMap, attrList);
    }
    public EntityResult agreementsConversationsAnnouncesQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.query(announceDao, userKeyMap, attrList, "agreementsConversationsAnnounces");
    }

    public EntityResult agreementsConversationsUserAnnouncesQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(announceDao, keyMap, attrList, "agreementsConversationsUserAnnounces");
    }

    public EntityResult announceAllQuery(Map<?, ?> keyMap, List<?> attrList) throws OntimizeJEERuntimeException {
        CalculateDistances calculateDistances= new CalculateDistances();
        List<String> userLocation = new ArrayList<>();
        userLocation.add(UserDao.LONGITUDE);
        userLocation.add(UserDao.LATITUDE);
        EntityResult queryUserLocation = userService.userLocationQuery(userLocation);
        Map<String,BigDecimal> userAuthenticated = queryUserLocation.getRecordValues(0);
        BigDecimal userLongitude = userAuthenticated.get(UserDao.LONGITUDE);
        BigDecimal userLatitude = userAuthenticated.get(UserDao.LATITUDE);
        double userlong = userLongitude.doubleValue();
        List<Map> recordList = new ArrayList<>();
        //Map<String, Object> distances = new HashMap<>();
        //List<Double> distanceList = new ArrayList<>();
        EntityResult queryAllResult = this.daoHelper.query(announceDao, keyMap, attrList, "allDetailAnnounces");
       if (queryAllResult.getCode() == EntityResult.OPERATION_SUCCESSFUL) {
           ArrayList<Double> listDistance = new ArrayList<>();
           ArrayList<Double> listDefaultDistance = Stream.generate(() -> 0.0).limit(queryAllResult.calculateRecordNumber()).collect(Collectors.toCollection(ArrayList::new));

           for (int i = 0; i < queryAllResult.calculateRecordNumber(); i++) {
               //Map<String, Object> record = queryAllResult.getRecordValues(i);

               double distanceCalculated = calculateDistances.calculateDistance(userLatitude.doubleValue(), userLongitude.doubleValue(), (double) queryAllResult.getRecordValues(i).get(AnnounceDao.ALATITUDE), (double) queryAllResult.getRecordValues(i).get(AnnounceDao.ALONGITUDE));
               //queryAllResult.getRecordValues(i).put("DISTANCE", distanceCalculated);
               listDistance.add(distanceCalculated);

           }
           queryAllResult.put("DISTANCE", listDistance);




            /*List<Double> latitudeList = (List<Double>) queryAllResult.get(AnnounceDao.ALATITUDE);
            List<Double> longitudeList = (List<Double>) queryAllResult.get(AnnounceDao.ALONGITUDE);
            if (latitudeList != null && longitudeList != null) {
                for (int i = 0; i < latitudeList.size(); i++) {
                    Double latitude = latitudeList.get(i);
                    Double longitude = longitudeList.get(i);
                    double distance = 0.0;
                    distanceList.add(distance);
                }
                distances.put("DISTANCE", distanceList);
            }
        }
        queryAllResult.putAll(distances);*/


           EntityResult toret = new EntityResultMapImpl();
//        EntityResult toret = new EntityResultMapImpl(List.copyOf(set));
           ArrayList<Double> listSorted = listDistance.stream().sorted().collect(Collectors.toCollection(ArrayList::new));
           Collections.reverse(listSorted);
           for (Double d : listSorted) {
               int index = listDistance.indexOf(d);
               toret.addRecord(queryAllResult.getRecordValues(index));
           }
       }






        System.out.println(queryAllResult);
        return queryAllResult;
    }


    public EntityResult announceInsert(Map<?, ?> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) attrMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.insert(announceDao, userKeyMap);
    }

    public EntityResult announceUpdate(Map<?, ?> attrMap, Map<?, ?> keyMap) {
        return this.daoHelper.update(announceDao, attrMap, keyMap);
    }

    public EntityResult announceDelete(Map<?, ?> keyMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
        userKeyMap.put("USER_",authentication.getName());
        return this.daoHelper.delete(this.announceDao, userKeyMap);
    }
}
