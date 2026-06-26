package com.personaforge.personaforge_ai.persona.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.personaforge.personaforge_ai.persona.entity.PersonaStatus;

public record PersonaResponse(

        Long id,

        String name,

        String role,

        String goal,

        String generatedPrompt,

        Double score,

        PersonaStatus status,

        LocalDateTime createdAt,

        LocalDateTime updatedAt,

        List<PromptVersionResponse> versions
) {
}