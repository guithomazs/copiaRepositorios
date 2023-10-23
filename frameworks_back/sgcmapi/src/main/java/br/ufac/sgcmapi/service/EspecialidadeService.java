package br.ufac.sgcmapi.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Especialidade;
import br.ufac.sgcmapi.model.EspecialidadeProfissional;
import br.ufac.sgcmapi.model.Profissional;
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
    
    public List<EspecialidadeProfissional> getProfessionalsBySpecialities_2(String nomeEspecialidade){
        List<Object[]> professionals = repo.getProfessionalsBySpecialities_2(nomeEspecialidade);
        List<EspecialidadeProfissional> result = new ArrayList<>();
        EspecialidadeProfissional lastEspecialidade = null;

        for (Object[] objeto: professionals) {
            Especialidade esp = (Especialidade)objeto[0];
            if (lastEspecialidade == null || lastEspecialidade.getId() != esp.getId()){
                lastEspecialidade = new EspecialidadeProfissional(esp.getId(), esp.getNome());
                result.add(lastEspecialidade);
            }
            lastEspecialidade.addProfissional((Profissional)objeto[1]);
        }
        return result;

    }
      
}
