import Task from '@/models/Task'
import TaskCategory from '@/models/TaskCategory'
import { Trash2 } from 'lucide-react'
import TaskCategoriesSelect from './TaskCategoriesSelect'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

const TaskRow = ({
  number,
  task,
  onTitleChanged,
  onCategoryChanged,
  onCompletedChanged,
  onDeleted,
}: {
  number: number
  task: Task
  onTitleChanged: (value: string) => void
  onCategoryChanged: (value: TaskCategory) => void
  onCompletedChanged: (value: boolean) => void
  onDeleted: () => void
}) => {
  return (
    <Card className="p-5">
      <CardContent className="p-0">
        <div className="flex flex-row w-full gap-5">
          <div className="pt-1">
            <Checkbox
              checked={task.isCompleted}
              onCheckedChange={onCompletedChanged}
            />
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col">
              <div className="flex gap-3 items-center">
                <Label> Title </Label>
                <Input
                  value={task.title}
                  onChange={(event) => onTitleChanged(event.target.value)}
                />
              </div>
              <div className="h-3" />
              <div className="flex gap-3">
                <Label>Category</Label>
                <TaskCategoriesSelect
                  value={task.category}
                  onChanged={onCategoryChanged}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <Button variant="ghost" onClick={onDeleted}>
                <Trash2 />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskRow
