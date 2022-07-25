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
            <div className='form-group row'>
                {/* <span className="close-icon" onClick={props.handleClose}>
                    words here?
                </span> */}
                <form onSubmit={handleSubmit}>
                    <label className="col-sm-2 col-form-label">Enter Team Name: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                    />
                    <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                </form>
            </div>
        </div>
     );
}
 
export default AddTeamForm;