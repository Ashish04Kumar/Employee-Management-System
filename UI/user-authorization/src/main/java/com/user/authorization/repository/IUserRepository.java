package com.user.authorization.repository;

import com.user.authorization.model.Role;
import com.user.authorization.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<List<User>> findByRoleIdAndManagerId(Role role, int managerId);

    Optional<List<User>> findByRoleId(Role role);

    Optional<List<User>> findByRoleIdIn(List<Role> roles);
}
