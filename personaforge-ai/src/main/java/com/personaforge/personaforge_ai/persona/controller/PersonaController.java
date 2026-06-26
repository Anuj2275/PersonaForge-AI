package com.personaforge.personaforge_ai.persona.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.personaforge.personaforge_ai.persona.dto.CreatePersonaRequest;
import com.personaforge.personaforge_ai.persona.dto.PersonaResponse;
import com.personaforge.personaforge_ai.persona.dto.UpdatePersonaRequest;
import com.personaforge.personaforge_ai.persona.service.PersonaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/personas")
@RequiredArgsConstructor
public class PersonaController {

    private final PersonaService personaService;

    @PostMapping
    public PersonaResponse createPersona(
            @Valid
            @RequestBody
            CreatePersonaRequest request
    ) {

        return personaService
                .createPersona(request);
    }

    @GetMapping
    public List<PersonaResponse> getMyPersonas() {

        return personaService
                .getMyPersonas();
    }

    @GetMapping("/{id}")
    public PersonaResponse getPersonaById(
            @PathVariable Long id
    ) {

        return personaService
                .getPersonaById(id);
    }

    @GetMapping("/paged")
    public Page<PersonaResponse>
    getMyPersonasPaginated(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "createdAt")
            String sortBy
    ) {

        return personaService
                .getMyPersonasPaginated(
                        page,
                        size,
                        sortBy
                );
    }
    @GetMapping("/search")
    public Page<PersonaResponse>
    searchPersonas(

            @RequestParam
            String keyword,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size
    ) {

        return personaService
                .searchPersonas(
                        keyword,
                        page,
                        size
                );
    }

    @PutMapping("/{id}")
    public PersonaResponse updatePersona(
            @PathVariable Long id,
            @RequestBody UpdatePersonaRequest request
    ) {

        return personaService.updatePersona(
                id,
                request
        );
    }
    @PatchMapping("/{id}/archive")
    public void archivePersona(
            @PathVariable Long id
    ) {

        personaService.archivePersona(id);
    }

    @PatchMapping("/{id}/unarchive")
    public void unarchivePersona(
            @PathVariable Long id
    ) {

        personaService.unarchivePersona(id);
    }
    @PatchMapping("/{id}/delete")
    public void deletePersona(
            @PathVariable Long id
    ) {

        personaService.deletePersona(id);
    }


}