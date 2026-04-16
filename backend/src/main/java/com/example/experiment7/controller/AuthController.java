package com.example.experiment7.controller;

import com.example.experiment7.dto.LoginRequest;
import com.example.experiment7.dto.LoginResponse;
import com.example.experiment7.entity.User;
import com.example.experiment7.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Map;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthService authService, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = authService.findByUsername(loginRequest.getUsername());
        
        if (user.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), user.get().getPassword())) {
            // Note: Returning a simple token mockup for the React app to store
            return ResponseEntity.ok(new LoginResponse("mock-jwt-token-" + user.get().getUsername(), user.get().getUsername(), user.get().getRole()));
        }
        
        return ResponseEntity.status(401).body(Map.of("error", "Unauthorized", "message", "Invalid username or password"));
    }

    @GetMapping("/protected")
    public ResponseEntity<?> getProtectedContent() {
        return ResponseEntity.ok(Map.of(
            "message", "This is premium protected content from the Spring Boot backend!",
            "status", "success",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
