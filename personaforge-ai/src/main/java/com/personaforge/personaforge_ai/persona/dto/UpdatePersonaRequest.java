package com.personaforge.personaforge_ai.persona.dto;

import com.personaforge.personaforge_ai.persona.entity.*;

public record UpdatePersonaRequest(

        String name,

        String role,

        String goal,

        SkillLevel skillLevel,

        CommunicationStyle communicationStyle,

        TeachingStyle teachingStyle,

        ResponseLength responseLength,

        Integer strictness,

        Boolean memoryPreference,

        String constraints
) {
}