import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dispatch, SetStateAction, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { useState } from "react";
import { Checkbox } from "../../checkbox";
import { toast } from "@/hooks/use-toast";
import { DatePicker } from "../../datepicker";

import { statusOptions, Task, TaskFront, today } from "@g360/core";
import { createTask, deleteTask, updateTask } from "@/services/common/tasksService";
import { loadTasks } from "@/lib/common/loadTasks";
import Confirm from "../confirmDialog";
import { fetchUsersByGroup } from "@/services/common/userService";
import { ScrollArea } from "../../scroll-area";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const TaskSchema: ZodType<Task> = z.object({
  id: z.number().optional(),
  title: z.string().min(2, { message: "Título precisa ter pelo menos 2 caracteres." }),
  description: z.string(),
  attributed: z.string(),
  observers: z.array(z.string()),
  date: z.date(),
  startTime: z.string().regex(timeRegex, { message: "Formato inválido (HH:MM)" }),
  endTime: z.string().regex(timeRegex, { message: "Formato inválido (HH:MM)" }),
  status: z.string().optional(),
});

interface FormTaskProps {
  initialData?: Partial<Task>; // For editing
  onSave: (data: Task) => void; // Handle save action
  onDelete?: (taskId: number) => void;
  username: string; // Nova prop
  setEvents: Dispatch<SetStateAction<TaskFront[]>>; // Nova prop
}

export function FormTask({ initialData, onSave, onDelete, username, setEvents }: FormTaskProps) {
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      ...{
      title: "",
      description: "",
      attributed: initialData?.attributed || username,
      observers: [],
      date: today,
      startTime: "",
      endTime: "",
      status: "Aberta",
    }, ...initialData 
  },
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isEditing = Boolean(initialData?.id);
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState<{ user: string; name: string }[]>([]);
  useEffect(() => {
    async function loadUserOptions() {
      try {
        const users = await fetchUsersByGroup("TI"); // Pass the group as a parameter
        setUserOptions(users);
      } catch (error) {
        console.error("Failed to load user options:", error);
      }
    }
    loadUserOptions();
  }, []);



  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    setLoading(true);
    try {
      if (isEditing) {
        await updateTask(data.id!, data); // Update existing task
        toast({ title: "Tarefa Atualizada", description: "A tarefa foi atualizada com sucesso." });
      } else {
        const newTask = await createTask(data); // Create new task
        toast({ title: "Nova Tarefa Criada", description: "A tarefa foi criada com sucesso." });
      }
      onSave(data as Task); // Call onSave after success
    } catch (error) {
      toast({ title: "Erro", description: "Ocorreu um erro ao salvar a tarefa.", variant: "destructive" });
    }
    finally {
      setLoading(false);
      const updatedTasks  = await loadTasks(username);
      setEvents(updatedTasks);
    }
  };
  const handleDelete = async () => {
    if (!initialData?.id) return;
      setLoading(true);
      try {
        await deleteTask(initialData.id);
        if (onDelete) onDelete(initialData.id);
        toast({ title: "Tarefa Excluída", description: "A tarefa foi excluída com sucesso." });
      } catch (error) {
        toast({ title: "Erro", description: "Erro ao excluir a tarefa.", variant: "destructive" });
      }
      finally {
      setLoading(false);
      const tasks = await loadTasks(username);
      setEvents(tasks);
      }
  };

  return (
    <Form {...form}>
      {isEditing ? (
        <h4 className="font-medium mb-4">Editar Tarefa - #{initialData?.id}</h4>
      ) : (
        <h4 className="font-medium mb-4">Nova Tarefa</h4>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[380px">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título da Tarefa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descrição da Tarefa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attributed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Atribuído a</FormLabel>
                <FormControl>
                  <Select defaultValue={initialData?.attributed || username} onValueChange={field.onChange}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione o usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Usuários</SelectLabel>
                        {userOptions.map((user) => (
                          <SelectItem key={user.user} value={user.user}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observadores</FormLabel>
                <FormControl>
                  <Button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full">
                    {field.value.length > 0
                      ? `${userOptions.find((user) => user.user === field.value[0])?.name}${
                          field.value.length > 1 ? ` +${field.value.length - 1}` : ""
                        }`
                      : "Selecione observadores"}
                  </Button>
                </FormControl>

                {isDropdownOpen && (
                  <ScrollArea className="h-72 w-72 rounded-md border">
                  <div className="mt-2 bg-white rounded shadow-lg p-2">
                    {userOptions.map((user) => (
                      <div key={user.user} className="flex items-center space-x-2 py-1 px-3">
                        <Checkbox
                          checked={field.value.includes(user.user)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, user.user]
                              : field.value.filter((v) => v !== user.user);
                            field.onChange(newValue);
                          }}
                        />
                        <span>{user.name}</span>
                      </div>
                    ))}
                  </div>
                  </ScrollArea>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <DatePicker
                    className = "w-full"
                    selectedDate={field.value ? field.value : undefined}
                    onDateChange={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de Início</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    min="07:00"  // Set minimum time to 7 AM
                    max="20:00"  // Set maximum time to 8 PM
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora de Término</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    min="07:00"  // Set minimum time to 7 AM
                    max="20:00"  // Set maximum time to 8 PM
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          
          {isEditing && (
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select defaultValue={initialData?.status} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={initialData?.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="flex flex-row justify-center">
        <Button type="submit" className="m-4" disabled={loading}>
        {loading ? <Icons.spinner className="animate-spin h-6 w-6" /> : isEditing ? "Salvar Alterações" : "Criar Tarefa"}
        </Button>
            {isEditing && (
              <Confirm
                title="Tem Certeza?"
                description="Esta ação não poderá ser desfeita. A tarefa será excluída permanentemente!"
                onConfirm={handleDelete}  // Calls handleDelete if confirmed
                triggerText="Excluir Tarefa"
                confirmText="Excluir"
                cancelText="Cancelar"
                isDestructive={true}
              />
            )}
        </div>
      </form>
    </Form>
  );
}
