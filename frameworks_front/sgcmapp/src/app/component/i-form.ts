import { NgForm } from '@angular/forms';

export interface IForm<T> {
    registros: T;
    save(form: NgForm): void;
}
