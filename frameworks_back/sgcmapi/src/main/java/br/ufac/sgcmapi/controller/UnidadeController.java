package br.ufac.sgcmapi.controller;

import java.util.List;
import java.util.Map;

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

import br.ufac.sgcmapi.model.Unidade;
import br.ufac.sgcmapi.service.UnidadeService;

@RestController
@RequestMapping("/config/unidade")
public class UnidadeController implements IController<Unidade> {

    @Autowired
    private UnidadeService servico;
    
    public UnidadeController(UnidadeService servico){
        this.servico = servico;
    }

    @Override
    @GetMapping("/")
    public ResponseEntity<List<Unidade>> get() {    
        List<Unidade> unidades = servico.get();
        return new ResponseEntity<>(unidades, HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Unidade> get(@PathVariable Long id) {
        Unidade unidades = servico.get(id);
        return new ResponseEntity<>(unidades, HttpStatus.OK);
    }

    @Override
    @GetMapping("/busca/{termoBusca}")
    public ResponseEntity<List<Unidade>> get(@PathVariable("termoBusca") String termoBusca) {
        List<Unidade> registros = servico.get(termoBusca);
        return new ResponseEntity<>(registros, HttpStatus.OK); 
    }

    @Override
    @PostMapping("/")
    public ResponseEntity<Unidade> insert(@RequestBody Unidade objeto) {
        Unidade unidades = servico.save(objeto);
        return new ResponseEntity<>(unidades, HttpStatus.CREATED);
    }

    @Override
    @PutMapping("/")
    public ResponseEntity<Unidade> update(@RequestBody Unidade objeto) {
        Unidade registro = servico.save(objeto);
        return new ResponseEntity<>(registro, HttpStatus.OK);
    }

    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        servico.delete(id);
        return new ResponseEntity<> (HttpStatus.OK);
    }

    @GetMapping("/profissionais")
    public ResponseEntity<Map<String, List<String>>> getProfessionalsBySpecialities() {
        Map<String, List<String>> professionals = servico.getProfessionalsByUnities("");
        return new ResponseEntity<>(professionals, HttpStatus.OK);
    }

    @GetMapping("/profissionais/{nomeUnidade}")
    public ResponseEntity<Map<String, List<String>>> getSpecialityProfessionals(@PathVariable("nomeUnidade") String nomeUnidade) {
        Map<String, List<String>> professionals = servico.getProfessionalsByUnities(nomeUnidade);
        return new ResponseEntity<>(professionals, HttpStatus.OK);
    }
    
}
