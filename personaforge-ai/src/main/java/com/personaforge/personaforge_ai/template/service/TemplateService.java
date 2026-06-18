package com.personaforge.personaforge_ai.template.service;

import com.personaforge.personaforge_ai.template.dto.TemplateResponse;
import com.personaforge.personaforge_ai.template.entity.Template;
import com.personaforge.personaforge_ai.template.repository.TemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TemplateService {

    private final TemplateRepository templateRepository;

    public List<TemplateResponse> getAllTemplates() {

        return templateRepository
                .findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private TemplateResponse toResponse(
            Template template
    ) {

        return new TemplateResponse(
                template.getId(),
                template.getTitle(),
                template.getCategory(),
                template.getDescription()
        );
    }
}