package com.personaforge.personaforge_ai.persona.dto;

import com.personaforge.personaforge_ai.persona.entity.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePersonaRequest(

        @NotBlank
        String name,

        @NotBlank
        String role,

        @NotBlank
        String goal,

        @NotNull
        SkillLevel skillLevel,

        @NotNull
        CommunicationStyle communicationStyle,

        @NotNull
        TeachingStyle teachingStyle,

        @NotNull
        ResponseLength responseLength,

        Integer strictness,

        Boolean memoryPreference,

        String constraints
) {
}