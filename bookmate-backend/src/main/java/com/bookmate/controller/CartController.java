//package com.bookmate.controller;
//
//import com.bookmate.model.Cart;
//import com.bookmate.repository.CartRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://localhost:3000")
//public class CartController {
//
//    @Autowired
//    private CartRepository cartRepository;
//
//    @GetMapping("/{userId}")
//    public List<Cart> getCartByUserId(@PathVariable Long userId) {
//        return cartRepository.findByUserId(userId);
//    }
//
//    @PostMapping
//    public Cart addToCart(@RequestBody Cart cart) {
//        return cartRepository.save(cart);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
//        return cartRepository.findById(id)
//                .map(cart -> {
//                    cartRepository.delete(cart);
//                    return ResponseEntity.ok().<Void>build();
//                })
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/user/{userId}")
//    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
//        cartRepository.deleteByUserId(userId);
//        return ResponseEntity.ok().build();
//    }
//}


package com.bookmate.controller;

import com.bookmate.model.Cart;
import com.bookmate.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
//@CrossOrigin(origins = "http://54.226.109.9")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/{userId}")
    public List<Cart> getCartByUserId(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping
    public Cart addToCart(@RequestBody Cart cart) {
        // Check if item already exists in cart
        Optional<Cart> existingCart = cartRepository.findByUserIdAndBookId(cart.getUserId(), cart.getBookId());

        if (existingCart.isPresent()) {
            // Update quantity if item exists
            Cart existing = existingCart.get();
            existing.setQuantity(existing.getQuantity() + cart.getQuantity());
            return cartRepository.save(existing);
        } else {
            // Add new item if doesn't exist
            return cartRepository.save(cart);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cart> updateCartQuantity(@PathVariable Long id, @RequestBody Cart cartDetails) {
        return cartRepository.findById(id)
                .map(cart -> {
                    cart.setQuantity(cartDetails.getQuantity());
                    return ResponseEntity.ok(cartRepository.save(cart));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        return cartRepository.findById(id)
                .map(cart -> {
                    cartRepository.delete(cart);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartRepository.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}
