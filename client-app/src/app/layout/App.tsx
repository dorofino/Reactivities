import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react'; 
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard'; 
import agent from './api/agent';
import LoadingComponents from './LoadingComponent'; 
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  const [activites, setActivitites] = useState<Activity[]>([]); 
  const [submitting, setSubmitting] =  useState(false);
  
  useEffect(() => {
    activityStore.loadActivities();    
  }, [activityStore])
   
  function hadnleDeleteActivity(id: string)
  {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivitites([...activites.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if(activityStore.loadingInitial) return <LoadingComponents content='Loading app'/>

  return (
    <> 
      <NavBar/>
      <Container style={{marginTop: '7em'}}>        
        <ActivityDashboard 
          activities={activityStore.activities}   
          deleteActivity={hadnleDeleteActivity}
          submitting={submitting}
          />

      </Container>
    </>
  );
}

export default observer(App);
