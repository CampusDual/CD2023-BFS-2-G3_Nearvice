package com.campusdual.ws.core.rest;

import com.campusdual.api.core.service.IMessageService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
public class MessageRestController extends ORestController<IMessageService> {

    @Autowired
    private IMessageService messageService;
    @Override
    public IMessageService getService(){
        return this.messageService;
    }
}
