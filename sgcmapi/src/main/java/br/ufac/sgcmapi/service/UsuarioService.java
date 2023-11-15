package br.ufac.sgcmapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Usuario;
import br.ufac.sgcmapi.repository.UsuarioRepository;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Service
public class UsuarioService implements IService<Usuario> {

    @Autowired
    private UsuarioRepository repo;

    @Override
    public List<Usuario> get() {
        return repo.findAll();
    }
    
    public Page<Usuario> getWithPagination(
            @PositiveOrZero int pageNumber, 
            @Positive @Max(100) int pageSize,
            String termoBusca) {
        Page<Usuario> page = repo.busca(termoBusca, PageRequest.of(pageNumber, pageSize));
        return page;
    }

    @Override
    public Usuario get(Long id) {
        return repo.findById(id).orElse(null);
    }

    // @Override
    // public List<Usuario> get(String termoBusca) {
    //     return repo.busca(termoBusca);
    // }

    @Override
    public Usuario save(Usuario objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
}
