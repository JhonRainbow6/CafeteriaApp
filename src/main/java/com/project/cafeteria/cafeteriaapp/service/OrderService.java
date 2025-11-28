package com.project.cafeteria.cafeteriaapp.service;

import com.project.cafeteria.cafeteriaapp.dto.ItemOrderDTO;
import com.project.cafeteria.cafeteriaapp.entity.Cafe;
import com.project.cafeteria.cafeteriaapp.entity.Order;
import com.project.cafeteria.cafeteriaapp.exceptions.NotFoundException;
import com.project.cafeteria.cafeteriaapp.repository.CafeRepository;
import com.project.cafeteria.cafeteriaapp.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final CafeRepository cafeRepository;

    public OrderService(OrderRepository orderRepository, CafeRepository cafeRepository) {
        this.orderRepository = orderRepository;
        this.cafeRepository = cafeRepository;
    }

    public Order crearOrden(List<ItemOrderDTO> items) {
        System.out.println("=== CREANDO NUEVA ORDEN ===");
        System.out.println("Items recibidos: " + items.size());

        double totalPedido = 0.0;

        for (ItemOrderDTO item : items) {
            System.out.println("Procesando item - CafeId: " + item.getCafeId() + ", Cantidad: " + item.getCantidad());

            Optional<Cafe> cafeOptional = cafeRepository.findById(item.getCafeId());

            if (cafeOptional.isEmpty()) {
                System.err.println("ERROR: Café con ID " + item.getCafeId() + " no encontrado");
                throw new NotFoundException("El café con ID " + item.getCafeId() + " no existe en el menú.");
            }
            Cafe cafe = cafeOptional.get();
            System.out.println("Café encontrado: " + cafe.getNombre() + " - Precio: $" + cafe.getPrecio());

            totalPedido += cafe.getPrecio() * item.getCantidad();
        }

        System.out.println("Total calculado: $" + totalPedido);
        Order nuevaOrden = new Order(totalPedido);
        Order ordenGuardada = orderRepository.save(nuevaOrden);
        System.out.println("Orden creada con ID: " + ordenGuardada.getId());
        System.out.println("=== ORDEN CREADA EXITOSAMENTE ===");

        return ordenGuardada;
    }
    //obtencion de una orden por su ID
    public Order GetOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden con ID " + id + " no encontrada."));
    }

    //actualizar el estado de una orden
    public Order updateStateOrder(Long id, String nuevoEstado) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Orden con ID " + id + " no encontrada para actualizar estado."));
        order.setEstado(nuevoEstado);
        return orderRepository.save(order);
    }

    //obtencion de todas las ordenes del sistema
    public List<Order> obtenerTodasLasOrdenes() {
        return orderRepository.findAll();
    }
}
