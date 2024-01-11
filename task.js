const users = [
  { id: 1, name: "John", email: "john@test.com", department: "IT" },
  { id: 2, name: "Doe", email: "Doe@test.com", department: "Marketing" },
  { id: 3, name: "Morgan", email: "Morgan@test.com", department: "IT" },
  { id: 4, name: "Martha", email: "Martha@test.com", department: "Marketing" },
  { id: 5, name: "Dave", email: "Dave@test.com", department: "Sales" },
  { id: 6, name: "Oslo", email: "Oslo@test.com", department: "Sales" },
  { id: 7, name: "Qiev", email: "Qiev@test.com", department: "Product" },
  { id: 8, name: "Hanzel", email: "Hanzel@test.com", department: "Product" },
  { id: 9, name: "Mats", email: "Mats@test.com", department: "Sales" },
  { id: 10, name: "Yoshimura", email: "Yoshimura@test.com", department: "IT" },
];

const tasks = [
  { id: 1, department: "IT", title: "Develop company landing page" },
  { id: 2, department: "IT", title: "Develop company API" },
  { id: 3, department: "Product", title: "Call customers" },
  { id: 4, department: "Sales", title: "Sells more!" },
  { id: 5, department: "IT", title: "QA" },
];


function getTasksWithUsers(tasks, users) {
  // get a list of users by department
  const usersByDepartment = users.reduce((accumulator, user) => {
    // create department if it doesn't exist
    if (!accumulator[user.department]) {
      accumulator[user.department] = [];
    }
    // add user to department
    accumulator[user.department].push(user);

    return accumulator;
  }, {});

  // map tasks with users
  const tasksWithUsers = tasks.map((task) => ({
    ...task,
    users: usersByDepartment[task.department] || [], // if there are no users in the department, return an empty array
  }));

  // also we can do a forEach, but even though it's more readable, it will mutate the original array
  // tasks.forEach(task => {
  //     task.users = usersByDepartment[task.department]
  // });

  return tasksWithUsers;
}

const tasksWithUsers = getTasksWithUsers(tasks, users);
console.log(tasksWithUsers);

// TEST

const sampleUsers = [users[0], users[2], users[9]];

if (JSON.stringify(tasksWithUsers[0].users) != JSON.stringify(sampleUsers)) {
  throw new Error("Test failed");
}

const emptyUsers = getTasksWithUsers(tasks, []);
if (emptyUsers[0].users.length != 0) {
  throw new Error("Test failed");
}
