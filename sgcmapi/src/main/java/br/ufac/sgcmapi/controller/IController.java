package br.ufac.sgcmapi.controller;

import org.springframework.http.ResponseEntity;

public interface IController<T> {

    public ResponseEntity<?> get(int page, int size, String termoBusca);
    public ResponseEntity<?> get(Long id);
    // public ResponseEntity<?> get(String termoBusca);
    public ResponseEntity<T> insert(T objeto);
    public ResponseEntity<T> update(T objeto);
    public ResponseEntity<?> delete(Long id);
    
}
