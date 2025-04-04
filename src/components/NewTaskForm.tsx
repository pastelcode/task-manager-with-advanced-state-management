import TaskCategory from '@/models/TaskCategory'
import { Accordion } from '@radix-ui/react-accordion'
import { useState } from 'react'
import { toast } from 'sonner'
import TaskCategoriesSelect from './TaskCategoriesSelect'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'

const NewTaskForm = ({
  onAdd,
}: {
  onAdd: (title: string, category: TaskCategory) => void
}) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory | undefined>(undefined)

  const clearForm = () => {
    setTitle('')
    setCategory(undefined)
  }

  const checkFields = (): boolean => {
    if (title.trim().length < 1 || category === undefined) {
      toast.error('Oops!', {
        description: 'Please fill the title and select a category for the task',
        action: { label: 'Dismiss', onClick: () => {} },
      })
      return false
    }
    return true
  }

  return (
    <Card className="py-1 ">
      <CardContent>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">Add new task</h3>
                <p>Plan your day</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid w-full items-center gap-4 px-2">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Title for your new task"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <TaskCategoriesSelect
                    value={category}
                    onChanged={setCategory}
                  />
                </div>
                <div className="flex flex-row justify-end gap-3">
                  <Button variant="outline" onClick={clearForm}>
                    Clear
                  </Button>
                  <Button
                    onClick={() => {
                      const isValid = checkFields()
                      if (!isValid) return
                      onAdd(title, category!)
                      clearForm()
                    }}
                  >
                    Add task
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default NewTaskForm
