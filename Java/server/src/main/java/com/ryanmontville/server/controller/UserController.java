package com.ryanmontville.server.controller;

import com.ryanmontville.server.dao.JdbcUserDao;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin
public class UserController {

    private JdbcUserDao userDao;

    public UserController(JdbcUserDao userDao) {
        this.userDao = userDao;
    }

    /*************************************** GETS **************************************/
    /*************************************** POST **************************************/
    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/users", method = RequestMethod.POST)
    public int newUser(@RequestBody String username) throws Exception {
        boolean isUsernameTaken = userDao.isUsernameTaken(username);
        if(isUsernameTaken) {
            throw new ResponseStatusException(HttpStatus.IM_USED, "Username already taken.");
        } else {
            return userDao.createUser(username);
        }
    }

    /*************************************** PUTS **************************************/
    /************************************* DELETES *************************************/

}
