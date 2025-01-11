package com.constructorInjection;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public static void main(String[] args) {
        try (ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "com/constructorInjection/ciconfig.xml")) {
            Person p = (Person) context.getBean("person");
            System.out.println(p);
        }
    }
}
