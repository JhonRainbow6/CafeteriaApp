package com.project.cafeteria.cafeteriaapp;

import com.project.cafeteria.cafeteriaapp.entity.Cafe;
import com.project.cafeteria.cafeteriaapp.entity.Usuario;
import com.project.cafeteria.cafeteriaapp.repository.CafeRepository;
import com.project.cafeteria.cafeteriaapp.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class CafeteriaAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(CafeteriaAppApplication.class, args);
    }
    @Bean
    public CommandLineRunner inicializarMenu(CafeRepository cafeRepository) {
        return args -> {
            // Verificar si ya existen datos en la base de datos
            if (cafeRepository.count() == 0) {
                // objetos Cafe del menú inicial
                List<Cafe> menuInicial = Arrays.asList(
                        new Cafe("Espresso", 5000.00),
                        new Cafe("Americano", 6000.00),
                        new Cafe("Capuchino", 8500.00),
                        new Cafe("Latte", 9000.00),
                        new Cafe("Mocaccino", 10000.00)
                );

                cafeRepository.saveAll(menuInicial);
                System.out.println("--- MENU CARGADO EN LA BASE DE DATOS ---");
            }
        };
    }

    @Bean
    public CommandLineRunner inicializarUsuarios(UsuarioRepository usuarioRepository) {
        return args -> {
            // Verificar si ya existen usuarios en la base de datos
            if (usuarioRepository.count() == 0) {
                // Crear usuarios iniciales
                Usuario cliente = new Usuario("cliente@cafe.com", "1234", "CLIENTE");
                Usuario barista = new Usuario("barista@cafe.com", "1234", "BARISTA");

                usuarioRepository.saveAll(Arrays.asList(cliente, barista));
                System.out.println("--- USUARIOS INICIALES CREADOS ---");
                System.out.println("Cliente: cliente@cafe.com / 1234");
                System.out.println("Barista: barista@cafe.com / 1234");
            }
        };
    }

}
