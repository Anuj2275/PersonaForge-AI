package com.personaforge.personaforge_ai.exception;

import java.time.LocalDateTime;

public record ErrorResponse(

        LocalDateTime timestamp,

        int status,

        String message
) {
}