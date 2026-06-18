package com.personaforge.personaforge_ai.exception;

public class PersonaNotFoundException
        extends RuntimeException {

    public PersonaNotFoundException(
            String message
    ) {
        super(message);
    }
}