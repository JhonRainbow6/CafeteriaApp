package com.project.cafeteria.cafeteriaapp.dto;

public class LoginResponse {
    private String email;
    private String rol;
    private String token;

    public LoginResponse() {}

    public LoginResponse(String email, String rol, String token) {
        this.email = email;
        this.rol = rol;
        this.token = token;
    }

    // Getters y Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
