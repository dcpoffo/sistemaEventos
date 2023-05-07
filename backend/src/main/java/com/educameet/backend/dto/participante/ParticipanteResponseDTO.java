package com.educameet.backend.dto.participante;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import com.educameet.backend.model.Event;
import com.educameet.backend.model.EventReview;
import com.educameet.backend.model.FileData;
import com.educameet.backend.model.Participante;
import com.educameet.backend.model.Role;

public class ParticipanteResponseDTO implements Serializable {

    private Long id;
    private String name;
    private String tipo;
    private String email;
    //private String password;
    private Set<Event> events;
    private Set<EventReview> reviews;
    private List<Role> roles;
    FileData profileImage;

    public ParticipanteResponseDTO() { }

    public ParticipanteResponseDTO(Participante participante) {
        id = participante.getId();
        name = participante.getName();
        tipo = participante.getTipo();
        email = participante.getEmail();        
        events = participante.getEvents();
        reviews = participante.getReviews();
        roles = participante.getRoles();
        profileImage = participante.getProfileImage();        
    }    

    public ParticipanteResponseDTO(Long id, String name, String tipo, String email, Set<Event> events, Set<EventReview> reviews, List<Role> roles, FileData profileImage) {
        this.id = id;
        this.name = name;
        this.tipo = tipo;
        this.email = email;
        //this.password = password;
        this.events = events;
        this.reviews = reviews;
        this.roles = roles;
        this.profileImage = profileImage;
    }    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Set<Event> getEvents() {
        return events;
    }

    public void setEvents(Set<Event> events) {
        this.events = events;
    }

    public Set<EventReview> getReviews() {
        return reviews;
    }

    public void setReviews(Set<EventReview> reviews) {
        this.reviews = reviews;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public FileData getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(FileData profileImage) {
        this.profileImage = profileImage;
    }

    
}