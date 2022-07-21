import React, { useState } from 'react';

const AddTeamForm = ( {createTeam}) => {
    const [teamName, setTeamName]=useState()

    function handleSubmit(event) {
        event.preventDefault();
        let newTeam = {
            name: teamName
        };
        createTeam(newTeam)
    }

    return ( 
        <div>
            <div>
                {/* <span className="close-icon" onClick={props.handleClose}>
                    words here?
                </span> */}
                <form onSubmit={handleSubmit}>
                    <label>Enter Team Name: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddTeamForm;