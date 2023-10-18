// Object literal
// const job = {
//   title: 'Developer',
//   location: 'New York',
//   salary: 50000
// }

// const date = new Date().toISOString();
// console.log(date);

class Job {
  constructor(title, location, salary) {
    this.title = title;
    this.location = location;
    this.salary = salary;
  }

  describe() {
    console.log(
      `I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}.`
    );
  }
}

const developer = new Job('Developer', 'Philippines', 120000);
const cook = new Job('Cook', 'Manila', 35000);

developer.describe();
cook.describe();
