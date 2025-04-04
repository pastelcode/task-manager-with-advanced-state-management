import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm'
import TaskRow from './components/TaskRow'
import Task from './models/Task'
import TaskCategory from './models/TaskCategory'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string, category: TaskCategory) =>
    setTasks([
      ...tasks,
      { title: title, category: category, isCompleted: false },
    ])

  const deleteTask = (taskIndex: number) =>
    setTasks(tasks.filter((_, index) => index !== taskIndex))

  const copyTaskWith = (
    title: string | undefined,
    category: TaskCategory | undefined,
    isCompleted: boolean | undefined,
    taskIndex: number
  ) => {
    const oldTask = tasks[taskIndex]
    const newTask: Task = {
      title: title ?? oldTask.title,
      category: category ?? oldTask.category,
      isCompleted: isCompleted ?? oldTask.isCompleted,
    }
    setTasks([
      ...tasks.slice(0, taskIndex),
      newTask,
      ...tasks.slice(taskIndex + 1),
    ])
  }

  return (
    <div className="w-lg mx-auto mt-10 font-[Manrope]">
      <h1 className="mb-8 font-black text-5xl tracking-tight text-left">
        Daily Tasks
      </h1>
      <NewTaskForm onAdd={addTask} />
      {tasks.length !== 0 && (
        <p className="text-right pt-5 pb-3 text-sm text-muted-foreground">
          {`${tasks.filter((task) => task.isCompleted).length}/${
            tasks.length
          } completed`}
        </p>
      )}
      {tasks.map((task, index) => (
        <div className="mb-5">
          <TaskRow
            key={index}
            task={task}
            onTitleChanged={(newTitle) =>
              copyTaskWith(newTitle, undefined, undefined, index)
            }
            onCategoryChanged={(newCategory) =>
              copyTaskWith(undefined, newCategory, undefined, index)
            }
            onCompletedChanged={(checked) =>
              copyTaskWith(undefined, undefined, checked, index)
            }
            onDeleted={() => deleteTask(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default App
