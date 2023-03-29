package com.user.usermanagement.util;

import com.user.usermanagement.model.User;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RestTemplateUtil {


    private RestTemplate restTemplate = new RestTemplate();

    public User getUser(String email, String header){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", header);
        ResponseEntity<User> response = restTemplate.exchange(
                "http://localhost:8082/user/email?email=" + email,
                HttpMethod.GET,
                new HttpEntity<>("parameters", headers),
                User.class
        );

        return response.getBody();
    }

    public List<Integer> getSubordinateIds(int id, String header){

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", header);
        ResponseEntity<List> response = restTemplate.exchange(
                "http://localhost:8082/user/get/non-admin-users/" + id,
                HttpMethod.GET,
                new HttpEntity<>("parameters", headers),
                List.class
        );
        List<LinkedHashMap> subs = response.getBody();
        List<Integer> subIds = new ArrayList<>();
        for(LinkedHashMap<String,?> obj : subs){
            subIds.add((Integer) obj.get("userId"));
        }
        return subIds;
    }
}
