import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/layout/models/activity';
import ActivitiesDetails from '../details/ActivityDetails';
import ActivitiesForm from '../form/ActivityForm';
import ActivityList from './ActivityList'; 

interface Props {
    activities : Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({activities, selectedActivity, deleteActivity,
    selectActivity, cancelSelectActivity, editMode, openForm, 
    closeForm, createOrEdit, submitting}: Props)
{
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                selectActivity={selectActivity} 
                deleteActivity={deleteActivity}
                submitting= {submitting}
                />             
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivitiesDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                />}
                {editMode &&
                <ActivitiesForm 
                    closeForm={closeForm} 
                    activity={selectedActivity} 
                    createOrEdit={createOrEdit} 
                    submitting={submitting}></ActivitiesForm>}
            </Grid.Column>

        </Grid>
    )

}