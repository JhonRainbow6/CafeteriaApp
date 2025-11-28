package com.project.cafeteria.cafeteriaapp.dto;

public class OrderItemDTO {
    private Long cafeId;
    private String cafeNombre;
    private String ingredientes;
    private double precio;
    private int cantidad;
    private double subtotal;

    public OrderItemDTO() {}

    public OrderItemDTO(Long cafeId, String cafeNombre, String ingredientes, double precio, int cantidad, double subtotal) {
        this.cafeId = cafeId;
        this.cafeNombre = cafeNombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }

    // Getters y Setters
    public Long getCafeId() {
        return cafeId;
    }

    public void setCafeId(Long cafeId) {
        this.cafeId = cafeId;
    }

    public String getCafeNombre() {
        return cafeNombre;
    }

    public void setCafeNombre(String cafeNombre) {
        this.cafeNombre = cafeNombre;
    }

    public String getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(String ingredientes) {
        this.ingredientes = ingredientes;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }
}

