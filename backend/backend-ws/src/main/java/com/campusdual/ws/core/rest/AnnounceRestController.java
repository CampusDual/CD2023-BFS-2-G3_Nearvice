package com.campusdual.ws.core.rest;

import com.campusdual.api.core.service.IAnnounceService;
import com.campusdual.api.core.service.IUserService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/announces")
public class AnnounceRestController extends ORestController<IAnnounceService> {

    @Autowired
    private IAnnounceService announceService;
    @Override
    public IAnnounceService getService(){
        return this.announceService;
    }
}
