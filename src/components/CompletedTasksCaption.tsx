import Task from '../models/Task'

const CompletedTasksCaption = ({ tasks }: { tasks: Task[] }) => {
  return (
    <p className="text-right text-sm text-muted-foreground">
      {`${tasks.filter((task) => task.isCompleted).length}/${
        tasks.length
      } completed`}
    </p>
  )
}

export default CompletedTasksCaption
