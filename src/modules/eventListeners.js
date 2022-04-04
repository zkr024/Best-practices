import {
  addListContainer, list, clear, warning,
} from './variables.js';
import Tasks from './class.js';

const tasks = new Tasks();

export const newActivity = addListContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  const newValue = document.querySelector('#addList').value;
    if (newValue === '') {
      warning.innerHTML = 'Please enter a task';
      warning.classList.remove('hide');
      setTimeout(() => {
        warning.innerHTML = '';
        warning.classList.add('hide');
      }, 2000);
    } else {
      tasks.addRecord(newValue, false, tasks.activities.length + 1);
      tasks.local();
      addListContainer.reset();
    }
});

export const deleteActivity = list.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    e.path[1].childNodes[5].classList.add('hide');
    e.path[1].childNodes[7].classList.remove('hide');
  } else if (e.target.innerHTML === 'delete') {
    const value = e.path[2].childNodes[3].innerHTML;
    tasks.eliminate(value);
  }
});

export const preventEnter = list.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

export const editActivity = list.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const newValue = e.target.innerHTML;
    const position = e.path[1].attributes[2].value;
    tasks.replace(newValue, position);
  }
});

export const completed = list.addEventListener('click', (e) => {
  if (e.target && e.target.tagName === 'INPUT') {
    let status = e.target.parentNode.attributes.completed.value;
    let position = e.target.parentNode.attributes[2].value;
    let data = e.target.parentNode.childNodes[3].innerHTML;
    
    if (e.target.checked) {
      status = true;
      e.target.parentNode.classList.toggle('decoration');
      tasks.activitiesDone.push(data);
      tasks.checkMark(data, status, position);
    } else {
      status = false;
      e.target.parentNode.classList.toggle('decoration');
      tasks.removeTemp(data);
      tasks.checkMark(data, status, position);
    }
  }
});

export const clearAll = clear.addEventListener('click', () => {
  tasks.activitiesDone = JSON.parse(localStorage.getItem('done'));
  if (tasks.activitiesDone === null) {
    tasks.activitiesDone = [];
  }
  tasks.activitiesDone.forEach((element) => tasks.eliminate(element));
  tasks.activitiesDone = [];
});

export const load = document.addEventListener('DOMContentLoaded', () => {
  tasks.updateList();
  for (let i = 0; i < tasks.activities.length; i += 1) {
    if (tasks.activities[i].completed) {
      list.children[i].classList.toggle('decoration');
      list.children[i].children[0].checked = true;
    }
  }
});