package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.User;
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
    public boolean isUsernameTaken(String username) {
        String sql = "SELECT username FROM public.users WHERE username = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, username);
        if(result.next()) {
            return true;
        }
        return false;
    }

    public User getUserByUsername(String username) {
        User user = null;
        String sql = "SELECT user_id, username FROM public.users WHERE username = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, username);
        if(result.next()) {
            user = mapRowToUser(result);
        }
        return user;
    }
    @Override
    public int createUser(String newUser) {
        String sql = "INSERT INTO public.users(username) " +
                "VALUES (?) RETURNING user_id;";
        Integer userId = jdbcTemplate.queryForObject(sql,Integer.class, newUser);
        return userId;
    }

    private User mapRowToUser(SqlRowSet rowSet) {
        User user = new User();
        user.setUserId(rowSet.getInt("user_id"));
        user.setUsername(rowSet.getString("username"));
        return user;
    }
}
