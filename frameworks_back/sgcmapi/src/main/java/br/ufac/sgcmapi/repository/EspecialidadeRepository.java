package br.ufac.sgcmapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Especialidade;

public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long> {
    
    @Query("SELECT e FROM Especialidade e "    +
            "WHERE e.nome LIKE %?1%")
    List<Especialidade> busca(String termoBusca);
    
    @Query("SELECT e.nome, p.nome FROM Profissional p " +
           "INNER JOIN Especialidade e ON e.id = p.especialidade " +
           "WHERE e.nome like %?1%")
    List<String[]> getProfessionalsBySpecialities(String nomeEspecialidade);

}