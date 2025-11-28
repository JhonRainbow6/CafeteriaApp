package com.project.cafeteria.cafeteriaapp.service;

import com.project.cafeteria.cafeteriaapp.dto.LoginResponse;
import com.project.cafeteria.cafeteriaapp.entity.Usuario;
import com.project.cafeteria.cafeteriaapp.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public LoginResponse authenticate(String email, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if (usuario.isEmpty() || !usuario.get().getPassword().equals(password)) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        Usuario user = usuario.get();
        // Token simple (en producción usar JWT)
        String token = "token_" + user.getId() + "_" + System.currentTimeMillis();

        return new LoginResponse(user.getEmail(), user.getRol(), token);
    }
}
