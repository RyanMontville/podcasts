package com.ryanmontville.server.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JdbcUserDao implements UserDao {

    private final JdbcTemplate jdbcTemplate;
    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public int createUser(String newUser) {
        String sql = "INSERT INTO public.users(username) " +
                "VALUES (?) RETURNING user_id;";
        Integer userId = jdbcTemplate.queryForObject(sql,Integer.class, newUser);
        return userId;
    }

    @Override
    public boolean isUsernameTaken(String username) {
        String sql = "SELECT username FROM public.users WHERE username = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, username);
        if(result.next()) {
            return true;
        }
        return false;
    }
}
