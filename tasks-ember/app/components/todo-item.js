import { action, set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TodoItem extends Component {
  @service repo;
  @tracked editing = false;
  @tracked new = this.args.newItem;

  @action
  startEditing() {
    if (this.args.onStartEdit) this.args.onStartEdit();
    this.editing = true;
  }

  @action
  doneEditing(e) {
    if (!this.editing && !this.new) return;
    let todoName = e.target.value.trim();

    if (isBlank(todoName)) {
      this.removeTodo();
    } else {
      set(this.args.todo, 'name', todoName);
      if (this.editing) {
        const todo = {
          "field": "name",
          "value": todoName
        };
        this.repo.update(this.args.todo.id, todo);
      } 
      if (this.args.onEndEdit) this.args.onEndEdit();      
    }
    this.editing = false;
  }

  @action
  handleKeyup(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      this.editing = false;
    }
  }

  @action
  toggleCompleted(e) {
    const todo = {
      "field": "done",
      "value": !this.args.todo.done
    };
    this.repo.update(this.args.todo.id, todo);
    set(this.args.todo, 'done', !this.args.todo.done);
  }

  @action
  removeTodo() {
    this.repo.delete(this.args.todo);
  }
}
