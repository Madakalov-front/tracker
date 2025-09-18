
import { BreadLinks } from "@/shared/ui";
import { TaskForm } from "@/widgets/task-form";

export const CreateTaskPage = () => {
   
    return (
        <main className="create-task">
            <BreadLinks />
            <div className="container">
                <TaskForm  />
            </div>
        </main>
    );
};
