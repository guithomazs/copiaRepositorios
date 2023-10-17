package br.ufac.sgcmapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.Convenio;
import br.ufac.sgcmapi.repository.ConvenioRepository;

@Service
public class ConvenioService implements IService<Convenio> {

    @Autowired
    private ConvenioRepository repo;

    public ConvenioService(ConvenioRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Convenio> get() {
        return repo.findAll();
    }

    @Override
    public Convenio get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Convenio> get(String termoBusca) {
        return repo.busca(termoBusca);
    }
 
    @Override
    public Convenio save(Convenio objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    public boolean existsById(Long id) {
        return repo.existsById(id);
    }

    public Map<String, List<Atendimento>> AtendimentosPorConvenio(String nomeEspecialidade){
        List<Object[]> professionals = repo.AtendimentosPorConvenio(nomeEspecialidade);

        Map<String, List<Atendimento>> map = new HashMap<String, List<Atendimento>>();
        for (Object[] objeto: professionals) {
            if(!map.containsKey((String)(objeto[0]))){
                map.put((String)(objeto[0]), new ArrayList<Atendimento>());
            }
            map.get((String)(objeto[0])).add((Atendimento)(objeto[1]));
        }
        return map;
    }
    
}
