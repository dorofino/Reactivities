import React, { useEffect, useState } from 'react';
import './App.css'; 
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { ListFormat } from 'typescript';

function App() {
  const [activites, setActivitites] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response)
      setActivitites(response.data);
    })
  }, [])

  return (
    <div> 
      <Header as='h2' icon='users' content='Reactivities' />
        <List>
          {activites.map((activity: any) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
