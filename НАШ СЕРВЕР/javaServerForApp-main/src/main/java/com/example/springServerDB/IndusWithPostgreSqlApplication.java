package com.example.springServerDB;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.springServerDB")
public class IndusWithPostgreSqlApplication {

	public static void main(String[] args) {
		SpringApplication.run(IndusWithPostgreSqlApplication.class, args);
	}

}
