function greetUser(greetingPrefix, username = 'User') {
  // console.log(greetingPrefix + ' ' + username + '!');
  console.log(`${greetingPrefix} ${username}!`);
}

greetUser('Hi', 'Max');
greetUser('Hello');

function sumUp(...numbers) {
  sum = 0;
  for (number of numbers) {
    sum += number;
  }
  return sum
}

const result = sumUp(1,2,3,4,5)
console.log(result);

const inputNumbers = [1, 5, 10, 11, 20, 31];
console.log(sumUp(...inputNumbers));

console.log(sumUp);