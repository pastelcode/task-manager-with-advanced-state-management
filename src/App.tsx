import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import CompletedTasksCaption from './components/CompletedTasksCaption'
import FilterByCategoryView from './components/FilterByCategoryView'
import NewTaskForm from './components/NewTaskForm'
import TaskRow from './components/TaskRow'
import Task from './models/Task'
import TaskCategory from './models/TaskCategory'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [categoryToFilterBy, setCategoryToFilterBy] = useState<
    TaskCategory | undefined
  >(undefined)

  const addTask = (title: string, category: TaskCategory) =>
    setTasks([
      ...tasks,
      { id: uuid(), title: title, category: category, isCompleted: false },
    ])

  const deleteTask = (taskId: string) =>
    setTasks(tasks.filter((task) => task.id !== taskId))

  const copyTaskWith = (
    task: Task,
    newTitle: string | undefined,
    newCategory: TaskCategory | undefined,
    newCompleteStatus: boolean | undefined
  ) => {
    const taskIndex = tasks.findIndex((_task) => _task.id === task.id)
    const newTask: Task = {
      id: task.id,
      title: newTitle ?? task.title,
      category: newCategory ?? task.category,
      isCompleted: newCompleteStatus ?? task.isCompleted,
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
        <div className="flex gap-5 my-5 items-center">
          <FilterByCategoryView
            selectedCategory={categoryToFilterBy}
            onCategorySelected={(newCategory) => {
              if (newCategory === categoryToFilterBy)
                setCategoryToFilterBy(undefined)
              else setCategoryToFilterBy(newCategory)
            }}
            tasks={tasks}
          />
          <CompletedTasksCaption tasks={tasks} />
        </div>
      )}
      {tasks
        .filter((task) =>
          categoryToFilterBy === undefined
            ? task
            : task.category === categoryToFilterBy
        )
        .map((task) => (
          <div key={task.id} className="mb-5">
            <TaskRow
              task={task}
              onTitleChanged={(newTitle) =>
                copyTaskWith(task, newTitle, undefined, undefined)
              }
              onCategoryChanged={(newCategory) =>
                copyTaskWith(task, undefined, newCategory, undefined)
              }
              onCompletedChanged={(checked) =>
                copyTaskWith(task, undefined, undefined, checked)
              }
              onDeleted={() => deleteTask(task.id)}
            />
          </div>
        ))}
    </div>
  )
}

export default App
