package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.User;

public interface UserDao {

    int createUser(String newUser);
    boolean isUsernameTaken(String username);
    User getUserByUsername(String username);
    User getUserById(int userId);
}
