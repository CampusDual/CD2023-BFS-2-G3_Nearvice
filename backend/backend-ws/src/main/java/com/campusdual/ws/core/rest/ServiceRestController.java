package com.campusdual.ws.core.rest;

import com.campusdual.api.core.service.IAnnounceService;
import com.campusdual.api.core.service.IServiceService;
import com.campusdual.api.core.service.IUserService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/services")
public class ServiceRestController extends ORestController<IServiceService> {
    @Autowired
    private IServiceService serviceService;
    @Override
    public IServiceService getService(){
        return this.serviceService;
    }
}
