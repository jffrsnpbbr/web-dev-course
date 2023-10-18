function greetUser(greetingPrefix, username = 'User') {
  console.log(greetingPrefix + ' ' + username + '!');
}

greetUser('Hi', 'Max');
greetUser('Hello')