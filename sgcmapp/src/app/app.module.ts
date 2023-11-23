import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaListComponent } from './component/agenda-list/agenda-list.component';
import { AgendaFormComponent } from './component/agenda-form/agenda-form.component';
import { AtendimentoListComponent } from './component/atendimento-list/atendimento-list.component';
import { FormsModule } from '@angular/forms';
import { BarraComandosComponent } from './component/barra-comandos/barra-comandos.component';
import { AlertaComponent } from './component/alerta/alerta.component';
import { ErroInterceptor } from './interceptor/erro.interceptor';
import { ConvenioFormComponent } from './component/convenio-form/convenio-form.component';
import { ConvenioListComponent } from './component/convenio-list/convenio-list.component';
import { EspecialidadeListComponent } from './component/especialidade-list/especialidade-list.component';
import { EspecialidadeFormComponent } from './component/especialidade-form/especialidade-form.component';
import { PacienteFormComponent } from './component/paciente-form/paciente-form.component';
import { PacienteListComponent } from './component/paciente-list/paciente-list.component';
import { ProfissionalListComponent } from './component/profissional-list/profissional-list.component';
import { ProfissionalFormComponent } from './component/profissional-form/profissional-form.component';
import { UnidadeFormComponent } from './component/unidade-form/unidade-form.component';
import { UnidadeListComponent } from './component/unidade-list/unidade-list.component';
import { UsuarioListComponent } from './component/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './component/usuario-form/usuario-form.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PaginacaoComponent } from './component/paginacao/paginacao.component';
import { TheadOrdenacaoComponent } from './component/thead-ordenacao/thead-ordenacao.component';
import { AtendimentosFinalizadosComponent } from './component/atendimentos-finalizados/atendimentos-finalizados.component';
import { AtendimentosCanceladosComponent } from './component/atendimentos-cancelados/atendimentos-cancelados.component';
import { SeletorTemaComponent } from './component/seletor-tema/seletor-tema.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaListComponent,
    AgendaFormComponent,
    AtendimentoListComponent,
    BarraComandosComponent,
    AlertaComponent,
    ConvenioFormComponent,
    ConvenioListComponent,
    EspecialidadeListComponent,
    EspecialidadeFormComponent,
    PacienteFormComponent,
    PacienteListComponent,
    ProfissionalListComponent,
    ProfissionalFormComponent,
    UnidadeFormComponent,
    UnidadeListComponent,
    UsuarioListComponent,
    UsuarioFormComponent,
    LoaderComponent,
    LoginComponent,
    PaginacaoComponent,
    TheadOrdenacaoComponent,
    AtendimentosFinalizadosComponent,
    AtendimentosCanceladosComponent,
    SeletorTemaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
