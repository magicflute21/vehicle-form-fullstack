package com.example.vehicle.controller;

import com.example.vehicle.model.Manufacturer;
import com.example.vehicle.service.CarModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/car-models")
public class CarModelController {
    private static final Logger logger = LoggerFactory.getLogger(CarModelController.class);
    private final CarModelService service;

    @Autowired
    public CarModelController(CarModelService service) {
        logger.info("CarModelController initialized");
        this.service = service;
    }

    @GetMapping
    public List<Manufacturer> getManufacturers() {
        logger.debug("REST request to get all manufacturers");
        List<Manufacturer> result = service.getAllManufacturers();
        logger.debug("Returning {} manufacturers", result.size());
        return result;
    }
    @GetMapping("/{id}")
    public Manufacturer getManufacturerById(@PathVariable Long id) {
        return service.getManufacturerById(id);
    }

}
