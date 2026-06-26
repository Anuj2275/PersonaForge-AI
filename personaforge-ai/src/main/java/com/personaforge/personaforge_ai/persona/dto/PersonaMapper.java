package com.personaforge.personaforge_ai.persona.dto;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import java.util.List;
import java.util.stream.Collectors;

public class PersonaMapper {

    public static PersonaResponse toResponse(Persona persona) {

        List<PromptVersionResponse> versions = (persona.getVersions() != null) 
            ? persona.getVersions().stream()
                .map(v -> new PromptVersionResponse(
                    v.getId(),
                    v.getVersionNumber(),
                    v.getPromptContent(),
                    v.getCreatedAt()
                ))
                .collect(Collectors.toList())
            : List.of();

        return new PersonaResponse(
                persona.getId(),
                persona.getName(),
                persona.getRole(),
                persona.getGoal(),
                persona.getGeneratedPrompt(),
                persona.getScore(),
                persona.getStatus(),
                persona.getCreatedAt(),
                persona.getUpdatedAt(),
                versions
        );
    }
}