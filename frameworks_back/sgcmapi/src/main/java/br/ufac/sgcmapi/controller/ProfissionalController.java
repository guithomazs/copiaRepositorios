package br.ufac.sgcmapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.service.ProfissionalService;


@RestController
@RequestMapping("/profissional")
public class ProfissionalController implements IController<Profissional> {

    @Autowired
    private ProfissionalService servico;
    
    public ProfissionalController(ProfissionalService servico) {
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Profissional>> get() {
        List<Profissional> profissionais = servico.get();
        return new ResponseEntity<List<Profissional>>(profissionais, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Profissional> get(@PathVariable Long id) {
        Profissional profissionais = servico.get(id);
        return new ResponseEntity<>(profissionais, HttpStatus.OK);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Profissional>> get(@PathVariable("termoBusca") String termoBusca) {
        List<Profissional> profissionais = servico.get(termoBusca);
        return new ResponseEntity<>(profissionais, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<Profissional> insert(@RequestBody Profissional objeto) {
        Profissional profissionais = servico.save(objeto);
        return new ResponseEntity<>(profissionais, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Profissional> update(@RequestBody Profissional objeto) {
        Profissional profissionais = servico.save(objeto);
        return new ResponseEntity<>(profissionais, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
