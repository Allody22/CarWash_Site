package com.example.induswithpostgresql.model.clients;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//DAO - data access object
@Service
public class ClientService {
    @Autowired
    private ClientRepository repository;

    public Client save(Client client) {
        return repository.save(client);
    }

    /**
     * Get all clients with this email.
     * We need this function to check the existence of user by email
     * And check if there are two people with such email
     *
     * @param email email of the client
     * @return list of the clients with this email
     */
    public List<String> checkUserEmail(String email) {
        return repository.checkUserEmail(email);
    }

    //
    public String getUserPasswordByEmail(String email) {
        return repository.getUserPasswordByEmail(email);
    }

    public Client getUserDetailsByEmail(String email) {
        return repository.GetUserDetailsByEmail(email);
    }


    public List<Client> getAllClients() {
        List<Client> clients = new ArrayList<>();
        Streamable.of(repository.findAll())
                .forEach(clients::add);
        return clients;
    }

    public void delete(Client client) {
        repository.delete(client);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
}
