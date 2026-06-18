package com.personaforge.personaforge_ai.prompt.service;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import com.personaforge.personaforge_ai.prompt.dto.PromptScoreResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PromptScoringService {

    public PromptScoreResponse scorePrompt(
            Persona persona
    ) {

        double score = 0;

        List<String> strengths =
                new ArrayList<>();

        List<String> missing =
                new ArrayList<>();

        List<String> suggestions =
                new ArrayList<>();


        if(persona.getGoal() != null &&
                !persona.getGoal().isBlank()) {

            score += 2;
            strengths.add(
                    "Clear goal defined"
            );
        } else {

            missing.add(
                    "Goal"
            );
        }


        if(persona.getCommunicationStyle() != null) {

            score += 2;
            strengths.add(
                    "Communication style defined"
            );
        } else {

            missing.add(
                    "Communication style"
            );
        }


        if(persona.getTeachingStyle() != null) {

            score += 2;
            strengths.add(
                    "Teaching style defined"
            );
        } else {

            missing.add(
                    "Teaching style"
            );
        }


        if(persona.getConstraints() != null &&
                !persona.getConstraints().isBlank()) {

            score += 2;
            strengths.add(
                    "Constraints provided"
            );
        } else {

            missing.add(
                    "Constraints"
            );
        }


        if(persona.getResponseLength() != null) {

            score += 2;
            strengths.add(
                    "Response length defined"
            );
        } else {

            missing.add(
                    "Response length"
            );
        }

        if(missing.contains("Constraints")) {

            suggestions.add(
                    "Add constraints for better control"
            );
        }

        if(missing.contains("Teaching style")) {

            suggestions.add(
                    "Define how AI should teach"
            );
        }

        if(missing.contains("Response length")) {

            suggestions.add(
                    "Specify answer size"
            );
        }

        return new PromptScoreResponse(
                score,
                strengths,
                missing,
                suggestions
        );
    }
}