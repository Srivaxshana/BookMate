package com.bookmate.repository;

import com.bookmate.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByBookId(Long bookId);
    Optional<Rating> findByUserIdAndBookId(Long userId, Long bookId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.bookId = ?1")
    Double getAverageRatingByBookId(Long bookId);
}
