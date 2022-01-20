import { v4 as uuidv4 } from 'uuid';

const data = [
  {
    id: uuidv4(),
    title: 'Done todo list',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Read 10 pages of books',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Have a dinner',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Clean the room',
    completed: false,
  },
  {
    id: uuidv4(),
    title: 'Have a walk',
    completed: false,
  },
]

export default data;