package com.springcore.constructorInjection;

public class Person {
    private String name;
    private int personid;
    private Certi certi;

    public Person(String name, int personid, Certi certi) {
        this.name = name;
        this.personid = personid;
        this.certi = certi;
    }

    @Override
    public String toString() {
        return "Name='" + name + "', personid=" + personid + ", certi=" + certi.name;
    }
}
