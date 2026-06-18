package com.personaforge.personaforge_ai.persona.dto;

public record PersonaResponse(

        Long id,

        String name,

        String role,

        String goal,

        String generatedPrompt,

        Double score
) {
}