package com.educameet.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.educameet.backend.model.FileData;
import com.educameet.backend.model.Participante;
import com.educameet.backend.service.FileDataService;

@RestController
@RequestMapping("/files")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FileDataController {
    
    @Autowired
    FileDataService fileDataService;

    @PostMapping()
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("file") MultipartFile file) throws IOException {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if(principal instanceof Participante participante) {
            FileData uploadImage = fileDataService.uploadImageToFileSystem(file, participante.getId());
            return ResponseEntity.status(HttpStatus.OK)
                    .body("File uploaded successfully : " + uploadImage.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> downloadImageFromFileSystem(@PathVariable Long id) throws IOException {
        byte[] imageData= fileDataService.downloadImageFromFileSystem(id);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
}
