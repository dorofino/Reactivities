import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react'; 
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import {v4 as uuid} from 'uuid';
import agent from './api/agent';
import LoadingComponents from './LoadingComponent';
import { toUSVString } from 'util';

function App() {
  const [activites, setActivitites] = useState<Activity[]>([]);
  const [selectActivites, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =  useState(false);
  
  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivitites(activities);
      setLoading(false);
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
    setSubmitting(true);
    if(activity.id)
    {
      agent.Activities.update(activity).then(() => {
        setActivitites([...activites.filter(x => x.id !== activity.id), activity]);        
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }else{
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivitites([...activites, {...activity}])    
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function hadnleDeleteActivity(id: string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivitites([...activites.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if(loading) return <LoadingComponents content='Loading app'/>

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
          submitting={submitting}
          />

      </Container>
    </>
  );
}

export default App;
