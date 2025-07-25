package com.meetmint.meetmint_backend.Dto;



import com.meetmint.meetmint_backend.Model.User;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponseDTO<T> {


    private boolean success;
    private String message;
    private T data;
    private String token;


    public ApiResponseDTO() {}

    public ApiResponseDTO(boolean success, String message, T data, String token) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
          this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
