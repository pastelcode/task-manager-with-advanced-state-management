import { categories } from '@/lib/constants'
import Task from '@/models/Task'
import TaskCategory from '@/models/TaskCategory'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'

const FilterByCategoryView = ({
  selectedCategory,
  onCategorySelected,
  tasks,
}: {
  selectedCategory: TaskCategory | undefined
  onCategorySelected: (value: TaskCategory) => void
  tasks: Task[]
}) => {
  const calculateNumberOfTasksWithCategory = (category: TaskCategory) =>
    tasks.filter((task) => task.category === category).length
  return (
    <ScrollArea className="grow">
      <div className="flex gap-1">
        {categories.map((category) => (
          <Badge
            key={category.value}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onCategorySelected(category)}
            className="cursor-default p-2"
          >
            {category.label}{' '}
            <span className="text-muted-foreground">
              ({calculateNumberOfTasksWithCategory(category)})
            </span>
          </Badge>
        ))}
      </div>
    </ScrollArea>
  )
}

export default FilterByCategoryView
