package com.personaforge.personaforge_ai.persona.service;

import com.personaforge.personaforge_ai.exception.PersonaNotFoundException;
import com.personaforge.personaforge_ai.persona.dto.CreatePersonaRequest;
import com.personaforge.personaforge_ai.persona.dto.PersonaMapper;
import com.personaforge.personaforge_ai.persona.dto.PersonaResponse;
import com.personaforge.personaforge_ai.persona.dto.UpdatePersonaRequest;
import com.personaforge.personaforge_ai.persona.entity.Persona;
import com.personaforge.personaforge_ai.persona.entity.PersonaStatus;
import com.personaforge.personaforge_ai.persona.repository.PersonaRepository;
import com.personaforge.personaforge_ai.user.entity.User;
import com.personaforge.personaforge_ai.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.*;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonaService {

    private final PersonaRepository personaRepository;
    private final UserRepository userRepository;

    public PersonaResponse createPersona(
            CreatePersonaRequest request
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        Persona persona = Persona.builder()
                .name(request.name())
                .role(request.role())
                .goal(request.goal())
                .skillLevel(request.skillLevel())
                .communicationStyle(
                        request.communicationStyle()
                )
                .teachingStyle(
                        request.teachingStyle()
                )
                .responseLength(
                        request.responseLength()
                )
                .strictness(
                        request.strictness()
                )
                .memoryPreference(
                        request.memoryPreference()
                )
                .constraints(
                        request.constraints()
                )
                .generatedPrompt(null)
                .score(0.0)
                .status(PersonaStatus.ACTIVE)
                .user(user)
                .build();

        Persona saved =
                personaRepository.save(persona);

        return PersonaMapper.toResponse(saved);
    }

    public List<PersonaResponse> getMyPersonas() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        return personaRepository
                .findByUser(user)
                .stream()
                .map(PersonaMapper::toResponse)
                .toList();
    }

    public PersonaResponse getPersonaById(
            Long id
    ) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        Persona persona =
                personaRepository
                        .findByIdAndUser(
                                id,
                                user
                        )
                        .orElseThrow(
                                () ->
                                        new PersonaNotFoundException(
                                                "Persona not found"
                                        )
                        );

        return PersonaMapper
                .toResponse(persona);
    }

    public Page<PersonaResponse> getMyPersonasPaginated(
            int page,
            int size,
            String sortBy
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

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by(sortBy)
                );

        return personaRepository
                .findByUser(
                        user,
                        pageable
                )
                .map(PersonaMapper::toResponse);
    }
    public Page<PersonaResponse>
    searchPersonas(

            String keyword,

            int page,

            int size
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

        Pageable pageable =
                PageRequest.of(
                        page,
                        size
                );

        return personaRepository
                .findByUserAndNameContainingIgnoreCase(
                        user,
                        keyword,
                        pageable
                )
                .map(PersonaMapper::toResponse);
    }
    public PersonaResponse updatePersona(
            Long id,
            UpdatePersonaRequest request
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
                        .findByIdAndUser(id, user)
                        .orElseThrow(
                                () -> new PersonaNotFoundException(
                                        "Persona not found"
                                )
                        );

        persona.setName(request.name());
        persona.setRole(request.role());
        persona.setGoal(request.goal());
        persona.setSkillLevel(request.skillLevel());
        persona.setCommunicationStyle(
                request.communicationStyle()
        );
        persona.setTeachingStyle(
                request.teachingStyle()
        );
        persona.setResponseLength(
                request.responseLength()
        );
        persona.setStrictness(
                request.strictness()
        );
        persona.setMemoryPreference(
                request.memoryPreference()
        );
        persona.setConstraints(
                request.constraints()
        );

        Persona updated =
                personaRepository.save(persona);

        return PersonaMapper.toResponse(
                updated
        );
    }
    public void archivePersona(
            Long id
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
                        .findByIdAndUser(id, user)
                        .orElseThrow(
                                () -> new PersonaNotFoundException(
                                        "Persona not found"
                                )
                        );

        persona.setStatus(
                PersonaStatus.ARCHIVED
        );

        personaRepository.save(persona);
    }

    public void deletePersona(
            Long id
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
                        .findByIdAndUser(id, user)
                        .orElseThrow(
                                () -> new PersonaNotFoundException(
                                        "Persona not found"
                                )
                        );

        persona.setStatus(
                PersonaStatus.DELETED
        );

        personaRepository.save(persona);
    }
}