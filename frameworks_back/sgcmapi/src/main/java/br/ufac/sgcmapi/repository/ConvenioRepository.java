package br.ufac.sgcmapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Convenio;

public interface ConvenioRepository extends JpaRepository<Convenio, Long> {

    @Query( "SELECT c FROM Convenio c "         +
            "Where c.nome LIKE %?1% "           +
            "OR c.razaoSocial LIKE %?1% "       +
            "OR c.cnpj LIKE %?1% "              +
            "OR c.representante LIKE %?1% "     +
            "OR c.email LIKE %?1% "             +
            "OR c.telefone LIKE %?1% "          +
            "OR c.ativo LIKE %?1%")
    List<Convenio> busca(String termoBusca);

    @Query("SELECT c.nome, a FROM Convenio c " +
            "LEFT JOIN Atendimento a ON c.id = a.convenio " +
            "WHERE c.nome LIKE %?1%")
    List<Object[]> AtendimentosPorConvenio(String termoBusca);
    
}
