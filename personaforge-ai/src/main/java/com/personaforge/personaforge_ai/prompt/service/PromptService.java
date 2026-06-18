package com.personaforge.personaforge_ai.prompt.service;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import com.personaforge.personaforge_ai.persona.repository.PersonaRepository;
import com.personaforge.personaforge_ai.prompt.dto.GeneratePromptRequest;
import com.personaforge.personaforge_ai.prompt.dto.PromptResponse;
import com.personaforge.personaforge_ai.prompt.dto.PromptScoreResponse;
import com.personaforge.personaforge_ai.prompt.dto.PromptVersionResponse;
import com.personaforge.personaforge_ai.prompt.entity.PromptVersion;
import com.personaforge.personaforge_ai.prompt.repository.PromptVersionRepository;
import com.personaforge.personaforge_ai.user.entity.User;
import com.personaforge.personaforge_ai.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PromptService {

    private final PersonaRepository personaRepository;
    private final UserRepository userRepository;
    private final PromptBuilderService promptBuilderService;
    private final PromptVersionRepository promptVersionRepository;
    private final PromptScoringService promptScoringService;

    public PromptResponse generatePrompt(
            GeneratePromptRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository.findByEmail(email)
                        .orElseThrow();

        Persona persona =
                personaRepository
                        .findByIdAndUser(
                                request.personaId(),
                                user
                        )
                        .orElseThrow();

        String generatedPrompt =
                promptBuilderService
                        .buildPrompt(persona);
        int nextVersion = promptVersionRepository
                .findTopByPersonaOrderByVersionNumberDesc(
                        persona
                )
                .map(v -> v.getVersionNumber() + 1)
                .orElse(1);

        PromptVersion version =
                PromptVersion.builder()
                        .versionNumber(nextVersion)
                        .promptContent(generatedPrompt)
                        .persona(persona)
                        .build();

        promptVersionRepository.save(version);

        persona.setGeneratedPrompt(
                generatedPrompt
        );

        personaRepository.save(persona);

        return new PromptResponse(
                persona.getId(),
                generatedPrompt
        );
    }
    public List<PromptVersionResponse>
    getPromptHistory(Long personaId) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        Persona persona =
                personaRepository
                        .findByIdAndUser(
                                personaId,
                                user
                        )
                        .orElseThrow();

        return promptVersionRepository
                .findByPersonaOrderByVersionNumberDesc(
                        persona
                )
                .stream()
                .map(version ->
                        new PromptVersionResponse(
                                version.getId(),
                                version.getVersionNumber(),
                                version.getPromptContent(),
                                version.getCreatedAt()
                        )
                )
                .toList();
    }
    public PromptScoreResponse scorePrompt(
            Long personaId
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        Persona persona =
                personaRepository
                        .findByIdAndUser(
                                personaId,
                                user
                        )
                        .orElseThrow();

        PromptScoreResponse result =
                promptScoringService
                        .scorePrompt(persona);

        persona.setScore(
                result.score()
        );

        personaRepository.save(persona);

        return result;
    }
}