package com.bookmate.controller;

import com.bookmate.model.Book;
import com.bookmate.model.Rating;
import com.bookmate.repository.BookRepository;
import com.bookmate.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "http://54.226.109.9")
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping
    public ResponseEntity<Rating> addOrUpdateRating(@RequestBody Rating rating) {
        // Check if user already rated this book
        Optional<Rating> existingRating = ratingRepository.findByUserIdAndBookId(
                rating.getUserId(),
                rating.getBookId()
        );

        Rating savedRating;
        if (existingRating.isPresent()) {
            // Update existing rating
            Rating existing = existingRating.get();
            existing.setRating(rating.getRating());
            existing.setReview(rating.getReview());
            savedRating = ratingRepository.save(existing);
        } else {
            // Add new rating
            savedRating = ratingRepository.save(rating);
        }

        // Update book's average rating
        updateBookRating(rating.getBookId());

        return ResponseEntity.ok(savedRating);
    }

    @GetMapping("/book/{bookId}")
    public List<Rating> getRatingsByBookId(@PathVariable Long bookId) {
        return ratingRepository.findByBookId(bookId);
    }

    @GetMapping("/user/{userId}/book/{bookId}")
    public ResponseEntity<Rating> getUserRating(@PathVariable Long userId, @PathVariable Long bookId) {
        return ratingRepository.findByUserIdAndBookId(userId, bookId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private void updateBookRating(Long bookId) {
        Double avgRating = ratingRepository.getAverageRatingByBookId(bookId);
        bookRepository.findById(bookId).ifPresent(book -> {
            book.setRating(avgRating != null ? avgRating : 0.0);
            bookRepository.save(book);
        });
    }
}
