package com.example.induswithpostgresql.model.clients;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends CrudRepository<Client, Integer> {

    @Query(value = "SELECT email FROM clients WHERE email = :email ", nativeQuery = true)
    List<String> checkUserEmail(@Param("email") String email);

    @Query(value = "SELECT password FROM clients WHERE email = :email", nativeQuery = true)
    String getUserPasswordByEmail(@Param("email") String email);

    @Query(value = " SELECT * FROM clients WHERE email = :email", nativeQuery = true)
    Client GetUserDetailsByEmail(@Param("email") String email);

}
