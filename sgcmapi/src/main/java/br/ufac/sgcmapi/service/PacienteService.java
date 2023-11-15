package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import br.ufac.sgcmapi.model.Paciente;
import br.ufac.sgcmapi.repository.PacienteRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
public class PacienteService implements IService<Paciente> {

    @Autowired
    private PacienteRepository repo;

    @Override
    public List<Paciente> get() {
        return repo.findAll();
    }
    public Page<Paciente> getWithPagination(
        @PositiveOrZero int pageNumber, 
        @Positive @Max(100) int pageSize,
        String termoBusca
    ) {
        Page<Paciente> page = repo.busca(termoBusca, PageRequest.of(pageNumber, pageSize));
        return page;
    }

    @Override
    public Paciente get(Long id) {
        return repo.findById(id).orElse(null);
    }

    // @Override
    // public List<Paciente> get(String termoBusca) {
    //     return repo.busca(termoBusca);
    // }

    @Override
    public Paciente save(Paciente objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
