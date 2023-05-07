package com.educameet.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.educameet.backend.model.FileData;
import com.educameet.backend.repository.FileRepository;

@Service
public class FileDataService {
    
    @Autowired
    FileRepository fileRepository;

    public FileData uploadImageToFileSystem(MultipartFile file, Long clientId) throws IOException {  
       // String teste = request.getServletContext().getRealPath("null");
        String FOLDER_PATH = "D:\\SISTEMAS\\React\\Evento\\images\\" + clientId + "\\";
        String filePath= FOLDER_PATH + file.getOriginalFilename();

        FileData fileData = fileRepository.save(new FileData(clientId, file.getOriginalFilename(), file.getContentType(), filePath));

        java.io.File directory = new java.io.File(FOLDER_PATH);
        if (! directory.exists()){
            directory.mkdirs();
            // If you require it to make the entire directory path including parents,
            // use directory.mkdirs(); here instead.
        }

        file.transferTo(new java.io.File(filePath));

        if (fileData != null) {
            return fileData;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(Long id) throws IOException {
        Optional<FileData> fileData = fileRepository.findById(id);
        String filePath = fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new java.io.File(filePath).toPath());
        return images;
    }
}
