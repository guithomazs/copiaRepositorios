package br.ufac.sgcmapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Unidade;
import br.ufac.sgcmapi.repository.UnidadeRepository;

@Service
public class UnidadeService implements IService<Unidade> {

    @Autowired
    UnidadeRepository repo;

    public UnidadeService (UnidadeRepository repo){
        this.repo = repo;
    }

    @Override
    public List<Unidade> get() {
        return repo.findAll();
    }

    @Override
    public Unidade get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Unidade> get(String termoBusca) {
        return repo.busca(termoBusca);
    }

    @Override
    public Unidade save(Unidade objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Map<String, List<String>> getProfessionalsByUnities(String nomeUnidade){
        List<String[]> unidades = repo.getProfessionalsByUnity(nomeUnidade);
        
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        for (String[] objeto: unidades) {
            if(!map.containsKey((String)(objeto[0]))){
                map.put((String)(objeto[0]), new ArrayList<String>());
            }
            map.get((String)(objeto[0])).add((String)(objeto[1]));
        }
        return map;

    }
    
}
