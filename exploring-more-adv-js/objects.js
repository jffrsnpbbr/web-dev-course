
// Object literal
const job = {
  title: 'Developer',
  location: 'New York',
  salary: 50000
}

const date = new Date().toISOString();
console.log(date);

class Job {
  constructor(title, location, salary) {
    this.title = title;
    this.location = location;
    this.salary = salary;
  }
}

const developer = new Job('Developer', 'Philippines', 120000)
console.log(developer);