import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service repo;
  newTodo = { "name": '' };

  get remaining() {
    return this.model.filterBy('done', 0);
  }

  get completed() {
    return this.model.filterBy('done', 1);
  }

  @action
  showAddTodo() {
    this.newTodo.name = '';
    this.repo.set('showNewItem', true);
  }

  @action
  createTodo() {
    this.repo.add(this.newTodo);
    this.newTodo.name = '';
  }

  @action
  clearCompleted() {
    this.model.removeObjects(this.completed);
    this.repo.persist();
  }
}
