import { Task } from '../types';

export const initialTasks: Task[] = [
  {
    id: '1',
    propertyId: '1',
    title: 'Wartung Heizungsanlage',
    description: 'Jährliche Wartung der Heizungsanlage im Objekt Weber Immobilien GmbH',
    dueDate: '2024-07-15',
    status: 'Offen',
    assignedTo: 'Max Mustermann'
  },
  {
    id: '2',
    propertyId: '2',
    title: 'Erstellung Nebenkostenabrechnung',
    description: 'Nebenkostenabrechnung für 2023 erstellen und an Eigentümer versenden',
    dueDate: '2024-06-30',
    status: 'In Bearbeitung',
    assignedTo: 'Maria Schmidt'
  },
  {
    id: '3',
    propertyId: '3',
    title: 'Reparatur Aufzug',
    description: 'Defekten Aufzug im Objekt Fischer & Söhne Gewerbeobjekte reparieren',
    dueDate: '2024-05-20',
    status: 'Erledigt',
    assignedTo: 'Max Mustermann'
  },
  {
    id: '4',
    propertyId: '1',
    title: 'Mieterversammlung organisieren',
    description: 'Mieterversammlung für das Objekt Weber Immobilien GmbH organisieren und einladen',
    dueDate: '2024-08-10',
    status: 'Offen',
    assignedTo: 'Maria Schmidt'
  }
];
