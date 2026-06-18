package com.personaforge.personaforge_ai.auth.dto;

public record UserResponse(

        Long id,

        String name,

        String email,

        String role
) {
}