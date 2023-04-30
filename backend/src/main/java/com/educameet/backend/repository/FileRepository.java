package com.educameet.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.educameet.backend.model.FileData;

@Repository
public interface FileRepository extends JpaRepository<FileData, Long> {
    Optional<FileData> findByFilePath(String filePath);
}
