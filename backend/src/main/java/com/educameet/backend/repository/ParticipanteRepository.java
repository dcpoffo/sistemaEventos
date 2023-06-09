package com.educameet.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educameet.backend.model.Participante;

@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long>{
    
    boolean existsByEmail(String login);

    //Participante findByEmail(String email);

    Optional<Participante> findByEmail(String username);
}
