import { categories } from '@/lib/constants'
import TaskCategory from '@/models/TaskCategory'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const TaskCategoriesSelect = ({
  value,
  onChanged,
}: {
  value: TaskCategory | undefined
  onChanged: (value: TaskCategory) => void
}) => {
  return (
    <Select
      value={value?.value ?? ''}
      onValueChange={(value) =>
        onChanged(
          categories.find((element) => element.value === value) as TaskCategory
        )
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent position="popper">
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TaskCategoriesSelect
