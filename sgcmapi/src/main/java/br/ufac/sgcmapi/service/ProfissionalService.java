package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.repository.ProfissionalRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
public class ProfissionalService implements IService<Profissional> {

    @Autowired
    private ProfissionalRepository repo;

    @Override
    public List<Profissional> get() {
        return repo.findAll();
    }

    public Page<Profissional> getWithPagination(
            @PositiveOrZero int pageNumber, 
            @Positive @Max(100) int pageSize,
            String termoBusca) {
        Page<Profissional> page = repo.busca(termoBusca, PageRequest.of(pageNumber, pageSize));
        return page;
    }

    @Override
    public Profissional get(Long id) {
        return repo.findById(id).orElse(null);
    }

    // @Override
    // public List<Profissional> get(String termoBusca) {
    //     return repo.busca(termoBusca);
    // }

    @Override
    public Profissional save(Profissional objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
