package com.personaforge.personaforge_ai.persona.dto;

import com.personaforge.personaforge_ai.persona.entity.Persona;

public class PersonaMapper {

    public static PersonaResponse toResponse(Persona persona) {

        return new PersonaResponse(
                persona.getId(),
                persona.getName(),
                persona.getRole(),
                persona.getGoal(),
                persona.getGeneratedPrompt(),
                persona.getScore()
        );
    }
}