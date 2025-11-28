package com.project.cafeteria.cafeteriaapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  guardar el total a pagar
    private double total;

    // estado del pedido ("PENDIENTE", "PREPARANDO", "LISTO")
    private String estado;

    // registra la fecha y hora del pedido
    private LocalDateTime fechaCreacion;

    // relación con los items de la orden
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    // constructo vacio requerido por JPA
    public Order() {
        // inicialicion del estado y la fecha al crear la orden
        this.estado = "PENDIENTE";
        this.fechaCreacion = LocalDateTime.now();
    }

    // constructo simple para inicializar el total
    public Order(double total) {
        this(); // llamada al constructoo por defecto para inicializar estado y fecha
        this.total = total;
    }

    public Long getId() {
        return id;
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

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    // Método auxiliar para agregar un item a la orden
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
