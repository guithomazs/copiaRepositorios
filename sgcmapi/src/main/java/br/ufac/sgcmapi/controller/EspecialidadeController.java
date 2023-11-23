package br.ufac.sgcmapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import br.ufac.sgcmapi.model.Especialidade;
import br.ufac.sgcmapi.service.EspecialidadeService;

@RestController
@RequestMapping("/config/especialidade")
public class EspecialidadeController implements IController<Especialidade> {

    @Autowired
    private EspecialidadeService servico;

    @GetMapping("/all")
    public ResponseEntity<List<Especialidade>> getAll () {
        List<Especialidade> result = servico.getAll();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<Page<Especialidade>> get(Pageable page) {
        Page<Especialidade> registros = servico.get(page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Especialidade> get(@PathVariable("id") Long id) {
        Especialidade registro = servico.get(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<Page<Especialidade>> get(@PathVariable("termoBusca") String termoBusca, Pageable page) {
        Page<Especialidade> registros = servico.get(termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Especialidade> insert(@RequestBody Especialidade objeto) {
        Especialidade registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Especialidade> update(@RequestBody Especialidade objeto) {
        Especialidade registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
