import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListComponent } from './component/agenda-list/agenda-list.component';
import { AgendaFormComponent } from './component/agenda-form/agenda-form.component';
import { AtendimentoListComponent } from './component/atendimento-list/atendimento-list.component';
import { ProfissionaisListComponent } from './component/profissionais/profissionais-list/profissionais-list.component';
import { ProfissionaisFormComponent } from './component/profissionais/profissionais-form/profissionais-form.component';
import { EspecialidadeListComponent } from './component/especialidade/especialidade-list/especialidade-list.component';
import { EspecialidadeFormComponent } from './component/especialidade/especialidade-form/especialidade-form.component';
import { PacientesFormComponent } from './component/pacientes/pacientes-form/pacientes-form.component';
import { PacientesListComponent } from './component/pacientes/pacientes-list/pacientes-list.component';
import { ConveniosListComponent } from './component/convenios/convenios-list/convenios-list.component';
import { ConveniosFormComponent } from './component/convenios/convenios-form/convenios-form.component';
import { UnidadesFormComponent } from './component/unidades/unidades-form/unidades-form.component';
import { UnidadesListComponent } from './component/unidades/unidades-list/unidades-list.component';
import { UsuariosFormComponent } from './component/usuarios/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './component/usuarios/usuarios-list/usuarios-list.component';

const routes: Routes = [
  { path: 'agenda', component: AgendaListComponent },
  { path: 'agenda/form', component: AgendaFormComponent },
  { path: 'atendimento', component: AtendimentoListComponent },
  { path: 'pacientes/form', component: PacientesFormComponent },
  { path: 'pacientes', component: PacientesListComponent },
  { path: 'profissionais/form', component: ProfissionaisFormComponent },
  { path: 'profissionais', component: ProfissionaisListComponent },
  { path: 'convenios/form', component: ConveniosFormComponent },
  { path: 'convenios', component: ConveniosListComponent },
  { path: 'config/especialidades/form', component: EspecialidadeFormComponent},
  { path: 'config/especialidades', component: EspecialidadeListComponent},
  { path: 'config/unidades/form', component: UnidadesFormComponent},
  { path: 'config/unidades', component: UnidadesListComponent},
  { path: 'config/usuarios/form', component: UsuariosFormComponent},
  { path: 'config/usuarios', component: UsuariosListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
