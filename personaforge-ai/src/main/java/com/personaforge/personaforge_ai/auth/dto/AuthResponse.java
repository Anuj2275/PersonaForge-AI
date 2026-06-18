package com.personaforge.personaforge_ai.auth.dto;
public record AuthResponse(

        String token,

        String email,

        String role
) {
}
