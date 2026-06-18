package com.personaforge.personaforge_ai.prompt.dto;

import jakarta.validation.constraints.NotNull;

public record GeneratePromptRequest(

        @NotNull
        Long personaId
) {
}