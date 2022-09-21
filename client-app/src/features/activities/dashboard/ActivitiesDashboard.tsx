import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import { useStore } from '../../../app/stores/store';
import ActivitiesDetails from '../details/ActivityDetails';
import ActivitiesForm from '../form/ActivityForm';
import ActivityList from './ActivityList'; 
import { observer } from 'mobx-react-lite';

interface Props {
    activities : Activity[]; 
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({activities, deleteActivity, submitting}: Props)
{
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}                 
                deleteActivity={deleteActivity}
                submitting= {submitting}
                />             
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails />}
                {editMode &&
                <ActivitiesForm/>} 
            </Grid.Column>

        </Grid>
    )

})