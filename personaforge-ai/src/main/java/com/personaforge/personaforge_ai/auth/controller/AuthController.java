package com.personaforge.personaforge_ai.auth.controller;

import com.personaforge.personaforge_ai.auth.dto.AuthResponse;
import com.personaforge.personaforge_ai.auth.dto.LoginRequest;
import com.personaforge.personaforge_ai.auth.dto.RegisterRequest;
import com.personaforge.personaforge_ai.auth.dto.UserResponse;
import com.personaforge.personaforge_ai.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}