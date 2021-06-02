import { A } from '@ember/array';
import Service from '@ember/service';
import fetch from 'fetch';

export default class RepoService extends Service {
  lastId = 0;
  data = null;
  
  async findAll() {
    let fetchObject = {
      method: 'GET',
      headers : {
          'Content-type' : 'application/json',
          'Accept' : 'application/json'
      },
    };

    let response = await fetch('http://localhost:8000/tasks/');
    this.data = await response.json();
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    console.log('response....', response);
    console.log('data....', this.data);

    return this.data;
    
      // .catch(error => {
      //   alert(`There has been a problem with your fetch operation: ${error}`);
      // });
  
  }

  add(attrs) {
    let todo = Object.assign({ id: this.lastId++ }, attrs);
    this.data.pushObject(todo);
    this.persist();
    return todo;
  }

  delete(todo) {
    this.data.removeObject(todo);
    this.persist();
  }

  persist() {
    window.localStorage.setItem('todos', JSON.stringify(this.data));
  }
}
