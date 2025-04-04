import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm'
import Task from './models/Task'
import TaskCategory from './models/TaskCategory'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string, category: TaskCategory) => {
    setTasks([
      ...tasks,
      { title: title, category: category, isCompleted: false },
    ])
  }

  return (
    <div className="w-lg mx-auto mt-10 font-[Manrope]">
      <h1 className="mb-5 font-black text-5xl tracking-tight text-left">
        Daily Tasks
      </h1>
      <NewTaskForm onAdd={addTask} />
      {tasks.map((task) => (
        <p>
          {task.title},{task.category.value}
        </p>
      ))}
    </div>
  )
}

export default App
