import React, { useState } from 'react';
import { Task } from '../types';
import { initialTasks } from '../data/tasks';
import { ListChecks, ChevronDown, CheckCircle, Circle, Plus, Loader2, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

const statusLabels = {
  'Offen': 'Offen',
  'In Bearbeitung': 'In Bearbeitung',
  'Erledigt': 'Erledigt',
};

export const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filterStatus, setFilterStatus] = useState<string>('Alle');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    propertyId: '',
    title: '',
    description: '',
    dueDate: new Date().toISOString().slice(0, 10),
    status: 'Offen',
    assignedTo: '',
  });
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'Alle') return true;
    return task.status === filterStatus;
  });

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newStatus = destination.droppableId;
    handleStatusChange(draggableId, newStatus as Task['status']);
  };

  const handleAddTaskClick = () => {
    setShowAddTaskForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value as any,
    }));
  };

  const handleSaveTask = () => {
    const newId = String(Date.now());
    setTasks(prev => [...prev, { id: newId, ...newTask }]);
    setNewTask({
      propertyId: '',
      title: '',
      description: '',
      dueDate: new Date().toISOString().slice(0, 10),
      status: 'Offen',
      assignedTo: '',
    });
    setShowAddTaskForm(false);
  };

  const handleCancelAddTask = () => {
    setShowAddTaskForm(false);
    setNewTask({
      propertyId: '',
      title: '',
      description: '',
      dueDate: new Date().toISOString().slice(0, 10),
      status: 'Offen',
      assignedTo: '',
    });
  };

  const requestDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete));
      setTaskToDelete(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setTaskToDelete(null);
    setShowConfirmation(false);
  };

  return (
    <div className="space-y-6">
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">Aufgabe löschen?</h2>
            <p className="text-gray-600">Möchten Sie diese Aufgabe wirklich löschen?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center">
          <ListChecks className="w-6 h-6 mr-2" /> Aufgabenverwaltung
        </h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleAddTaskClick}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" /> Neue Aufgabe
          </button>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="Alle">Alle Aufgaben</option>
              <option value="Offen">Offen</option>
              <option value="In Bearbeitung">In Bearbeitung</option>
              <option value="Erledigt">Erledigt</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="w-4 h-4"/>
            </div>
          </div>
        </div>
      </div>

      {showAddTaskForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Neue Aufgabe hinzufügen</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">Objekt ID</label>
              <input
                type="text"
                id="propertyId"
                name="propertyId"
                value={newTask.propertyId}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titel</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschreibung</label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Fälligkeitsdatum</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Zugewiesen zu</label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={newTask.assignedTo}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              onClick={handleCancelAddTask}
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleSaveTask}
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Offen', 'In Bearbeitung', 'Erledigt'].map(status => (
            <Droppable droppableId={status} key={status}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`bg-gray-50 rounded-lg p-4 ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}`}
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    {statusLabels[status]}
                    {snapshot.isDraggingOver && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
                  </h3>
                  {filteredTasks
                      .filter(task => task.status === status)
                      .map((task, index) => (
                        <Draggable draggableId={task.id} index={index} key={task.id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg shadow-md p-4 mb-4 border-2 ${snapshot.isDragging ? 'border-blue-500' : 'border-transparent'}`}
                            >
                              <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{task.title}</h4>
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-700 text-sm">
                                  <span className="font-semibold w-24 flex-shrink-0">Objekt:</span>
                                  <span className="line-clamp-1">{task.propertyId}</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                  <span className="font-semibold w-24 flex-shrink-0">Fälligkeit:</span>
                                  <span>{new Date(task.dueDate).toLocaleDateString('de-DE')}</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                  <span className="font-semibold w-24 flex-shrink-0">Zugewiesen zu:</span>
                                  <span>{task.assignedTo}</span>
                                </div>
                              </div>
                               <div className="flex justify-end mt-4 space-x-2">
                                  {Object.keys(statusLabels).map(possibleStatus => (
                                      <button
                                          key={possibleStatus}
                                          onClick={() => handleStatusChange(task.id, possibleStatus as Task['status'])}
                                          className="px-2 py-1 text-xs rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
                                      >
                                          {statusLabels[possibleStatus as keyof typeof statusLabels]}
                                      </button>
                                  ))}
                                  <button
                                      onClick={() => requestDeleteTask(task.id)}
                                      className="px-2 py-1 text-xs rounded-md bg-red-200 hover:bg-red-300 transition-colors"
                                  >
                                      <Trash2 className="w-4 h-4 inline-block align-middle" />
                                  </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                    {filteredTasks.filter(task => task.status === status).length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        Keine Aufgaben in Status "{statusLabels[status as keyof typeof statusLabels]}"
                      </div>
                    )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
