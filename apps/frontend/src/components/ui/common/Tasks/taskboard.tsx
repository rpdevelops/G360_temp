import { useEffect, useState } from 'react';
import { format, isSameDay, parse } from 'date-fns';
import { Combobox } from './combobox';
import { TaskHover } from './taskhover';
import { NewTask } from './newtask';
import { DiaDaSemana, Task, TaskFront } from '@g360/core';
import { loadTasks } from '@/lib/common/loadTasks';

const hours = Array.from({ length: 13 }, (_, i) => `${i + 7}:00 AM`); // 7 AM to 8 PM
interface TaskboardProps {
  user: string;
}
export default function Taskboard({user}:TaskboardProps) {

  //-------------------------------
  const [viewMode, setViewMode] = useState("week"); // "day", "week", or "month"
  const [currentDate, setCurrentDate] = useState(new Date()); // Track selected date
  
  const viewOptions = [
    { value: "day", label: "Dia" },
    { value: "week", label: "Semana" },
    { value: "month", label: "Mês" }
  ];
 

  const [username, setUsername] = useState(user); // User currently logged in
  const [events, setEvents] = useState<TaskFront[]>([]);
  const POLLING_INTERVAL = 60000; // 60 seconds
  const fetchAndSetTasks = async () => {
    const tasks = await loadTasks(username);
    setEvents(tasks);
  };
  useEffect(() => {
    fetchAndSetTasks();
    const interval = setInterval(fetchAndSetTasks, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [username]);
  //const parseDate = (date: Date) => format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  const parseDate = (dateString: string) => parse(dateString, "dd/MM/yyyy", new Date());


  const parseTime = (time: string, date: string | Date) => {
    const [hours, minutes] = time.split(/[: ]/);
    let hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const parsedDate = new Date(date);
    parsedDate.setHours(hour, minute, 0, 0);
    return parsedDate;
  };
  const handleSave = () => {
    //nothing here.
  }

  const renderHeader = () => (
    <div className="flex justify-between items-center py-4">
      <h2 className="text-xl font-bold">Minhas Atividades</h2>
      <NewTask onSave={handleSave} setEvents={setEvents} username={username}/>
      <div className="flex space-x-4">
      <Combobox
        options={viewOptions}
        onSelect={(newView) => setViewMode(newView)}
        placeholder="Select view"
        defaultValue="week"
        showSearch={false} // Set to false to hide the search bar
      />
      </div>
    </div>
  );

  const renderWeekView = () => {
    const weekStart = currentDate;
    return (
      <div className="grid grid-cols-7 gap-4">
        {DiaDaSemana.map((day, index) => { //Este array é usado nesta parte somente para iterar 7 dias na exibição por Semana
          const currentDay = new Date(weekStart);
          currentDay.setDate(currentDay.getDate() + index);
          let nDiaSemana = currentDay.getDay(); //Aqui é recuperado o numero do dia da semana para exibir a String conforme o array DiaDaSemana nas linhas abaixo
          return (
            <div key={nDiaSemana} className="border p-2">
              <h3 className="bg-stone-500 text-white text-center font-semibold mb-4">{DiaDaSemana[nDiaSemana]} - {format(currentDay, 'dd/MM/yyyy')}</h3>
              {hours.map((hour) => {
                const hourStart = parseTime(hour, currentDay);
                const hourEnd = new Date(hourStart);
                hourEnd.setHours(hourEnd.getHours() + 1);
                return (
                  <div key={hour} className="border-b p-2 relative">
                    {events
                     .filter(event => {
                      const eventDate = parseDate(event.date);
                      const eventStartTime = parseTime(event.startTime, eventDate);
                      
                      // Check if event starts within the hour range
                      return isSameDay(eventDate, currentDay) &&
                        eventStartTime >= hourStart &&
                        eventStartTime < hourEnd;
                    })
                      .map(event => (
                        <div key={event.id} className="m-1 text-white rounded-lg flex items-center justify-center">
                          <TaskHover
                            className="w-full"
                            id={event.id}
                            title={event.title}
                            description={event.description}
                            attributed={event.attributed}
                            observers={event.observers}
                            date={event.date}
                            startTime={event.startTime}
                            endTime={event.endTime}
                            status={event.status}
                            username={username}       // passando o username como prop
                            setEvents={setEvents}     // passando o setEvents como prop
                          />
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    return (
      <div className="flex flex-col border">
        <h3 className="bg-stone-500 text-white text-center text-xl font-semibold mb-4">
          {format(currentDate, 'dd/MM/yyyy')}
        </h3>
        {hours.map(hour => {
          // Define the start and end of each hour slot
          const hourStart = parseTime(hour, currentDate);
          const hourEnd = new Date(hourStart);
          hourEnd.setHours(hourEnd.getHours() + 1);
  
          return (
            <div key={hour} className="border-b p-2 relative">
              {events
                .filter(event => {
                  const eventDate = parseDate(event.date);
                  const eventStartTime = parseTime(event.startTime, eventDate);
                  
                  // Check if event starts within the current hour range
                  return isSameDay(eventDate, currentDate) &&
                         eventStartTime >= hourStart &&
                         eventStartTime < hourEnd;
                })
                .map(event => (
                  <div key={event.id} className="m-1 rounded-lg flex items-center justify-center">
                    <TaskHover
                      className="w-full"
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      attributed={event.attributed}
                      observers={event.observers}
                      date={event.date}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      status={event.status}
                      username={username}       // passando o username como prop
                      setEvents={setEvents}     // passando o setEvents como prop
                    />
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  };
  

  const renderMonthView = () => {
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1); // Simplified for a 31-day month view
    return (
      <div className="grid grid-cols-7 gap-4">
        {daysInMonth.map(day => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          return (
            <div key={day} className="border p-4">
              <h4 className="bg-stone-500 text-white text-center font-semibold">{format(date, 'dd/MM')}</h4>
              {events
                .filter(event => isSameDay(parseDate(event.date), date))
                .map(event => (
                  <div key={event.id} className="m-1 rounded-lg flex items-center justify-center">
                    <TaskHover
                      className="w-full"
                      id={event.id}
                      title={event.title}
                      description={event.description}
                      attributed={event.attributed}
                      observers={event.observers}
                      date={(event.date)}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      status={event.status}
                      username={username}       // passando o username como prop
                      setEvents={setEvents}     // passando o setEvents como prop
                    />
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6">
      {renderHeader()}
      <div className="mt-4 mb-4">
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
        {viewMode === "month" && renderMonthView()}
      </div>
    </div>
  );
}
