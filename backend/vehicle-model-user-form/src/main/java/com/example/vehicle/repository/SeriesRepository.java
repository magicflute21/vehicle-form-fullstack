// repository/SeriesRepository.java
package com.example.vehicle.repository;

import com.example.vehicle.model.Series;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeriesRepository extends JpaRepository<Series, Long> {
}