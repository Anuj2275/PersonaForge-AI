package com.personaforge.personaforge_ai.prompt.dto;

import java.util.List;

public record PromptScoreResponse(

        double score,

        List<String> strengths,

        List<String> missing,

        List<String> suggestions
) {
}