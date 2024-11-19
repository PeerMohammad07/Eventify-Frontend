import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Edit2, Trash2 } from "lucide-react";

export function SimpleDropdown({onDelete , onEdit, event}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => {
            onEdit(event)
          }}
          className="flex items-center"
        >
          <Edit2 className="mr-2 w-4 h-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 flex items-center"
          onClick={()=>{
            onDelete(event._id)
          }}
        >
          <Trash2 className="mr-2 w-4 h-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}