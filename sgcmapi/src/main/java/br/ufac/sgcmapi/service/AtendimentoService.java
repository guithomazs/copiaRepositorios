package br.ufac.sgcmapi.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.ufac.sgcmapi.model.Atendimento;
import br.ufac.sgcmapi.model.EStatus;
import br.ufac.sgcmapi.model.Profissional;
import br.ufac.sgcmapi.repository.AtendimentoRepository;

@Service
public class AtendimentoService implements IService<Atendimento> {

    @Autowired
    private AtendimentoRepository repo;

    @Override
    public Page<Atendimento> get(Pageable page) {
        return repo.findAll(page);
    }

    public List<EStatus> defineListaEStatus(String tipo) {
        List<EStatus> status = new ArrayList<>();
        if(tipo.equals("agenda")){
            status.add(EStatus.AGENDADO);
            status.add(EStatus.CONFIRMADO);
        } else if (tipo.equals("emAndamento")) {
            status.add(EStatus.CHEGADA);
            status.add(EStatus.ATENDIMENTO);
        } else if (tipo.equals("encerrado")) {
            status.add(EStatus.ENCERRADO);
        } else if (tipo.equals("cancelado")) {
            status.add(EStatus.CANCELADO);
        }
        return status;
    }

    public Page<Atendimento> getTipo(String tipo, Pageable page) {
        List<EStatus> status = this.defineListaEStatus(tipo);
        return repo.getTipos(status, page);
    }

    public Page<Atendimento> getTipoBusca(String tipo, String termoBusca, Pageable page) {
        List<EStatus> status = this.defineListaEStatus(tipo);
        return repo.buscaPorTipo(termoBusca, status, page);
    }

    @Override
    public Atendimento get(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public Page<Atendimento> get(String termoBusca, Pageable page) {
        return repo.busca(termoBusca, page);
    }

    @Override
    public Atendimento save(Atendimento objeto) {
        return repo.save(objeto);
    }

    @Override
    public void delete(Long id) {
        Atendimento registro = this.get(id);
        registro.setStatus(EStatus.CANCELADO);
        repo.save(registro);
    }

    public Atendimento updateStatus(Long id) {
        Atendimento registro = this.get(id);
        registro.setStatus(registro.getStatus().proximo());
        repo.save(registro);
        return registro;
    }

    public List<String> getHorarios(Long idProfissional, LocalDate data) {

        Profissional profissional = new Profissional();
        profissional.setId(idProfissional);

        List<Atendimento> atendimentos = repo.findByProfissionalAndDataAndStatusNot(
            profissional, data, EStatus.CANCELADO);
        
        List<String> horarios = new ArrayList<>();
        for (Atendimento atendimento : atendimentos) {
            horarios.add(atendimento.getHora().toString() + ":00");
        }

        return horarios;
        
    }
    
}
