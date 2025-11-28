package com.project.cafeteria.cafeteriaapp.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

//DTO (Data Transfer Object) para la comunicacion entre el cliente y el servidor
// el DTO representa un solo artículo dentro del pedido
public class ItemOrderDTO {

    // uso del ID del cafe para buscarlo en la base de datos y obtener el precio
    @NotNull (message = "El ID del cafe no puede ser nulo")
    private Long cafeId;

    @NotNull(message = "La cantidad no puede ser 0")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private int cantidad;

    public ItemOrderDTO() {}

    public ItemOrderDTO(Long cafeId, int cantidad) {
        this.cafeId = cafeId;
        this.cantidad = cantidad;
    }

    public Long getCafeId() {
        return cafeId;
    }

    public void setCafeId(Long cafeId) {
        this.cafeId = cafeId;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
