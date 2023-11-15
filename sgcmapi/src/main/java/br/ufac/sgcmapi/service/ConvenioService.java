package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Convenio;

import br.ufac.sgcmapi.repository.ConvenioRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
public class ConvenioService implements IService<Convenio> {

    @Autowired
    private ConvenioRepository repo;

    @Override
    public List<Convenio> get() {
        return repo.findAll();
    }

    public Page<Convenio> getWithPagination(
            @PositiveOrZero int pageNumber, 
            @Positive @Max(100) int pageSize,
            String termoBusca) {
        Page<Convenio> page = repo.busca(termoBusca, PageRequest.of(pageNumber, pageSize));
        return page;
    }

    @Override
    public Convenio get(Long id) {
        return repo.findById(id).orElse(null);
    }

    // @Override
    // public List<Convenio> get(String termoBusca) {
    //     return repo.busca(termoBusca);
    // }

    @Override
    public Convenio save(Convenio objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
