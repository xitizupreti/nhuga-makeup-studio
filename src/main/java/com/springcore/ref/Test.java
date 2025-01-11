package com.springcore.ref;

import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("com/springcore/ref/refconfig.xml");
        try {
            A a = (A) context.getBean("aref");
            System.out.println(a.getX());
            System.out.println(a.getOb().getY());
            System.out.println(a);
        } finally {
            context.close();
        }
    }
}
