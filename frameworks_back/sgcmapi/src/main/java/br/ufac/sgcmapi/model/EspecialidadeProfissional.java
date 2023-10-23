package br.ufac.sgcmapi.model;

import java.util.ArrayList;
import java.util.List;

public class EspecialidadeProfissional {
    public EspecialidadeProfissional (Long id, String nome){
        this.setId(id);
        this.setNome(nome);
    }

    private Long id;

    private String nome;

    private List<Profissional> profissionais = new ArrayList<>();
    
    public List<Profissional> getProfissionais() {
        return profissionais;
    }

    public void setProfissionais(List<Profissional> profissionais) {
        this.profissionais = profissionais;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void addProfissional(Profissional profissional){
        this.profissionais.add(profissional);
    }
}
