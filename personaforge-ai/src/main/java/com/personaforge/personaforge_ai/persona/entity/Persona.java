package com.personaforge.personaforge_ai.persona.entity;

import com.personaforge.personaforge_ai.prompt.entity.PromptVersion;
import com.personaforge.personaforge_ai.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "personas")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String role;

    @Column(length = 2000)
    private String goal;

    @Enumerated(EnumType.STRING)
    private SkillLevel skillLevel;

    @Enumerated(EnumType.STRING)
    private CommunicationStyle communicationStyle;

    @Enumerated(EnumType.STRING)
    private TeachingStyle teachingStyle;

    @Enumerated(EnumType.STRING)
    private ResponseLength responseLength;

    private Integer strictness;

    private Boolean memoryPreference;

    @Column(length = 2000)
    private String constraints;

    @Column(length = 10000)
    private String generatedPrompt;

    private Double score;

    @Enumerated(EnumType.STRING)
    private PersonaStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
    @OneToMany(
            mappedBy = "persona",
            cascade = CascadeType.ALL
    )
    private List<PromptVersion> versions;
    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}