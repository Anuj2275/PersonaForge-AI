package com.personaforge.personaforge_ai.exception;

public class UnauthorizedPersonaAccessException
        extends RuntimeException {

    public UnauthorizedPersonaAccessException(
            String message
    ) {
        super(message);
    }
}