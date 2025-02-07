'use client'
import { z } from "zod"
import { DataTable }  from "../../../components/ui/common/newDataTable/data-table"
import { taskSchema } from "../../../components/ui/common/DataTable/data/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartBar } from "@/components/ui/common/charts/chartbar"
import { getColumns } from "@/components/ui/common/newDataTable/get-columns"
import DynamicColumn from "@/components/ui/common/newDataTable/dynamic-column"


// Simulate a database read for tasks.
 function getTasks() {
  //-----------------------------MOCK DE DADOS PARA MONTAGEM DO DATATABLE, SUBSTITUIR PELA CRIAÇÃO DINAMICA DEPOIS-------------------
  const data = [
    {
      "id": "TASK-8782",
      "title": "You can't compress the program without quantifying the open-source SSD pixel!",
      "status": "in progress",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7878",
      "title": "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      "status": "backlog",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7839",
      "title": "We need to bypass the neural TCP card!",
      "status": "todo",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-5562",
      "title": "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      "status": "backlog",
      "label": "feature",
      "priority": "medium"
    },
    {
        "id": "TASK-8686",
        "title": "I'll parse the wireless SSL protocol, that should driver the API panel!",
        "status": "canceled",
        "label": "feature",
        "priority": "medium"
      },
      {
        "id": "TASK-1280",
        "title": "Use the digital TLS panel, then you can transmit the haptic system!",
        "status": "done",
        "label": "bug",
        "priority": "high"
      },
      {
        "id": "TASK-7262",
        "title": "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
        "status": "done",
        "label": "feature",
        "priority": "high"
      },
      {
        "id": "TASK-1138",
        "title": "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
        "status": "in progress",
        "label": "feature",
        "priority": "medium"
      },{
        "id": "TASK-1280",
        "title": "Use the digital TLS panel, then you can transmit the haptic system!",
        "status": "done",
        "label": "bug",
        "priority": "high"
      },
      {
        "id": "TASK-7262",
        "title": "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
        "status": "done",
        "label": "feature",
        "priority": "high"
      },
      {
        "id": "TASK-1138",
        "title": "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
        "status": "in progress",
        "label": "feature",
        "priority": "medium"
      },{
        "id": "TASK-1280",
        "title": "Use the digital TLS panel, then you can transmit the haptic system!",
        "status": "done",
        "label": "bug",
        "priority": "high"
      },
      {
        "id": "TASK-7262",
        "title": "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
        "status": "done",
        "label": "feature",
        "priority": "high"
      },
      {
        "id": "TASK-1138",
        "title": "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
        "status": "in progress",
        "label": "feature",
        "priority": "medium"
      }]
      //-----------------------------------------FIM DO MOCK DE DADOS--------------------------------

  return z.array(taskSchema).parse(data)
}

//------------------component newdatatable---------------------
interface Task {
  id: string;
  title: string;
  priority: string;
}

const newdata: Task[] = [
  { id: "TASK-1", title: "Fix Bug",priority:"high" },
  { id: "TASK-2", title: "Implement Feature",priority:"low" },
];
//------------------------------------------------------------

export default function TaskPage() {
//------------------component newdatatable---------------------
  const handleEdit = (task: Task) => console.log("Edit:", task);
  const handleDelete = (task: Task) => console.log("Delete:", task);
//------------------CRIAÇÃO DE COLUNAS DO DATATABLE DINAMICAMENTE---------------------
  const dynamicColumns: DynamicColumn<Task>[] = [
    {
      accessorKey: "id",
      title: "ID",
    },
    {
      accessorKey: "title",
      title: "Title",
      customCell: (task) => (
        <span style={{ color: task.priority === "low" ? "green" : "red" }}>
          {task.title}
        </span>
      )
    },
    {
      accessorKey: "priority",
      title: "Priority",
      customCell: (task) => (
        <span style={{ color: task.priority === "low" ? "green" : "red" }}>
          {task.priority}
        </span>
      )
    },
  ];

  const columns = getColumns<Task>(dynamicColumns,{ onEdit: handleEdit, onDelete: handleDelete });
//------------------------------------------------------------


  //const tasks = await getTasks()
    //-----------------------------MOCK DE DADOS PARA MONTAGEM DO CHARTBAR, SUBSTITUIR PELA CRIAÇÃO DINAMICA DEPOIS-------------------
  const chartData = [
    { month: "Janeiro", demitidos: 186, admitidos: 80, transferencias: 100 },
    { month: "Fevereiro", demitidos: 305, admitidos: 200, transferencias: 100 },
    { month: "Março", demitidos: 237, admitidos: 120, transferencias: 100 },
    { month: "Abril", demitidos: 73, admitidos: 190, transferencias: 100 },
    { month: "Maio", demitidos: 209, admitidos: 130, transferencias: 100 },
    { month: "Junho", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Julho", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Agosto", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Setembro", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Outubro", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Novembro", demitidos: 214, admitidos: 140, transferencias: 100 },
    { month: "Dezembro", demitidos: 214, admitidos: 140, transferencias: 100 }
  ];
  //-----------------------------------------FIM DO MOCK DE DADOS--------------------------------
  const chartConfig = {
    demitidos: {
      label: "Demitidos",
      color: "#ff7d7d",
    },
    admitidos: {
      label: "Admitidos",
      color: "#7dffa6",
    },
    transferencias: {
      label: "Transferências",
      color: "#60a5fa",
    },
  };

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Mesa Operacional</h2>
            <p className="text-muted-foreground">
              Informações de Atendentes do Grupo SEI
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <div className="border-b rounded-md shadow-lg bg-white/50">
        <Tabs defaultValue="dashboard" className="space-y-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="atendentes" >
                Atendentes
              </TabsTrigger>
              <TabsTrigger value="ponto" >
                Ponto
              </TabsTrigger>
              <TabsTrigger value="beneficios" >
                Beneficios
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      SEI
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1764</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      SEI Bahia
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">70</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      CSV
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">13</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Colina
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">377</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      DN
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">28</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Interage
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">61</div>
                    <p className="text-xs text-muted-foreground">
                      +10.1% do último mês
                    </p>
                  </CardContent>
                </Card>
                </div>
                <CardContent className="pl-2">
                    <ChartBar chartData={chartData} chartConfig={chartConfig} className="bg-gray-50 shadow-lg rounded-lg"/>
                  </CardContent>
                </TabsContent>
                <TabsContent value="atendentes" className="space-y-4">
                  
                </TabsContent>
                <TabsContent value="ponto" className="space-y-4">
                  <DataTable  data={newdata} columns={columns} />
                </TabsContent>
                </Tabs>
                </div>
      </div>
    </>
  )
}