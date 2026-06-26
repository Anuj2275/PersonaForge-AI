package com.personaforge.personaforge_ai.persona.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum CommunicationStyle {

    DIRECT,
    FRIENDLY,
    FORMAL,
    CASUAL;

    @JsonCreator
    public static CommunicationStyle fromString(
            String value
    ) {
        return CommunicationStyle.valueOf(
                value.toUpperCase()
        );
    }
}
