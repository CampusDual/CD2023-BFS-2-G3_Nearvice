package com.campusdual.ws.core.rest;

import com.campusdual.api.core.service.IRegisterService;
import com.campusdual.model.core.dao.UserDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/registers")
public class RegisterRestController extends ORestController<IRegisterService> {

	@Autowired
	private IRegisterService registerSrv;

	@Override
	public IRegisterService getService() {
		return this.registerSrv;
	}
	@RequestMapping(
		value = "/register",
		method = RequestMethod.POST,
		produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EntityResult> login() {

		return new ResponseEntity<>(HttpStatus.OK);
	}
}
