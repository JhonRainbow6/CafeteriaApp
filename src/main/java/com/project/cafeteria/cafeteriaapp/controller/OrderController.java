package com.project.cafeteria.cafeteriaapp.controller;

import com.project.cafeteria.cafeteriaapp.dto.CreateOrderRequest;
import com.project.cafeteria.cafeteriaapp.dto.ItemOrderDTO;
import com.project.cafeteria.cafeteriaapp.dto.OrderResponseDTO;
import com.project.cafeteria.cafeteriaapp.entity.Order;
import com.project.cafeteria.cafeteriaapp.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")// ruta base para todos los metodos de este controlador
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // [ENDPOINT CLIENTE] POST /api/orders: Realiza un nuevo pedido
    @PostMapping
    public ResponseEntity<Order> realizarPedido(@Valid @RequestBody CreateOrderRequest request) {
        try {
            if (request.getItems() == null || request.getItems().isEmpty()) {
                return new ResponseEntity(
                        "La lista de ítems del pedido no puede estar vacía.",
                        HttpStatus.BAD_REQUEST
                );
            }
            Order ordenCreada = orderService.crearOrden(request.getItems(), request.getUserEmail());
            return new ResponseEntity<>(ordenCreada, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // [ENDPOINT GERENTE/BARISTA] GET /api/orders: Obtiene listado de todas las órdenes
    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> obtenerTodasLasOrdenes() {
        List<OrderResponseDTO> ordenes = orderService.obtenerTodasLasOrdenes();
        return new ResponseEntity<>(ordenes, HttpStatus.OK);
    }

    // [ENDPOINT CLIENTE] GET /api/orders/user/{email}: Obtiene las órdenes de un usuario
    @GetMapping("/user/{email}")
    public ResponseEntity<List<OrderResponseDTO>> obtenerOrdenesPorUsuario(@PathVariable String email) {
        try {
            List<OrderResponseDTO> ordenes = orderService.obtenerOrdenesPorUsuario(email);
            return new ResponseEntity<>(ordenes, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // [ENDPOINT GERENTE/BARISTA] GET /api/orders/{id}: Obtiene una orden específica por ID
    @GetMapping("/{id}")
    public ResponseEntity<Order> GetOrderById(@PathVariable Long id) {
        Order orden = orderService.GetOrderById(id);
        return new ResponseEntity<>(orden, HttpStatus.OK);
    }

    // [ENDPOINT BARISTA] PUT /api/orders/{id}/estado: Actualiza el estado de la orden
    @PutMapping("/{id}/state")
    public ResponseEntity<Order> updateState(
            @PathVariable Long id,
            @RequestBody String newState) {

        String estadoLimpio = newState.trim().toUpperCase();
        Order ordenActualizada = orderService.updateStateOrder(id, estadoLimpio);

        return new ResponseEntity<>(ordenActualizada, HttpStatus.OK);
    }
}
