package br.ufac.sgcmapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    
    @Query( "SELECT us FROM Usuario us "        +
            "WHERE us.nomeCompleto LIKE %?1% "  +
            "OR us.id = ?1 " +
            "OR us.nomeUsuario LIKE %?1% ")
    List<Usuario> busca(String termoBusca);

    @Query("SELECT us.papel FROM Usuario us WHERE us.papel = 'ROLE_ADMIN'")
    List<String> teste();
    
}
