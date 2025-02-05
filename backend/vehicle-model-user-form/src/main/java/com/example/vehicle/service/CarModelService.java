package com.example.vehicle.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.vehicle.model.Manufacturer;
import com.example.vehicle.repository.ManufacturerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarModelService {
    private static final Logger logger = LoggerFactory.getLogger(CarModelService.class);
    private final ManufacturerRepository manufacturerRepository;

    @Autowired
    public CarModelService(ManufacturerRepository manufacturerRepository) {
        logger.info("CarModelService initialized");
        this.manufacturerRepository = manufacturerRepository;
    }

    public List<Manufacturer> getAllManufacturers() {
        logger.debug("Fetching all manufacturers");
        List<Manufacturer> manufacturers = manufacturerRepository.findAll();
        logger.debug("Found {} manufacturers", manufacturers.size());
        return manufacturers;
    }
    public Manufacturer getManufacturerById(Long id) {
        logger.debug("Fetching manufacturer with id: {}", id);
        return manufacturerRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Manufacturer not found with id: {}", id);
                    return new RuntimeException("Manufacturer not found with id: " + id);
                });
    }
}