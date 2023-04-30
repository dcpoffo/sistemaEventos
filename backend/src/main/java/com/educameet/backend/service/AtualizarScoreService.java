package com.educameet.backend.service;

import com.educameet.backend.model.Event;
import com.educameet.backend.model.EventReview;

public class AtualizarScoreService {
    
    public void atualizarScore(Event event) {
        double sum = 0.0;

        for (EventReview e : event.getReviews()) {
            sum = sum + e.getRate_value();
        }

        double avg = Math.round(sum / event.getReviews().size()*100.0)/100.0;

        event.setScore(avg);
    }
}
