package br.ufac.sgcmapi.controller;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.Convenio;
import br.ufac.sgcmapi.service.ConvenioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/convenio")
public class ConvenioController implements IController<Convenio> {

    @Autowired
    private ConvenioService servico;

    // Get all
    @Override
    @GetMapping("/")
    public ResponseEntity<List<Convenio>> get() {
        List<Convenio> convenios = servico.get();
        return new ResponseEntity<>(convenios, HttpStatus.OK);
    }

    // Get by id
    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Convenio> get(@PathVariable Long id) {
        Convenio convenio = servico.get(id);
        return new ResponseEntity<>(convenio, HttpStatus.OK);
    }

    // get by String
    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Convenio>> get(@PathVariable String termoBusca) {
        List<Convenio> convenios = servico.get(termoBusca);
        return new ResponseEntity<>(convenios, HttpStatus.OK);
    }

    // Post
    @Override
    @PostMapping("/")
    public ResponseEntity<Convenio> insert(@RequestBody Convenio objeto) {
        Convenio convenio = servico.save(objeto);
        return new ResponseEntity<>(convenio, HttpStatus.CREATED);
    }

    // edit
    @Override
    @PutMapping("/")
    public ResponseEntity<Convenio> update(@RequestBody Convenio objeto) {
        Convenio convenio = servico.save(objeto);
        return new ResponseEntity<>(convenio, HttpStatus.OK);
    }

    // delete
    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (servico.existsById(id)) {
            servico.delete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/atendimentos")
    public ResponseEntity<Map<String, List<Atendimento>>> AtendimentosPorConvenio() {
        Map<String, List<Atendimento>> professionals = servico.AtendimentosPorConvenio("");
        return new ResponseEntity<>(professionals, HttpStatus.OK);
    }

    @GetMapping("/atendimentos/{nomeEspecialidade}")
    public ResponseEntity<Map<String, List<Atendimento>>> AtendimentosDosConvenios(@PathVariable("nomeEspecialidade") String nomeEspecialidade) {
        Map<String, List<Atendimento>> professionals = servico.AtendimentosPorConvenio(nomeEspecialidade);
        return new ResponseEntity<>(professionals, HttpStatus.OK);
    }

}
