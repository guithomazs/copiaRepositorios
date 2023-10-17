
package br.ufac.sgcmapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Unidade;

public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    @Query("SELECT u FROM Unidade u" +
        " WHERE u.nome LIKE %?1%" +
        " OR u.endereco LIKE %?1%")
    List<Unidade> busca(String termoBusca);

    @Query("SELECT u.nome, p.nome FROM Profissional p " +
           "INNER JOIN Unidade u ON u.id = p.unidade " +
           "WHERE u.nome like %?1%")
    List<String[]> getProfessionalsByUnity(String nomeUnidade);
}
