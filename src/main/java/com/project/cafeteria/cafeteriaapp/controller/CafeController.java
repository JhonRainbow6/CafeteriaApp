package com.project.cafeteria.cafeteriaapp.controller;

import com.project.cafeteria.cafeteriaapp.entity.Cafe;
import com.project.cafeteria.cafeteriaapp.service.CafeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class CafeController {

    private final CafeService cafeService;

    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    //Endpoint: GET /api/menu obtener menu.
    @GetMapping
    public ResponseEntity<List<Cafe>> obtenerMenuCompleto() {
        List<Cafe> menu = cafeService.obtenerMenu();
        return new ResponseEntity<>(menu, HttpStatus.OK);
    }

    //Endpoint: POST /api/menu Permite agregar un nuevo producto al menu
    @PostMapping
    public ResponseEntity<Cafe> agregarCafe(@RequestBody Cafe cafe) {
        Cafe nuevoCafe = cafeService.guardarCafe(cafe);
        return new ResponseEntity<>(nuevoCafe, HttpStatus.CREATED);
    }
}
