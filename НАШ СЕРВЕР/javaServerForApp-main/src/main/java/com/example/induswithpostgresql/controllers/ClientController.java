package com.example.induswithpostgresql.controllers;

import com.example.induswithpostgresql.model.clients.Client;
import com.example.induswithpostgresql.model.clients.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/client/get-all")
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PostMapping("/client/save")
    public Client save(@RequestBody Client client) {
        return clientService.save(client);
    }

    @PostMapping("/client/login")
    public ResponseEntity<?> loginUser(@RequestBody Client client) {
        List<String> userEmail = clientService.checkUserEmail(client.getEmail());
        if (userEmail.isEmpty()) {
            return new ResponseEntity<>("Почта не существует", HttpStatus.NOT_FOUND);
        }

// ВОТ ЭТО НУЖНО БУДЕТ ПЕРЕДЕЛАТЬ ЧЕРЕЗ BCrypto - хэширование пароля через спринг секьюрити
        if (!(clientService.getUserPasswordByEmail(client.getEmail())).equals(client.getPassword())) {
            return new ResponseEntity<>("Пароли не совпадают, попробуйте еще раз", HttpStatus.BAD_REQUEST);
        }

        Client client2 = clientService.getUserDetailsByEmail(client.getEmail());
        return new ResponseEntity<>(client2, HttpStatus.OK);
    }
}


