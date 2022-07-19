import React, { useState } from "react";

const AddLoeForm = ({ createNewLoe }) => {
    const [loeName, setLoeName] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        let newLoe = {
            name: loeName,
        };
        createNewLoe(newLoe);
    }

    return (
        <div>
            <div>
                {/* <span className="close-icon" onClick={props.handleClose}>
                    words here?
                </span> */}
                <form onSubmit={handleSubmit}>
                    <label>Enter Project Name: </label>
                    <input
                        type="text"
                        value={loeName}
                        onChange={(event) => setLoeName(event.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddLoeForm;