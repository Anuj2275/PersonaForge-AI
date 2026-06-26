package com.personaforge.personaforge_ai.auth.service;

import com.personaforge.personaforge_ai.auth.dto.RegisterRequest;
import com.personaforge.personaforge_ai.auth.dto.UpdateUserRequest;
import com.personaforge.personaforge_ai.auth.dto.UserResponse;
import com.personaforge.personaforge_ai.exception.EmailAlreadyExistsException;
import com.personaforge.personaforge_ai.user.entity.Role;
import com.personaforge.personaforge_ai.user.entity.User;
import com.personaforge.personaforge_ai.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.personaforge.personaforge_ai.auth.dto.AuthResponse;
import com.personaforge.personaforge_ai.auth.dto.LoginRequest;
import com.personaforge.personaforge_ai.security.JwtService;

@Service
@RequiredArgsConstructor //Lombok generates a constructor for all final fields.
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        if(userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(
                        passwordEncoder.encode(
                                request.password()
                        )
                )
                .role(Role.USER)
                .build();

        userRepository.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.email())
                .orElseThrow(
                        () -> new RuntimeException(
                                "Invalid Credentials"
                        )
                );

        boolean matches =
                passwordEncoder.matches(
                        request.password(),
                        user.getPassword()
                );

        if(!matches) {
            throw new RuntimeException(
                    "Invalid Credentials"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(
                token,
                user.getEmail(),
                user.getRole().name()
        );
    }

    public UserResponse getCurrentUser() {

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

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public UserResponse updateCurrentUser(UpdateUserRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );

        if (request.name() != null && !request.name().trim().isEmpty()) {
            user.setName(request.name());
        }

        if (request.password() != null && !request.password().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        userRepository.save(user);

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}