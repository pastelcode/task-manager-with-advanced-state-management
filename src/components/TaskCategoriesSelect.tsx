import TaskCategory from '@/models/TaskCategory'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const categories: TaskCategory[] = [
  { value: 'home', label: 'Home' },
  { value: 'personal', label: 'Personal' },
  { value: 'university', label: 'University' },
  { value: 'love', label: 'Love' },
]

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
      <SelectTrigger id="category">
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
