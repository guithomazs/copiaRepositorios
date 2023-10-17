import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListComponent } from './component/agenda-list/agenda-list.component';
import { AgendaFormComponent } from './component/agenda-form/agenda-form.component';
import { AtendimentoListComponent } from './component/atendimento-list/atendimento-list.component';
import { ProfissionaisListComponent } from './component/profissionais/profissionais-list/profissionais-list.component';
import { ProfissionaisFormComponent } from './component/profissionais/profissionais-form/profissionais-form.component';
import { EspecialidadeListComponent } from './component/especialidade/especialidade-list/especialidade-list.component';
import { EspecialidadeFormComponent } from './component/especialidade/especialidade-form/especialidade-form.component';

const routes: Routes = [
  { path: 'agenda', component: AgendaListComponent },
  { path: 'agenda/form', component: AgendaFormComponent },
  { path: 'atendimento', component: AtendimentoListComponent },
  { path: 'profissionais/form', component: ProfissionaisFormComponent },
  { path: 'profissionais', component: ProfissionaisListComponent },
  { path: 'config/especialidades/form', component: EspecialidadeFormComponent},
  { path: 'config/especialidades', component: EspecialidadeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
