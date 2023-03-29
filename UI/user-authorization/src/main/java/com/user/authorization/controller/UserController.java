package com.user.authorization.controller;

import com.user.authorization.model.MessageResponse;
import com.user.authorization.model.Role;
import com.user.authorization.model.User;
import com.user.authorization.repository.IUserRepository;
import com.user.authorization.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/user")
public class UserController {


    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @GetMapping("/id")
    public ResponseEntity<?> findById(@RequestParam(name = "id") int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No user found!"));
    }

    @GetMapping("/get/non-admin-users/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> getNonAdminUsers(@PathVariable(name = "id")int id){
        Optional<Role> role = roleRepository.findById(1);
        Optional<List<User>> users = userRepository.findByRoleIdAndManagerId(role.get(), id);
        if(users.isPresent()){
            return ResponseEntity.ok(users.get());
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No user found!"));
    }

    @GetMapping("/get/non-admin-users/all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllNonAdminUsers(){
        Optional<Role> role = roleRepository.findById(1);
        Optional<Role> role2 = roleRepository.findById(2);
        List<Role> roles = new ArrayList<>();
        roles.add(role.get());
        roles.add(role2.get());
        Optional<List<User>> users = userRepository.findByRoleIdIn(roles);
        if(users.isPresent()){
            return ResponseEntity.ok(users.get());
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No user found!"));
    }

    @GetMapping("/email")
    public ResponseEntity<?> findByEmail(@RequestParam(name = "email") String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body(new MessageResponse("No user found!"));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") int id){
        try{
            userRepository.deleteById(id);
            return ResponseEntity.ok().body(new MessageResponse("User removed successfully!"));
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(new MessageResponse("Error while deleting user"));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateById(@PathVariable(name = "id") int id, @RequestBody User user){
        Optional<User> existingUser = userRepository.findById(id);
        if(existingUser.isPresent()){
            setUpdatedValues(existingUser.get(), user);
            return new ResponseEntity<>(userRepository.save(existingUser.get()), HttpStatus.OK);
        }
        else{
            return ResponseEntity.badRequest().body(new MessageResponse("No user found to update"));
        }
    }

    private void setUpdatedValues(User existingUser, User user) {
        if(null != user.getFirstName()){
            existingUser.setFirstName(user.getFirstName());
        }
        if(null != user.getLastName()){
            existingUser.setLastName(user.getLastName());
        }
        if(null != user.getEmail()){
            existingUser.setEmail(user.getEmail());
        }
        if(null != user.getPassword()){
            existingUser.setPassword(encoder.encode(user.getPassword()));
        }
        if(null != user.getManagerId()){
            existingUser.setManagerId(user.getManagerId());
        }
        if(null != user.getRole()){
            String strRoles = user.getRole().toLowerCase();
            Role userRole;
            if (strRoles == null) {
                userRole = roleRepository.findByName("ROLE_EMPLOYEE")
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            } else {
                switch (strRoles) {
                    case "manager":
                        userRole = roleRepository.findByName("ROLE_MANAGER")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

                        break;
                    case "employee":
                        userRole = roleRepository.findByName("ROLE_EMPLOYEE")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));;
                        break;
                    default:
                        userRole = roleRepository.findByName("ROLE_EMPLOYEE")
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                }
            }
            user.setRoleId(userRole);
        }
    }
}
