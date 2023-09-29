package com.campusdual.ws.core.rest;

import com.campusdual.api.core.service.IServiceService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
