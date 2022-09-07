import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react'; 
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activites, setActivitites] = useState<Activity[]>([]);
  const [selectActivites, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
      setActivitites(response.data);
    })
  }, [])
  
  function handleSelectActivity(id: string){
    setSelectedActivity(activites.find(x => x.id === id))
  }

  function handleCancelSelectActivity()
  {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);    
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleCreateorEditActivity(activity: Activity)
  {
    activity.id 
      ? setActivitites([...activites.filter(x => x.id !== activity.id), activity])
      : setActivitites([...activites, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function hadnleDeleteActivity(id: string)
  {
    setActivitites([...activites.filter(x => x.id !== id)])
  }

  return (
    <> 
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activites} 
          selectedActivity={selectActivites}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateorEditActivity}
          deleteActivity={hadnleDeleteActivity}
          />

      </Container>
    </>
  );
}

export default App;
