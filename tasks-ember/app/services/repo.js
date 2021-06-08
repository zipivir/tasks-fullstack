import { A } from '@ember/array';
import Service from '@ember/service';
import fetch from 'fetch';

export default class RepoService extends Service {
  lastId = 0;
  data = [];
  showNewItem = false;
  basic_host = 'http://localhost:8000/tasks/';
  fetchHeaders = {
    'Content-type' : 'application/json',
    'Accept' : 'application/json'
  };

  async findAll() {
    try {
      let response = await fetch(this.basic_host);
      this.data = await response.json();
      console.log('getAll - data: ', this.data);
      window.localStorage.setItem('todos', JSON.stringify(this.data));

      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch(err) {
      console.log('get tasks err: ', err);
    }
    return this.data;
  }

  async add(attrs) {
    try {
      const response = await fetch(this.basic_host, { 
        headers: this.fetchHeaders, 
        method: 'POST', body: JSON.stringify(attrs) 
      });
      const finalResponse = await response.json();
      console.log('add todo response: ', response);
      if (!response.ok) {
        alert('error on create todo: '+ finalResponse.message);
      }
      else if (finalResponse.id) {
        this.set('showNewItem', false);
        this.data.pushObject(finalResponse);
        this.persist();
      } 
      // return finalResponse;
    }
    catch(err) {
      console.log('add todo err: ', err.message);
      alert('error on create todo: '+ err.message);
    }
  }

  async update(id, todo) {
    try {
      console.log('update todo: ', todo);
      const response = await fetch(this.basic_host + id , {
        headers: this.fetchHeaders, 
        method: 'PUT', body: JSON.stringify(todo) 
      });
      const finalResponse = await response.json();
      console.log('update item response: ', finalResponse);
      // this.data.pushObject(todo);
    }
    catch(err) {
      console.log('update item err: ', err);
    }
    this.persist();
  }

  async delete(todo) {
    console.log('delete todo: ', todo)
    const response = await fetch(this.basic_host + todo.id, { method: 'DELETE' });
    const finalResponse = await response.json();
    console.log('delete item data: ', finalResponse);
    this.data.removeObject(todo);
    this.persist();
  }

  persist() {
    window.localStorage.setItem('todos', JSON.stringify(this.data));
    // this.findAll();
  }
}
