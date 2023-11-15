package br.ufac.sgcmapi.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.EStatus;
import br.ufac.sgcmapi.model.Profissional;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {

    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p.id = a.profissional" +
        " LEFT JOIN Paciente pa ON pa.id = a.paciente" +
        " LEFT JOIN Convenio c ON c.id = a.convenio" +
        " LEFT JOIN Unidade u ON u.id = p.unidade" +
        " LEFT JOIN Especialidade e ON e.id = p.especialidade" +
        " WHERE p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%")
    Page<Atendimento> busca(String termoBusca, Pageable pageable);
    // List<Atendimento> busca(String termoBusca);

    List<Atendimento> findByProfissionalAndDataAndStatusNot(
        Profissional profissional, LocalDate data, EStatus status);

    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p.id = a.profissional" +
        " LEFT JOIN Paciente pa ON pa.id = a.paciente" +
        " LEFT JOIN Convenio c ON c.id = a.convenio" +
        " LEFT JOIN Unidade u ON u.id = p.unidade" +
        " LEFT JOIN Especialidade e ON e.id = p.especialidade" +
        " WHERE (a.status = EStatus.AGENDADO or a.status = EStatus.CONFIRMADO)" +
        " AND (p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%)")
    Page<Atendimento> getAgenda(String termoBusca, Pageable pageable);
    
    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p.id = a.profissional" +
        " LEFT JOIN Paciente pa ON pa.id = a.paciente" +
        " LEFT JOIN Convenio c ON c.id = a.convenio" +
        " LEFT JOIN Unidade u ON u.id = p.unidade" +
        " LEFT JOIN Especialidade e ON e.id = p.especialidade" +
        " WHERE (a.status = EStatus.CHEGADA or a.status = EStatus.ATENDIMENTO)" +
        " AND (p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%)")
    Page<Atendimento> getEmAndamento(String termoBusca, Pageable pageable);
    
    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p.id = a.profissional" +
        " LEFT JOIN Paciente pa ON pa.id = a.paciente" +
        " LEFT JOIN Convenio c ON c.id = a.convenio" +
        " LEFT JOIN Unidade u ON u.id = p.unidade" +
        " LEFT JOIN Especialidade e ON e.id = p.especialidade" +
        " WHERE a.status = EStatus.ENCERRADO" +
        " AND (p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%)")
    Page<Atendimento> getFinalizados(String termoBusca, Pageable pageable);
    
    @Query("SELECT a FROM Atendimento a" +
        " LEFT JOIN Profissional p ON p.id = a.profissional" +
        " LEFT JOIN Paciente pa ON pa.id = a.paciente" +
        " LEFT JOIN Convenio c ON c.id = a.convenio" +
        " LEFT JOIN Unidade u ON u.id = p.unidade" +
        " LEFT JOIN Especialidade e ON e.id = p.especialidade" +
        " WHERE a.status = EStatus.CANCELADO" +
        " AND (p.nome LIKE %?1%" +
        " OR pa.nome LIKE %?1%" +
        " OR c.nome LIKE %?1%" +
        " OR u.nome LIKE %?1%" +
        " OR e.nome LIKE %?1%)")
    Page<Atendimento> getCancelados(String termoBusca, Pageable pageable);



    
}
