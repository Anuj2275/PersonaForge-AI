package com.personaforge.personaforge_ai.template.controller;

import com.personaforge.personaforge_ai.template.dto.TemplateResponse;
import com.personaforge.personaforge_ai.template.service.TemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    public List<TemplateResponse> getAllTemplates() {

        return templateService.getAllTemplates();
    }
}