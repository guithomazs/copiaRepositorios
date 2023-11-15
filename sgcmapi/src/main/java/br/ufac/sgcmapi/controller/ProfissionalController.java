package br.ufac.sgcmapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.service.ProfissionalService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@RestController
@RequestMapping("/profissional")
public class ProfissionalController implements IController<Profissional> {

    @Autowired
    private ProfissionalService servico;

    @Override
    @GetMapping("/")
    public ResponseEntity<Page<Profissional>> get(
        @RequestParam(defaultValue = "0") @PositiveOrZero int page, 
        @RequestParam(defaultValue = "2") @Positive @Max(100) int size,
        @RequestParam(defaultValue = "") String termoBusca){
        Page<Profissional> registros = servico.getWithPagination(page, size, termoBusca);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }
    
    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Profissional> get(@PathVariable("id") Long id) {
        Profissional registro = servico.get(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    // @Override
    // @GetMapping("/busca/{termoBusca}")
    // public ResponseEntity<List<Profissional>> get(@PathVariable("termoBusca") String termoBusca) {
    //     List<Profissional> registros = servico.get(termoBusca);
    //     return new ResponseEntity<>(registros, HttpStatus.OK);
    // }

    @Override
    @PostMapping("/")
    public ResponseEntity<Profissional> insert(@RequestBody Profissional objeto) {
        Profissional registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Profissional> update(@RequestBody Profissional objeto) {
        Profissional registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
