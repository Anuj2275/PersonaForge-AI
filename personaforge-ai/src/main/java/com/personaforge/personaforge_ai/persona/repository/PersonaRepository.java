package com.personaforge.personaforge_ai.persona.repository;

import com.personaforge.personaforge_ai.persona.entity.Persona;
import com.personaforge.personaforge_ai.persona.entity.PersonaStatus;
import com.personaforge.personaforge_ai.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PersonaRepository
        extends JpaRepository<Persona, Long> {

    List<Persona> findByUser(User user);
    Optional<Persona> findByIdAndUser(
            Long id,
            User user
    );
    Page<Persona> findByUser(
            User user,
            Pageable pageable
    );

    Page<Persona> findByUserAndNameContainingIgnoreCase(
            User user,
            String keyword,
            Pageable pageable
    );
    List<Persona> findByUserAndStatus(
            User user,
            PersonaStatus status
    );
}