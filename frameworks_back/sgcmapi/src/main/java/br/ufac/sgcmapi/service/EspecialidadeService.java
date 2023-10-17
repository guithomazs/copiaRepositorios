package br.ufac.sgcmapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Especialidade;
import br.ufac.sgcmapi.repository.EspecialidadeRepository;

@Service
public class EspecialidadeService implements IService<Especialidade> {
    
    @Autowired
    private EspecialidadeRepository repo;

    public EspecialidadeService(EspecialidadeRepository repo){
        this.repo = repo;
    }

    @Override
    public List<Especialidade> get() {
        return repo.findAll();
    }

    @Override
    public Especialidade get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Especialidade> get(String termoBusca) {
        return repo.busca(termoBusca);
    }

    @Override
    public Especialidade save(Especialidade objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        Especialidade registro = this.get(id);
        repo.delete(registro);
    }
    
    public Map<String, List<String>> getProfessionalsBySpecialities(String nomeEspecialidade){
        List<String[]> professionals = repo.getProfessionalsBySpecialities(nomeEspecialidade);
        
        Map<String, List<String>> map = new HashMap<String, List<String>>();
        for (String[] objeto: professionals) {
            if(!map.containsKey((String)(objeto[0]))){
                map.put((String)(objeto[0]), new ArrayList<String>());
            }
            map.get((String)(objeto[0])).add((String)(objeto[1]));
        }
        return map;

    }
      
}
