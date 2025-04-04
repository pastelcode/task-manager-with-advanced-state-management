import Task from '@/models/Task'
import TaskCategory from '@/models/TaskCategory'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import TaskCategoriesSelect from './TaskCategoriesSelect'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'

const TaskRow = ({
  task,
  onTitleChanged,
  onCategoryChanged,
  onCompletedChanged,
  onDeleted,
}: {
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
          <div className="flex flex-col w-full">
            <div className="flex gap-3 items-center ">
              <Label>Title</Label>
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost">
                  <Trash2 />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can't be undone
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        onDeleted()
                        toast.success('Task deleted')
                      }}
                    >
                      Yes, delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>{' '}
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskRow
