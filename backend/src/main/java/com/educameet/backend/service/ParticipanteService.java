package com.educameet.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.educameet.backend.dto.participante.ParticipanteRequestDTO;
import com.educameet.backend.dto.participante.ParticipanteResponseDTO;
import com.educameet.backend.enums.RoleNames;
import com.educameet.backend.exception.exceptions.ConflictStoreException;
import com.educameet.backend.exception.exceptions.EmailValidatorException;
import com.educameet.backend.model.FileData;
import com.educameet.backend.model.Participante;
import com.educameet.backend.model.Role;
import com.educameet.backend.repository.ParticipanteRepository;
import com.educameet.backend.repository.RoleRepository;

import jakarta.transaction.Transactional;

@Service
public class ParticipanteService {

    @Autowired
    ParticipanteRepository participanteRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    FileDataService fileDataService;

    public List<Participante> findAll() {
        return participanteRepository.findAll();
    }

    public ResponseEntity<Object> findById(Long id) {
        Participante participante = participanteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Participante não encontrado"));
        return ResponseEntity.status(HttpStatus.OK).body(new ParticipanteResponseDTO(participante));
    }

    @Transactional
    public ResponseEntity<Object> save(ParticipanteRequestDTO participanteRequestDTO, MultipartFile file)
            throws IOException {

        Participante participante = participanteRequestDTO.toParticipante();

        if (participante.getEmail() != null) {

            var validation = EmailValidatorService.patternMatches(
                    participanteRequestDTO.getEmail(),
                    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                            + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
            if (!validation) {
                throw new EmailValidatorException("Formato do e-mail inválido");
            }

            if (participanteRepository.existsByEmail(participante.getEmail())) {
                throw new ConflictStoreException("Este e-mail já está sendo usado!");
            }

            participante.setEmail(participanteRequestDTO.getEmail());
        }

        var tipoParticipante = participanteRequestDTO.getTipo();
        Optional<Role> role = null;

        if (tipoParticipante.toUpperCase().equals("ORGANIZADOR")) {
            role = roleRepository.findByRole(RoleNames.ROLE_ORGANIZADOR);
        } else {
            role = roleRepository.findByRole(RoleNames.ROLE_ACADEMICO);
        }

        List<Role> roles = new ArrayList<>();
        roles.add(role.get());
        participante.setRoles(roles);

        participanteRepository.save(participante);

        FileData profileImage = fileDataService.uploadImageToFileSystem(file, participante.getId());
        participante.setProfileImage(profileImage);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ParticipanteResponseDTO(participanteRepository.save(participante)));
    }

    @Transactional
    public ResponseEntity<Object> delete(Long id) {

        Participante participante = participanteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Participante não encontrado"));

        participanteRepository.delete(participante);

        return ResponseEntity.status(HttpStatus.OK).build();

    }

    @Transactional
    public ResponseEntity<Object> update(Long id, ParticipanteRequestDTO participanteRequestDTO, MultipartFile file)
            throws IOException {

        Participante participante = participanteRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Participante não encontrado"));

        // Modificar
        if (participanteRequestDTO.getName() != null) {
            participante.setName(participanteRequestDTO.getName());
        }

        // if (participanteRequestDTO.getEmail() != null) {

        //     var validation = EmailValidatorService.patternMatches(
        //             participanteRequestDTO.getEmail(),
        //             "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        //                     + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

        //     if (!validation) {
        //         throw new EmailValidatorException("Formato do e-mail inválido");
        //     }

        //     if ((participanteRepository.existsByEmail(participanteRequestDTO.getEmail())) &&
        //             (!participante.getEmail().equals(participanteRequestDTO.getEmail()))) {
        //         throw new ConflictStoreException("Este e-mail já está sendo usado!");
        //     }

        //     participante.setEmail(participanteRequestDTO.getEmail());
        // }

        if (participanteRequestDTO.getTipo() != null) {
            participante.setTipo(participanteRequestDTO.getTipo());
        }

        // if (participanteRequestDTO.getPassword() != null) {
        //     participante.setPassword(participanteRequestDTO.getPassword());
        // }

        if (file != null) {
            FileData profileImage = fileDataService.uploadImageToFileSystem(file, participante.getId());
            participante.setProfileImage(profileImage);
        }

        // Salvar
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ParticipanteResponseDTO(participanteRepository.save(participante)));

    }
}
