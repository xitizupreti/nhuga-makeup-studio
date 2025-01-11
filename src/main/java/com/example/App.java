package com.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        // Load the Spring configuration file
        ApplicationContext context = new ClassPathXmlApplicationContext("config.xml");

        // Retrieve the Car bean
        Car car = (Car) context.getBean("car1");

        // Use the Car object
        car.drive();

        System.out.println("The car is a " + car);
    }
}
