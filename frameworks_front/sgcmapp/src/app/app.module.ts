import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AgendaListComponent } from './component/agenda/agenda-list/agenda-list.component';
import { AgendaFormComponent } from './component/agenda/agenda-form/agenda-form.component';
import { AtendimentoListComponent } from './component/atendimento-list/atendimento-list.component';
import { ProfissionaisListComponent } from './component/profissionais/profissionais-list/profissionais-list.component';
import { ProfissionaisFormComponent } from './component/profissionais/profissionais-form/profissionais-form.component';
import { BarraComandosComponent } from './component/barra-comandos/barra-comandos.component';
import { PacientesListComponent } from './component/pacientes/pacientes-list/pacientes-list.component';
import { PacientesFormComponent } from './component/pacientes/pacientes-form/pacientes-form.component';
import { ConveniosListComponent } from './component/convenios/convenios-list/convenios-list.component';
import { ConveniosFormComponent } from './component/convenios/convenios-form/convenios-form.component';
import { UnidadesListComponent } from './component/unidades/unidades-list/unidades-list.component';
import { UnidadesFormComponent } from './component/unidades/unidades-form/unidades-form.component';
import { EspecialidadeListComponent } from './component/especialidade/especialidade-list/especialidade-list.component';
import { EspecialidadeFormComponent } from './component/especialidade/especialidade-form/especialidade-form.component';
import { UsuariosListComponent } from './component/usuarios/usuarios-list/usuarios-list.component';
import { UsuariosFormComponent } from './component/usuarios/usuarios-form/usuarios-form.component';
import { AlertaComponent } from './component/alerta/alerta.component';
import { ErroInterceptor } from './interceptor/erro.interceptor';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AgendaListComponent,
    AgendaFormComponent,
    AtendimentoListComponent,
    ProfissionaisListComponent,
    ProfissionaisFormComponent,
    BarraComandosComponent,
    PacientesListComponent,
    PacientesFormComponent,
    ConveniosListComponent,
    ConveniosFormComponent,
    UnidadesListComponent,
    UnidadesFormComponent,
    EspecialidadeListComponent,
    EspecialidadeFormComponent,
    UsuariosListComponent,
    UsuariosFormComponent,
    AlertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
