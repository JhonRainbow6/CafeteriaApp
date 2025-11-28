package com.project.cafeteria.cafeteriaapp.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {
    private Long id;
    private double total;
    private String estado;
    private LocalDateTime fechaCreacion;
    private List<OrderItemDTO> items;

    public OrderResponseDTO() {}

    public OrderResponseDTO(Long id, double total, String estado, LocalDateTime fechaCreacion, List<OrderItemDTO> items) {
        this.id = id;
        this.total = total;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.items = items;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}

