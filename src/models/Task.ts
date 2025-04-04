import TaskCategory from './TaskCategory'

type Task = {
  id: string
  title: string
  category: TaskCategory
  isCompleted: boolean
}

export default Task
