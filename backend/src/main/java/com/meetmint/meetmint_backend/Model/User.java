package com.meetmint.meetmint_backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.validation.constraints.*;
import lombok.NoArgsConstructor;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;

    @NotBlank

    private String firstName ;
    @NotBlank
    private String lastName ;



    @Email
    @Column(unique = true, nullable = false)
    private String email ;

    private String password ;
    private boolean Organiser;
    private String profilePhotoUrl ;

}
