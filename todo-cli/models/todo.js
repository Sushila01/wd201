// // models/todo.js
// const Op = require('sequelize').Op;
// ('use strict');
// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static async addTask(params) {
//       return await Todo.create(params);
//     }
//     static async showList() {
//       console.log('My Todo list \n');

//       console.log('Overdue');
//       const overdueTodos = await Todo.overdue();
//       overdueTodos.forEach((todo) => {
//         console.log(todo.displayableString());
//       });

//       console.log('\n');

//       console.log('Due Today');
//       const dueTodayTodos = await Todo.dueToday();
//       dueTodayTodos.forEach((todo) => {
//         console.log(todo.displayableString());
//       });

//       console.log('\n');

//       console.log('Due Later');
//       const dueLaterTodos = await Todo.dueLater();
//       dueLaterTodos.forEach((todo) => {
//         console.log(todo.displayableString());
//       });
//     }

//     static async overdue() {
//       return await Todo.findAll({
//         where: {
//           duedate: {
//             [Op.lt]: new Date(),
//           },
//           completed: false,
//         },
//       });
//     }

//     static async dueToday() {
//       return await Todo.findAll({
//         where: {
//           duedate: {
//             [Op.eq]: new Date().toISOString().split('T')[0],
//           },
//           completed: false,
//         },
//       });
//     }

//     static async dueLater() {
//       return await Todo.findAll({
//         where: {
//           duedate: {
//             [Op.gt]: new Date(),
//           },
//           completed: false,
//         },
//       });
//     }

//     static async markAsComplete(id) {
//       return await Todo.update({ completed: true }, { where: { id } });
//     }

//     displayableString() {
//       let checkbox = this.completed ? '[x]' : '[ ]';
//       return `${this.id}. ${checkbox} ${this.title} ${this.duedate}`;
//     }
//   }
//   Todo.init(
//     {
//       title: DataTypes.STRING,
//       duedate: DataTypes.DATEONLY,
//       completed: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: 'Todo',
//     },
//   );
//   return Todo;
// };

const Op = require('sequelize').Op;
('use strict');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      // Add a new task
      return await Todo.create(params);
    }

    static async showList() {
      console.log('My Todo list \n');

      // Display overdue tasks
      const overdueTodos = await Todo.overdue();
      console.log('Overdue');
      overdueTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log('\n');

      // Display today's tasks
      const dueTodayTodos = await Todo.dueToday();
      console.log('Due Today');
      dueTodayTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
      console.log('\n');

      // Display future tasks
      const dueLaterTodos = await Todo.dueLater();
      console.log('Due Later');
      dueLaterTodos.forEach((todo) => {
        console.log(todo.displayableString());
      });
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          duedate: {
            [Op.lt]: new Date().toISOString().split('T')[0],
          },
          completed: false,
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          duedate: {
            [Op.eq]: new Date().toISOString().split('T')[0],
          },
          completed: false,
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          duedate: {
            [Op.gt]: new Date().toISOString().split('T')[0],
          },
          completed: false,
        },
      });
    }

    static async markAsComplete(id) {
      return await Todo.update({ completed: true }, { where: { id } });
    }

    displayableString() {
      const checkbox = this.completed ? '[x]' : '[ ]';
      return `${this.id}. ${checkbox} ${this.title} ${this.duedate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      duedate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    },
  );

  return Todo;
};
