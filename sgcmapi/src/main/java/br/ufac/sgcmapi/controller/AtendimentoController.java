package br.ufac.sgcmapi.controller;

import java.time.LocalDate;
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

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.EStatus;
import br.ufac.sgcmapi.service.AtendimentoService;

@RestController
@RequestMapping("/atendimento")
public class AtendimentoController implements IController<Atendimento> {

    @Autowired
    private AtendimentoService servico;

    @Override
    @GetMapping("/")
    public ResponseEntity<Page<Atendimento>> get(Pageable page) {
        Page<Atendimento> registros = servico.get(page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{tipo}/")
    public ResponseEntity<Page<Atendimento>> getTipo(
            @PathVariable("tipo") String tipo, 
            Pageable page
            ) {
        Page<Atendimento> registros = servico.getTipo(tipo, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/lista/{tipos}")
    public ResponseEntity<Page<Atendimento>> getTiposDiferentes(
            @PathVariable("tipos") List<EStatus> tipos, 
            Pageable page
            ) {
        System.out.println();
        Page<Atendimento> registros = servico.getTipos(tipos, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/lista/{tipos}/{termoBusca}")
    public ResponseEntity<Page<Atendimento>> getTiposDiferentes(
            @PathVariable("tipos") List<EStatus> tipos, 
            @PathVariable("termoBusca") String termoBusca, 
            Pageable page
            ) {
        System.out.println();
        Page<Atendimento> registros = servico.getTipoBusca(tipos, termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> get(@PathVariable Long id) {
        Atendimento registro = servico.get(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<Page<Atendimento>> get(@PathVariable("termoBusca") String termoBusca, Pageable page) {
        Page<Atendimento> registros = servico.get(termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @GetMapping("/{tipo}/busca/{termoBusca}")
    public ResponseEntity<Page<Atendimento>> get(@PathVariable("tipo") String tipo, @PathVariable("termoBusca") String termoBusca, Pageable page) {
        Page<Atendimento> registros = servico.getTipoBusca(tipo, termoBusca, page);
        return new ResponseEntity<>(registros, HttpStatus.OK);
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Atendimento> insert(@RequestBody Atendimento objeto) {
        Atendimento registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Atendimento> update(@RequestBody Atendimento objeto) {
        Atendimento registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Atendimento> updateStatus(@PathVariable("id") Long id) {
        Atendimento registro = servico.updateStatus(id);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @GetMapping("/horarios/{idProfissional}/{data}")
    public ResponseEntity<List<String>> getHorarios(
            @PathVariable("idProfissional") Long idProfissional,
            @PathVariable("data") LocalDate data) {
        List<String> horarios = servico.getHorarios(idProfissional, data);
        return new ResponseEntity<>(horarios, HttpStatus.OK);
    }
    
}
