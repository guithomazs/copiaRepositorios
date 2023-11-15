package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Especialidade;
import br.ufac.sgcmapi.repository.EspecialidadeRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
public class EspecialidadeService implements IService<Especialidade> {

    @Autowired
    private EspecialidadeRepository repo;

    @Override
    public List<Especialidade> get() {
        return repo.findAll();
    }

    public Page<Especialidade> getWithPagination(
            @PositiveOrZero int pageNumber, 
            @Positive @Max(100) int pageSize, 
            String termoBusca) {
        Page<Especialidade> page = repo.busca(termoBusca, PageRequest.of(pageNumber, pageSize));
        return page;
    }

    @Override
    public Especialidade get(Long id) {
        return repo.findById(id).orElse(null);
    }

    // @Override
    // public List<Especialidade> get(String termoBusca) {
    //     return repo.busca(termoBusca);
    // }

    @Override
    public Especialidade save(Especialidade objeto) {
       return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
