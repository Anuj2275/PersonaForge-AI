package com.personaforge.personaforge_ai.prompt.controller;

import com.personaforge.personaforge_ai.prompt.dto.GeneratePromptRequest;
import com.personaforge.personaforge_ai.prompt.dto.PromptResponse;
import com.personaforge.personaforge_ai.prompt.dto.PromptScoreResponse;
import com.personaforge.personaforge_ai.prompt.dto.PromptVersionResponse;
import com.personaforge.personaforge_ai.prompt.service.PromptService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prompts")
@RequiredArgsConstructor
public class PromptController {

    private final PromptService promptService;

    @PostMapping("/generate")
    public PromptResponse generatePrompt(
            @Valid
            @RequestBody
            GeneratePromptRequest request
    ) {

        return promptService.generatePrompt(
                request
        );
    }
    @GetMapping("/history/{personaId}")
    public List<PromptVersionResponse>
    getHistory(
            @PathVariable Long personaId
    ) {

        return promptService
                .getPromptHistory(personaId);
    }

    @GetMapping("/score/{personaId}")
    public PromptScoreResponse scorePrompt(
            @PathVariable Long personaId
    ) {

        return promptService
                .scorePrompt(personaId);
    }
}