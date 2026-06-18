package com.personaforge.personaforge_ai.template.repository;

import com.personaforge.personaforge_ai.template.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepository
        extends JpaRepository<Template, Long> {
}