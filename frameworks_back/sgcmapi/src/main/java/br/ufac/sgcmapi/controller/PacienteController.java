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

import br.ufac.sgcmapi.model.Paciente;
import br.ufac.sgcmapi.service.PacienteService;

@RestController
@RequestMapping("/paciente")
public class PacienteController implements IController<Paciente> {

    @Autowired
    private PacienteService service;

    public PacienteController(PacienteService service){
        this.service = service;
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Paciente>> get() {
        List<Paciente> registros = service.get();
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Paciente> get(@PathVariable Long id) {
        Paciente registro = service.get(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @GetMapping("/busca/{pacienteBusca}")
    public ResponseEntity<List<Paciente>> get(@PathVariable("pacienteBusca") String termoBusca) {
        List<Paciente> pacientes = service.get(termoBusca);
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Paciente> insert(@RequestBody Paciente objeto) {
        Paciente paciente = service.save(objeto);
        return new ResponseEntity<>(paciente, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Paciente> update(@RequestBody Paciente objeto) {
        Paciente paciente = service.save(objeto);
        return new ResponseEntity<>(paciente, HttpStatus.OK);

    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
       
    }

}
