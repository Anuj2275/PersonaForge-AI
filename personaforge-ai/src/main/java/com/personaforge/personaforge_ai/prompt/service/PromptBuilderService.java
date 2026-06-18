package com.personaforge.personaforge_ai.prompt.service;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import org.springframework.stereotype.Service;

@Service
public class PromptBuilderService {

    public String buildPrompt(
            Persona persona
    ) {

        return """
                You are an expert %s.

                Goal:
                %s

                Skill Level:
                %s

                Communication Style:
                %s

                Teaching Style:
                %s

                Response Length:
                %s

                Strictness:
                %d/10

                Memory Preference:
                %s

                Constraints:
                %s
                """
                .formatted(
                        persona.getName(),
                        persona.getGoal(),
                        persona.getSkillLevel(),
                        persona.getCommunicationStyle(),
                        persona.getTeachingStyle(),
                        persona.getResponseLength(),
                        persona.getStrictness(),
                        Boolean.TRUE.equals(
                                persona.getMemoryPreference()
                        ) ? "Enabled" : "Disabled",
                        persona.getConstraints()
                );
    }
}