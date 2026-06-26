package com.personaforge.personaforge_ai.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.personaforge.personaforge_ai.auth.dto.AuthResponse;
import com.personaforge.personaforge_ai.auth.dto.LoginRequest;
import com.personaforge.personaforge_ai.auth.dto.RegisterRequest;
import com.personaforge.personaforge_ai.auth.dto.UpdateUserRequest;
import com.personaforge.personaforge_ai.auth.dto.UserResponse;
import com.personaforge.personaforge_ai.auth.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request
    ) {
        return authService.login(request);
    }

    @GetMapping("/hello")
    public String hello() {

        return "Protected Endpoint";
    }
    @GetMapping("/me")
    public UserResponse getCurrentUser() {

        return authService.getCurrentUser();
    }

    @PutMapping("/me")
    public UserResponse updateCurrentUser(
            @Valid @RequestBody UpdateUserRequest request
    ) {

        return authService.updateCurrentUser(request);
    }
}