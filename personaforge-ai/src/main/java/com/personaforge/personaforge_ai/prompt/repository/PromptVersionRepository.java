package com.personaforge.personaforge_ai.prompt.repository;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import com.personaforge.personaforge_ai.prompt.entity.PromptVersion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PromptVersionRepository
        extends JpaRepository<PromptVersion, Long> {

    List<PromptVersion> findByPersonaOrderByVersionNumberDesc(
            Persona persona
    );

    Optional<PromptVersion>
    findTopByPersonaOrderByVersionNumberDesc(
            Persona persona
    );
}