import { Component, OnInit, Renderer2 } from '@angular/core';
import { Profissional } from 'src/app/model/profissional';
import { AlertaService } from 'src/app/service/alerta.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { Especialidade } from 'src/app/model/especialidade';
import { Unidade } from 'src/app/model/unidade';
import { UnidadeService } from 'src/app/service/unidade.service';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styles: [
  ]
})
export class ProfissionalListComponent implements OnInit, IList<Profissional> {
  constructor(
    private servico: ProfissionalService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
    private servicoEspecialidade: EspecialidadeService,
    private servicoUnidade: UnidadeService,
  ) { }

  ngOnInit(): void {
    
    this.servicoEspecialidade.get().subscribe({
      next: (resposta: Especialidade[]) => {
        this.especialidades = resposta;
      }
    });

    this.servicoUnidade.get().subscribe({
      next: (resposta: Unidade[]) => {
        this.unidades = resposta;
      }
    });

    this.get();
  }

  unidades: Unidade[] = Array<Unidade>();
  
  unidadeEscolhida: string = "0";
  especialidadeEscolhida: string = "0";

  especialidades: Especialidade[] = Array<Especialidade>();
  registros: Profissional[] = Array<Profissional>();
  profissionaisFiltrados: Profissional[] = Array<Profissional>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Profissional[]) => {
        this.registros = resposta;
      }, complete: () => {
        this.profissionaisFiltrados = this.registros
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o profissional?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Operação realizada com sucesso."
          });
        }
      });
    }
  }

  filtraPorUnidade(unidade: string) {
    this.unidadeEscolhida = unidade;
    if(unidade != "0") {
      this.profissionaisFiltrados = 
        this.especialidadeEscolhida != "0" 
            ? 
          this.registros.filter(profissional => profissional.unidade.nome === unidade && profissional.especialidade.nome === this.especialidadeEscolhida)
            :
            this.registros.filter(profissional => profissional.unidade.nome === unidade)
    } else {
      this.profissionaisFiltrados = 
        this.especialidadeEscolhida == "0" 
            ? 
          this.registros 
            : 
            this.registros.filter(profissional => profissional.unidade.nome === this.especialidadeEscolhida)
    }
    this.changeImageAndTableHeadDisplay(true);
  };

  filtraPorEspecialidade(especialidade: string) {
    this.especialidadeEscolhida = especialidade;
    if(especialidade != "0") {
      this.profissionaisFiltrados = 
        this.unidadeEscolhida != "0" 
            ? 
          this.registros.filter(profissional => profissional.especialidade.nome === especialidade && profissional.unidade.nome === this.unidadeEscolhida)
            :
            this.registros.filter(profissional => profissional.especialidade.nome === especialidade)
    } else {
      this.profissionaisFiltrados = 
        this.unidadeEscolhida == "0" 
            ? 
          this.registros 
            : 
            this.registros.filter(profissional => profissional.unidade.nome === this.unidadeEscolhida)
    }
    this.changeImageAndTableHeadDisplay(true);
  }

  ja_entrado: boolean = false;
  changeImageAndTableHeadDisplay(porBusca?: boolean) {
    
    let tableHead = document.querySelector('table thead');
    let imageRow = document.querySelector('img#pepeImage');
    let textoDeSemResultados = document.querySelector('div.textoNormal');
    
    if (this.profissionaisFiltrados.length == 0){
      this.renderer.setStyle(tableHead, 'display', 'table');
      
      !porBusca ? this.renderer.setStyle(imageRow, 'display', '') : this.renderer.setStyle(textoDeSemResultados, 'display', '');

      if(!this.ja_entrado && !porBusca){
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SEM_REGISTROS,
          mensagem: "Não há registros para essa tabela."
        });
      }
      this.ja_entrado = !this.ja_entrado
    }
    else {
      this.renderer.setStyle(tableHead, 'display', 'contents');
      this.renderer.setStyle(imageRow, 'display', 'none');
      this.renderer.setStyle(textoDeSemResultados, 'display', 'none');
      // this.servicoAlerta.fecharAlerta();
    }
  }

}