package com.project.cafeteria.cafeteriaapp.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class CreateOrderRequest {
    @NotNull(message = "La lista de items no puede ser nula")
    @NotEmpty(message = "La lista de items no puede estar vacía")
    @Valid
    private List<ItemOrderDTO> items;

    @NotNull(message = "El email del usuario no puede ser nulo")
    private String userEmail;

    public CreateOrderRequest() {}

    public CreateOrderRequest(List<ItemOrderDTO> items, String userEmail) {
        this.items = items;
        this.userEmail = userEmail;
    }

    public List<ItemOrderDTO> getItems() {
        return items;
    }

    public void setItems(List<ItemOrderDTO> items) {
        this.items = items;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}

