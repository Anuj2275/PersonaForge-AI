package com.personaforge.personaforge_ai.persona.dto;

import java.time.LocalDateTime;

public record PromptVersionResponse(

        Long id,

        Integer versionNumber,

        String promptContent,

        LocalDateTime createdAt
) {
}
