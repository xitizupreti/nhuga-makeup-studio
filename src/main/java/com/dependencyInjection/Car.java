package com.dependencyInjection;

public class Car {
    private String model;

    // Setter for dependency injection
    public void setModel(String model) {
        this.model = model;
    }

    public void drive() {
        System.out.println("Driving a " + model);
    }

    // Override the toString() method
    @Override
    public String toString() {
        return "Car model: " + model;
    }
}
